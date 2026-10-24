# Runpod semantic retrieval worker

Prepared **25 October 2026, Asia/Kuala_Lumpur**. This document describes implemented worker code and its contract. **The nine offline unit tests pass. The E5 image built successfully and a direct synthetic request completed on CUDA on 25 October 2026.** See the [execution record](RUNPOD_EXECUTION.md) for the exact receipt, timing and limited test scope. Application gateway integration is a separate check.

## What the model does

The worker uses the pretrained **intfloat/multilingual-e5-base** embedding model to retrieve passages related to a short query. It returns cosine similarity and passage identifiers. It generates no prose, has no access to job listings, and estimates no proficiency, employability, salary or probability of employment. Similarity is separate from the application's disclosed weighted skill-coverage rubric.

The publisher's [model card](https://huggingface.co/intfloat/multilingual-e5-base) describes query/passage prefixes, normalised embeddings, a 512-token limit, and multilingual training. The card lists Malay, but that does not establish performance on Malaysian career decisions. The project's role corpus, translation quality and retrieval usefulness still need evaluation. Scores must be interpreted as relative retrieval similarity; the publisher warns that their absolute range is often high.

| Identity | Pinned value |
|---|---|
| Hugging Face repository | `intfloat/multilingual-e5-base` |
| Model licence declared by publisher | MIT |
| Full model commit | `d128750597153bb5987e10b1c3493a34e5a4502a` |
| Verification source | [Official model metadata API](https://huggingface.co/api/models/intfloat/multilingual-e5-base), retrieved 25 October 2026 |
| Model input prefixes | `query: ` for queries, `passage: ` for role/reference passages |
| Model sequence limit | 512 tokens; long accepted text can still be truncated by the tokenizer |
| Inference batch size | 4 |

This model is pretrained by its publisher. SHIFTATLAS did not train or fine-tune it. It is an embedding network, rather than a generative language-model adviser.

## Files and validation

- `runpod/worker.py`: strict input validation, lazy cached model loading, bounded batched inference and versioned output.
- `runpod/Dockerfile`: official digest-pinned PyTorch/CUDA base, model snapshot fetched during build, safe weights only, offline runtime.
- `runpod/requirements.txt`: compatible direct package pins. This is not a complete transitive dependency lock; the image retains `/app/python-freeze.txt` after installation.
- `runpod/test_worker.py`: offline contract and validation tests with a deliberately fake encoder. These tests do not demonstrate neural inference or GPU use.

Limits are enforced before model loading: 1–12 queries, 1–20 passages, 1–2,000 characters per text, 30,000 combined submitted text characters, safe identifiers of 1–64 characters, unique identifiers within each list, and exactly the documented fields. Empty-only text and unsupported control characters are rejected. The limits count submitted whitespace before trimming.

Callers cannot select a model, revision, URL, file path, code snippet or arbitrary generation setting. A URL within a plain-text sentence is treated only as text; the worker does not fetch it. The worker never fetches external content at inference time, and `trust_remote_code=False` prevents model-repository custom code execution. No submitted query or passage is explicitly logged by this worker. Runpod and SDK operational logging/retention are separate provider concerns; use synthetic inputs only for the competition demonstration.

## Request and response contract

Runpod Queue jobs wrap the following payload in the `input` field:

```json
{
  "input": {
    "schemaVersion": 1,
    "queries": [
      {"id": "synthetic-ms", "text": "Saya mahu menganalisis data dan menjelaskan hasil."}
    ],
    "passages": [
      {"id": "analyst", "text": "Business intelligence analyst. Analyse data and communicate findings."},
      {"id": "designer", "text": "Human-centred design. Research user needs and design accessible interfaces."}
    ]
  }
}
```

On success, Runpod's job `output` contains this schema:

```ts
type RetrievalResult = {
  schemaVersion: 1;
  model: 'intfloat/multilingual-e5-base';
  revision: string; // Actual full reviewed commit SHA baked into the image
  device: 'cuda' | 'cpu'; // Selected from actual Torch CUDA availability
  generatedAt: string; // UTC ISO timestamp for this completed computation
  queryResults: Array<{
    id: string;
    matches: Array<{ id: string; similarity: number }>;
  }>;
};
```

Each query returns every supplied passage, sorted by descending cosine similarity with identifier order breaking ties. Similarities are finite values in `[-1, 1]`, rounded to six decimals. No example numeric score in this document is presented as a real model measurement.

Validation returns `{"error":{"code":"INVALID_INPUT","message":"..."}}` in the worker output. The gateway must check that field as well as the Runpod job status. Model loading or runtime failures propagate as failed jobs rather than fabricated or fallback similarity scores. The browser should identify its local fallback explicitly if the remote worker is unavailable.

The Runpod serverless handler/envelope follows the [official handler documentation](https://docs.runpod.io/serverless/workers/handler-functions). Credentials belong in the server-side gateway, never in browser code or a `NEXT_PUBLIC_` variable. The gateway owns authentication, request quotas, timeout/cancellation and allowed public/synthetic content. The worker does not expose an additional HTTP port.

## Model and container reproducibility

The Docker base is:

```text
pytorch/pytorch:2.7.1-cuda12.8-cudnn9-runtime
@sha256:c16f4c749e2d9e96878875cdf6cc45cddda1d1a36fddd371dd6f2360f1b6e2a2
```

The tag's Linux/amd64 image digest was verified against the [official Docker Hub tag API](https://hub.docker.com/v2/repositories/pytorch/pytorch/tags/2.7.1-cuda12.8-cudnn9-runtime) on 25 October 2026. PyTorch/CUDA is supplied by that base. Top-level inference pins are Sentence Transformers 5.1.1, Transformers 4.57.1, Hugging Face Hub 0.35.3, Tokenizers 0.22.1, Safetensors 0.6.2 and NumPy 2.2.6. Runpod SDK is 1.12.0. Release existence and compatibility metadata were checked through the official PyPI JSON endpoints, including [Sentence Transformers 5.1.1](https://pypi.org/project/sentence-transformers/5.1.1/) and [Runpod 1.12.0](https://pypi.org/project/runpod/1.12.0/).

The build downloads only the chosen repository's JSON configuration, tokenizer/SentencePiece files, README and safetensors weights at the full pinned commit. ONNX/OpenVINO variants and pickle `.bin` weights are excluded. It records SHA-256 values for the included model files in `shiftatlas-model.json`. The runtime checks that manifest identity and revision match configuration, loads local files only and reports the same commit. Network access to Hugging Face is not required at inference time.

Changing `MODEL_REVISION` requires a reviewed full 40-character SHA and an image rebuild. The runtime cannot silently use a new `main` revision. Keep the resulting registry image digest, model manifest and package freeze with deployment evidence. The model manifest's hashes record the downloaded artifacts; they are not a claim of independent model-weight auditing.

## Test locally without ML dependencies

From the application root:

```sh
python -m unittest discover -s runpod -p test_worker.py -v
```

Nine tests verify exact contract fields, prefixes, normalisation, sorting, multilingual text preservation, deterministic ties, schema/unknown-field rejection, count/text/total limits, early validation, malformed embedding rejection, CUDA-required behavior and revision validation. The test fixture encoder is intentionally injected; no provider call or model download occurs.

## Build and smoke test the actual model

The recorded deployment used RunPod GitHub builds with root `Dockerfile.e5`; see the [setup guide](REPLIT_RUNPOD_SETUP.md). The commands below are an alternative local reproduction route. Use Docker with enough disk space for the CUDA base and model, then build from the **runpod directory as context**:

```sh
docker build --platform linux/amd64 -t shiftatlas-e5:1.0.0 ./runpod
```

The build runs `pip check`, captures the resolved package versions, downloads the pinned snapshot and runs the offline tests. It does not require a GPU to build. To test actual CPU neural inference, override the container's default GPU requirement:

```sh
docker run --rm -e REQUIRE_GPU=0 shiftatlas-e5:1.0.0 python -c "from worker import retrieve; import json; print(json.dumps(retrieve({'schemaVersion':1,'queries':[{'id':'synthetic','text':'Analyse community data'}],'passages':[{'id':'analyst','text':'Analyse data and explain results'}]})))"
```

To verify actual GPU execution on a compatible machine with NVIDIA container support:

```sh
docker run --rm --gpus all shiftatlas-e5:1.0.0 python -c "from worker import retrieve; import json; print(json.dumps(retrieve({'schemaVersion':1,'queries':[{'id':'synthetic','text':'Analyse community data'}],'passages':[{'id':'analyst','text':'Analyse data and explain results'}]})))"
```

Success must include `device: "cuda"` for a GPU claim. CPU success does not establish GPU execution. Do not substitute a fake-encoder output or a configured environment variable as GPU proof.

## Deploy only within confirmed SDC sponsor credit

Deployment uses **SDC sponsor credit only, with no additional spending**. Before creating an endpoint or paid build, verify actual sponsor credit in the owning account, any expiry/restrictions, current rates and enforceable available budget controls. Do not add a payment method, purchase credit, activate auto-pay or proceed where costs can spill into personal funds. If the balance or cap cannot be verified, leave deployment pending.

After those checks, the worker supports a Runpod **Queue** serverless endpoint using a built image or the documented GitHub build route. Use the runpod folder as build context, or configure the repository build so the Docker `COPY` paths resolve there. Start with **zero active workers and at most one maximum worker**, bounded job timeout, and no persistent volume. The model is baked into the image. Test one synthetic job first. These limits reduce exposure but are not a financial hard cap. Check actual account billing and sponsor balance before further jobs. [Runpod image build/deployment guidance](https://docs.runpod.io/serverless/workers/deploy).

The Replit/server-side gateway should call the authenticated Runpod endpoint and validate both the Runpod status and the exact worker schema. Use async queue polling/cancellation when cold starts exceed a synchronous request timeout. Persist only reviewed public research outputs or authorised synthetic evaluation artifacts, with model/revision/date/device recorded. Raw personal resumes must not be sent for this competition demo.

## Evidence to record after an actual provider run

Record the worker's image digest, source commit, resolved package freeze, model manifest, endpoint configuration without credentials, synthetic input fixture, completed provider job identity, exact output, returned device, elapsed time and observed sponsor-credit usage. Then check worker count, endpoint state and billing for remaining charges. No such provider-run record is supplied by the offline unit tests.

The [Replit and Runpod setup guide](REPLIT_RUNPOD_SETUP.md) covers both cloud paths. The [E5 execution record](RUNPOD_EXECUTION.md) documents its completed worker-level CUDA run; the application gateway and Council require their own end-to-end checks.
