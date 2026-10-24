"""Bounded semantic retrieval worker. No generation, URL fetching or input logging.

Original SHIFTATLAS code, Apache-2.0. Model/provider terms remain separate.
Importing this module does not import Torch, download a model or start a worker.
"""
from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
import json
import math
import os
from pathlib import Path
import re
import threading
from typing import Any, Callable, Protocol

MODEL_ID = "intfloat/multilingual-e5-base"
# Verified through https://huggingface.co/api/models/intfloat/multilingual-e5-base
# on 25 October 2026. A deployment may use another reviewed full commit SHA only.
PINNED_REVISION = "d128750597153bb5987e10b1c3493a34e5a4502a"
MAX_QUERIES = 12
MAX_PASSAGES = 20
MAX_TEXT_CHARS = 2000
MAX_TOTAL_CHARS = 30000
MAX_TOKENS = 512
BATCH_SIZE = 4
_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.:-]{0,63}$")
_SHA = re.compile(r"^[0-9a-f]{40}$")
_INFERENCE_LOCK = threading.Lock()


class InputError(ValueError):
    """A safe validation message that contains no submitted text."""


class Encoder(Protocol):
    def encode(self, texts: list[str], **kwargs: Any) -> Any: ...


def validate_payload(payload: Any) -> dict[str, Any]:
    """Validate limits before model loading and return only supported fields."""
    if not isinstance(payload, dict) or set(payload) != {"schemaVersion", "queries", "passages"}:
        raise InputError("Input must contain only schemaVersion, queries and passages.")
    if type(payload["schemaVersion"]) is not int or payload["schemaVersion"] != 1:
        raise InputError("schemaVersion must be the integer 1.")
    clean: dict[str, Any] = {"schemaVersion": 1}
    total = 0
    for key, maximum in (("queries", MAX_QUERIES), ("passages", MAX_PASSAGES)):
        values = payload[key]
        if not isinstance(values, list) or not 1 <= len(values) <= maximum:
            raise InputError(f"{key} must contain between 1 and {maximum} items.")
        items = []
        ids: set[str] = set()
        for value in values:
            if not isinstance(value, dict) or set(value) != {"id", "text"}:
                raise InputError(f"Each {key} item must contain only id and text.")
            identifier, text = value["id"], value["text"]
            if not isinstance(identifier, str) or not _ID.fullmatch(identifier):
                raise InputError("Item IDs must be 1–64 safe letters, numbers, dots, colons, underscores or hyphens.")
            if identifier in ids:
                raise InputError(f"Duplicate IDs are not allowed within {key}.")
            if not isinstance(text, str) or not text.strip() or len(text) > MAX_TEXT_CHARS:
                raise InputError("Each text must contain 1–2000 characters after excluding empty-only input.")
            if any(ord(char) < 32 and char not in "\t\n\r" for char in text):
                raise InputError("Text contains an unsupported control character.")
            # Count the submitted text, before trimming, so whitespace cannot bypass a limit.
            total += len(text)
            if total > MAX_TOTAL_CHARS:
                raise InputError("Combined text must not exceed 30000 characters.")
            ids.add(identifier)
            items.append({"id": identifier, "text": text.strip()})
        clean[key] = items
    return clean


def model_revision() -> str:
    revision = os.environ.get("MODEL_REVISION", PINNED_REVISION)
    if not _SHA.fullmatch(revision):
        raise RuntimeError("MODEL_REVISION must be a reviewed full 40-character lowercase commit SHA.")
    return revision


def select_device(cuda_available: bool) -> str:
    required = os.environ.get("REQUIRE_GPU", "0")
    if required not in {"0", "1"}:
        raise RuntimeError("REQUIRE_GPU must be 0 or 1.")
    if required == "1" and not cuda_available:
        raise RuntimeError("GPU execution was required, but CUDA is unavailable.")
    return "cuda" if cuda_available else "cpu"


