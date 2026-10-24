"""Offline contract tests: no GPU, ML packages, network or model download."""
from copy import deepcopy
from datetime import datetime, timezone
import importlib.util
import math
import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

# Import the sibling file even when an installed package is also named runpod.
spec = importlib.util.spec_from_file_location("shiftatlas_worker", Path(__file__).with_name("worker.py"))
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)


def payload():
    return {
        "schemaVersion": 1,
        "queries": [{"id": "q-en", "text": "I analyse community data"}],
        "passages": [{"id": "analyst", "text": "Analyse data and explain results"}, {"id": "designer", "text": "Design accessible interfaces"}],
    }


class FakeEncoder:
    def __init__(self, rows=None):
        self.rows = rows or [[3, 4], [6, 8], [4, -3]]
        self.calls = []

    def encode(self, texts, **kwargs):
        self.calls.append((texts, kwargs))
        return self.rows


class WorkerTests(unittest.TestCase):
    def test_contract_prefix_normalization_and_ranking(self):
        fake = FakeEncoder()
        result = worker.retrieve(payload(), encoder=fake, device="cpu", revision=worker.PINNED_REVISION, clock=lambda: datetime(2026, 10, 25, 12, 0, tzinfo=timezone.utc))
        self.assertEqual(set(result), {"schemaVersion", "model", "revision", "device", "generatedAt", "queryResults"})
        self.assertEqual(result["schemaVersion"], 1)
        self.assertEqual(result["model"], "intfloat/multilingual-e5-base")
        self.assertEqual(result["generatedAt"], "2026-10-25T12:00:00Z")
        self.assertEqual(result["queryResults"], [{"id": "q-en", "matches": [{"id": "analyst", "similarity": 1.0}, {"id": "designer", "similarity": 0.0}]}])
        texts, config = fake.calls[0]
        self.assertEqual(texts, ["query: I analyse community data", "passage: Analyse data and explain results", "passage: Design accessible interfaces"])
        self.assertTrue(config["normalize_embeddings"])
        self.assertFalse(config["show_progress_bar"])
        self.assertEqual(config["batch_size"], 4)

    def test_multilingual_text_and_ids_are_preserved(self):
        data = payload()
        data["queries"] = [{"id": "q-ms", "text": "  Saya menganalisis data masyarakat  "}, {"id": "q-zh", "text": "我分析社区数据"}]
        result = worker.retrieve(data, encoder=FakeEncoder([[1, 0], [0, 1], [1, 0], [0, 1]]), device="cuda")
        self.assertEqual([row["id"] for row in result["queryResults"]], ["q-ms", "q-zh"])
        self.assertEqual(result["queryResults"][1]["matches"][0]["id"], "designer")
        self.assertEqual(result["device"], "cuda")
        self.assertEqual(data["queries"][0]["text"], "  Saya menganalisis data masyarakat  ")

    def test_ties_are_deterministic_by_id(self):
        data = payload()
        data["passages"].reverse()
        result = worker.retrieve(data, encoder=FakeEncoder([[1, 0], [1, 0], [1, 0]]), device="cpu")
        self.assertEqual([match["id"] for match in result["queryResults"][0]["matches"]], ["analyst", "designer"])

    def test_schema_and_arbitrary_execution_configuration_are_rejected(self):
        bad = [None, [], {}, {**payload(), "schemaVersion": True}, {**payload(), "schemaVersion": 2}]
        for field in ("model", "revision", "code", "url", "modelPath"):
            bad.append({**payload(), field: "untrusted"})
        for data in bad:
            with self.subTest(data_type=type(data).__name__), self.assertRaises(worker.InputError):
                worker.validate_payload(data)

    def test_limits_and_ids_are_enforced(self):
        data = payload()
        cases = []
        for field, maximum in (("queries", 12), ("passages", 20)):
            cases.append({**data, field: []})
            cases.append({**data, field: [{"id": f"x{i}", "text": "ok"} for i in range(maximum + 1)]})
            cases.append({**data, field: [{"id": "same", "text": "ok"}, {"id": "same", "text": "ok"}]})
        for text in ("", "   ", "x" * 2001, "abc\x00def", 42):
            cases.append({**data, "queries": [{"id": "q", "text": text}]})
        for identifier in ("", "../secret", "x" * 65, "space id", 3):
            cases.append({**data, "queries": [{"id": identifier, "text": "ok"}]})
        cases.append({**data, "queries": [{"id": "q", "text": "ok", "url": "ignored?"}]})
        for case in cases:
            with self.subTest(case=cases.index(case)), self.assertRaises(worker.InputError):
                worker.validate_payload(case)

    def test_exact_total_character_limit_includes_whitespace(self):
        data = {"schemaVersion": 1, "queries": [{"id": "q", "text": "x" * 2000}], "passages": [{"id": f"p{i}", "text": "y" * 2000} for i in range(14)]}
        worker.validate_payload(data)
        data["passages"].append({"id": "overflow", "text": " y "})
        with self.assertRaises(worker.InputError):
            worker.validate_payload(data)

    def test_invalid_input_never_loads_model_or_echoes_text(self):
        with patch.object(worker, "_load_runtime", side_effect=AssertionError("must not load")):
            result = worker.handler({"input": {**payload(), "url": "private"}})
        self.assertEqual(result["error"]["code"], "INVALID_INPUT")
        self.assertNotIn("private", str(result))

    def test_invalid_embedding_outputs_fail_instead_of_inventing_scores(self):
        for rows in ([[1, 0]], [[0, 0], [1, 0], [1, 0]], [[1, 0], [math.nan, 0], [1, 0]], [[1, 0], [1], [1, 0]]):
            with self.subTest(rows=repr(rows)), self.assertRaises(RuntimeError):
                worker.retrieve(payload(), encoder=FakeEncoder(rows), device="cpu")

    def test_gpu_claim_requires_available_cuda_and_revision_requires_hash(self):
        with patch.dict(os.environ, {"REQUIRE_GPU": "1"}):
            self.assertEqual(worker.select_device(True), "cuda")
            with self.assertRaises(RuntimeError):
                worker.select_device(False)
        with patch.dict(os.environ, {"REQUIRE_GPU": "0"}):
            self.assertEqual(worker.select_device(False), "cpu")
        with patch.dict(os.environ, {"MODEL_REVISION": "main"}):
            with self.assertRaises(RuntimeError):
                worker.model_revision()


if __name__ == "__main__":
    unittest.main()
