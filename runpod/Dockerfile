# syntax=docker/dockerfile:1
# Official linux/amd64 tag and digest verified 25 October 2026 through Docker Hub.
FROM pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime@sha256:c16f4c749e2d9e96878875cdf6cc45cddda1d1a36fddd371dd6f2360f1b6e2a2

ARG MODEL_REVISION=d128750597153bb5987e10b1c3493a34e5a4502a
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    HF_HUB_DISABLE_TELEMETRY=1 \
    TOKENIZERS_PARALLELISM=false \
    MODEL_PATH=/opt/models/multilingual-e5-base \
    MODEL_REVISION=${MODEL_REVISION} \
    REQUIRE_GPU=1

WORKDIR /app
# The base ships image/audio extras that this text-only worker does not use.
# Removing them avoids importing an incompatible optional torchvision build.
RUN python -m pip uninstall -y torchvision torchaudio
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --no-cache-dir -r /app/requirements.txt \
    && python -m pip check \
    && python -m pip freeze > /app/python-freeze.txt

# Only the reviewed model's safe weights/tokenizer/configs are fetched at build.
# No runtime request can change the model, revision, path or download URL.
RUN python - <<'PY'
import hashlib, json, os, re
from pathlib import Path
from huggingface_hub import snapshot_download
revision = os.environ['MODEL_REVISION']
assert re.fullmatch(r'[0-9a-f]{40}', revision), 'MODEL_REVISION must be a full commit SHA'
directory = Path(os.environ['MODEL_PATH'])
snapshot_download(
    repo_id='intfloat/multilingual-e5-base', revision=revision,
    local_dir=str(directory),
    allow_patterns=['*.json', '1_Pooling/*.json', '*.safetensors', '*.model', 'README.md'],
    ignore_patterns=['onnx/*', 'openvino/*', '*.bin', '.eval_results/*'],
)
files = {}
for file in sorted(directory.rglob('*')):
    if file.is_file() and '.cache' not in file.parts:
        digest = hashlib.sha256()
        with file.open('rb') as stream:
            for block in iter(lambda: stream.read(1024 * 1024), b''):
                digest.update(block)
        files[str(file.relative_to(directory))] = digest.hexdigest()
(directory / 'shiftatlas-model.json').write_text(json.dumps({
    'model': 'intfloat/multilingual-e5-base', 'revision': revision,
    'files': files, 'source': 'https://huggingface.co/intfloat/multilingual-e5-base',
    'license': 'MIT',
}, indent=2), encoding='utf-8')
PY

ENV HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1
COPY worker.py test_worker.py /app/
RUN python -m unittest test_worker -v
CMD ["python", "-u", "/app/worker.py"]