@lru_cache(maxsize=1)
def _load_runtime() -> tuple[Encoder, str, str]:
    """Lazy, cached, local-only model loading. No caller controls the model path."""
    import torch
    from sentence_transformers import SentenceTransformer

    revision = model_revision()
    device = select_device(torch.cuda.is_available())
    directory = Path(os.environ.get("MODEL_PATH", "/opt/models/multilingual-e5-base"))
    marker = directory / "shiftatlas-model.json"
    if not marker.is_file():
        raise RuntimeError("Baked model manifest is missing. Build the pinned worker image first.")
    manifest = json.loads(marker.read_text(encoding="utf-8"))
    if manifest.get("model") != MODEL_ID or manifest.get("revision") != revision:
        raise RuntimeError("Baked model identity or revision does not match the configured revision.")
    model = SentenceTransformer(
        str(directory), device=device, local_files_only=True, trust_remote_code=False,
        model_kwargs={"use_safetensors": True},
    )
    model.max_seq_length = MAX_TOKENS
    model.eval()
    return model, device, revision


def _unit_vectors(raw: Any, expected: int) -> list[list[float]]:
    rows = raw.tolist() if hasattr(raw, "tolist") else raw
    if not isinstance(rows, list) or len(rows) != expected:
        raise RuntimeError("Embedding output has an unexpected row count.")
    vectors: list[list[float]] = []
    width: int | None = None
    for row in rows:
        if not isinstance(row, (list, tuple)) or not row:
            raise RuntimeError("Embedding output has an invalid shape.")
        if width is None:
            width = len(row)
        if len(row) != width:
            raise RuntimeError("Embedding output dimensions differ.")
        vector = [float(value) for value in row]
        if not all(math.isfinite(value) for value in vector):
            raise RuntimeError("Embedding output contains a non-finite value.")
        norm = math.sqrt(sum(value * value for value in vector))
        if not math.isfinite(norm) or norm <= 0:
            raise RuntimeError("Embedding output contains an invalid norm.")
        vectors.append([value / norm for value in vector])
    return vectors


def retrieve(
    payload: Any,
    *,
    encoder: Encoder | None = None,
    device: str | None = None,
    revision: str | None = None,
    clock: Callable[[], datetime] | None = None,
) -> dict[str, Any]:
    """Produce the versioned contract; injected encoders support offline tests."""
    clean = validate_payload(payload)
    if encoder is None:
        encoder, device, revision = _load_runtime()
        import torch
        inference_context = torch.inference_mode()
    else:
        from contextlib import nullcontext
        inference_context = nullcontext()
    revision = revision or model_revision()
    if not _SHA.fullmatch(revision) or device not in {"cpu", "cuda"}:
        raise RuntimeError("Output requires a pinned revision and actual cpu/cuda device.")
    texts = ["query: " + item["text"] for item in clean["queries"]]
    texts += ["passage: " + item["text"] for item in clean["passages"]]
    # One inference at a time protects memory if the provider enables concurrency.
    with _INFERENCE_LOCK, inference_context:
        raw = encoder.encode(
            texts, batch_size=BATCH_SIZE, normalize_embeddings=True,
            convert_to_numpy=True, show_progress_bar=False,
        )
    vectors = _unit_vectors(raw, len(texts))
    query_count = len(clean["queries"])
    results = []
    for index, query in enumerate(clean["queries"]):
        matches = []
        for passage_index, passage in enumerate(clean["passages"]):
            similarity = sum(a * b for a, b in zip(vectors[index], vectors[query_count + passage_index]))
            matches.append({"id": passage["id"], "similarity": round(max(-1.0, min(1.0, similarity)), 6)})
        matches.sort(key=lambda item: (-item["similarity"], item["id"]))
        results.append({"id": query["id"], "matches": matches})
    timestamp = (clock or (lambda: datetime.now(timezone.utc)))()
    if timestamp.tzinfo is None:
        raise RuntimeError("The generation timestamp must have a timezone.")
    return {
        "schemaVersion": 1, "model": MODEL_ID, "revision": revision,
        "device": device, "generatedAt": timestamp.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
        "queryResults": results,
    }


def handler(job: Any) -> dict[str, Any]:
    """Runpod Queue envelope. Validation errors never load the model."""
    try:
        if not isinstance(job, dict) or "input" not in job:
            raise InputError("A Runpod job input object is required.")
        return retrieve(job["input"])
    except InputError as error:
        return {"error": {"code": "INVALID_INPUT", "message": str(error)}}
    # Runtime failures propagate to Runpod as FAILED; they are not fake model results.


if __name__ == "__main__":
    import runpod
    runpod.serverless.start({"handler": handler})
