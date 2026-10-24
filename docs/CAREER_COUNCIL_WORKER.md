# Career Council generation worker

Prepared 25 October 2026, Asia/Kuala_Lumpur. **Source implementation and offline fake-generator tests are provided. No successful container build, real Qwen inference or Runpod GPU execution is claimed by those tests.** Record actual provider results separately.

## Four viewpoints, one model

Career Council is designed as four separate, sequential model calls orchestrated by the Replit/server gateway: profile reviewer, role reviewer, learning planner and critic. This worker executes **one requested stage per Runpod Queue job**. It does not simulate four calls with one completion or run autonomous tools. All stages use the same model, so the critic shares its limitations and cannot certify the other stages' factual accuracy.

The model is [Qwen/Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507), declared Apache-2.0 by its publisher. Its exact verified revision is `cdbee75f17c01a7cc42f958dc650907174af0554`, from the [official Hugging Face metadata API](https://huggingface.co/api/models/Qwen/Qwen3-4B-Instruct-2507). The model card specifies non-thinking operation and Transformers 4.51.0 or later; the existing 4.57.1 inference dependency meets that minimum. No `<think>` trace is requested or displayed.

Generated suggestions never automatically change profile levels, deterministic coverage scores, course completion or learning-plan state. Model outputs reference server-owned identifiers. The gateway remains authoritative for public/synthetic input, role/course/source allowlists, exact evidence quotes, prerequisite ordering, request quotas, provider authentication and user review.

## Exact input

The worker accepts only:

```ts
type CouncilInput = {
  schemaVersion: 1;
  stage: 'profile' | 'roles' | 'learning' | 'critic';
  context: string; // A JSON object, at most 16,000 characters
  prior: Array<{ stage: 'profile' | 'roles' | 'learning' | 'critic'; review: object }>;
};
```

The context object must contain `fictionalText`, `skills`, `roles`, `courses` and `sources`. Each catalogue entry has a unique safe `id`. Other fields such as summaries, titles, prerequisites, price, hours, URLs, dates and limitations are evidence, not executable instructions. `fictionalText` is at most 4,000 characters. Each catalogue is bounded to 64 records. The gateway supplies these fields rather than accepting arbitrary replacement catalogues from a browser.

`prior` contains at most three unique ordered preceding-stage outputs, with a 12,000-character combined JSON limit. The worker validates those reviews against the same context. The gateway can make the first call with `prior: []`, then add the accepted profile review for roles, and so on. A failed stage must be shown as failed; the app must not quietly label a local template as a completed Qwen pass.

The Runpod request wraps that payload in `{"input": ...}`. API credentials belong on the server, never in a browser bundle or a `NEXT_PUBLIC_` variable.

## Generated review shapes

| Stage | Exact review fields |
|---|---|
| `profile` | `{summary, observations:[{skillId,quote,interpretation}], uncertainties:[string], sourceIds:[string]}` |
| `roles` | `{summary, roleIds:[string], reasoning, sourceIds:[string]}` |
| `learning` | `{summary, courseIds:[string], project, sourceIds:[string]}` |
| `critic` | `{summary, cautions:[string], checkQuestions:[string], sourceIds:[string]}` |

The worker checks exact field sets, bounded strings/lists, known IDs, no duplicated references, and at least one supplied source ID. Every profile quote must be an exact substring of `fictionalText`. Generated plain-text fields may not contain web URLs. Names and links are resolved from the trusted catalogue. No score field is allowed. These structural checks do not prove that a free-text interpretation is correct; the gateway and user still review it.

The system prompt requests deliberately short output: at most two profile observations, two roles, three courses, or two cautions/questions as appropriate. The validator has small bounded allowances around those prompt targets. Any invalid or truncated JSON is rejected with **no repair call or worker retry**.

## Success and failure contract

Successful Runpod job output is:

```ts
type CouncilResult = {
  schemaVersion: 1;
  stage: 'profile' | 'roles' | 'learning' | 'critic';
  model: 'Qwen/Qwen3-4B-Instruct-2507';
  revision: string;
  device: 'cuda' | 'cpu';
  generatedAt: string;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  review: object;
};
```

`durationMs` includes validation, lazy model loading if needed, generation and output checks. Input and output token counts come from actual tokenizer/model tensors. The prompt limit is **6,144 tokens**, checked without truncation. Generation uses greedy decoding, one output, at most **384 new tokens** and no sampling. The model stays cached within its worker process. One inference holds a process lock at a time.

Validation/generation contract failures return `{"error":{"code":"...","message":"..."}}`, with safe fixed messages containing no submitted text. Codes include `INVALID_INPUT`, `INVALID_OUTPUT`, `CONTEXT_TOO_LONG` and `OUTPUT_TRUNCATED`. Model/infrastructure failures propagate to the provider. The gateway must inspect both provider status and `output.error`.

## Container and model pinning

Build from the application root:

```sh
docker build --platform linux/amd64 -f runpod/Council.Dockerfile -t shiftatlas-council:1.0.0 ./runpod
```

The separate Council image uses the already reviewed, digest-pinned PyTorch 2.7.1/CUDA 12.8 base and the existing `runpod/requirements.txt`. The build fetches only the pinned Qwen snapshot's safetensors shards, JSON/tokenizer files, README and licence. It records file hashes and revision in a model manifest, runs offline tests and captures `pip freeze`. It does not need an inference GPU during the build.

Runtime model loading is lazy, local-only, with `trust_remote_code=False` and safe weights. No request can select a model, URL, file path, custom code or generation settings. `COUNCIL_MODEL_REVISION` must be a full reviewed commit SHA matching the baked manifest. `REQUIRE_GPU=1` is the container default and rejects execution if CUDA is unavailable. CUDA uses BF16 where supported, otherwise FP16. Optional CPU smoke tests require an explicit `REQUIRE_GPU=0` override and do not establish GPU use.

The model has roughly four billion parameters. A 24 GB GPU is a planning starting point, not a measured resource requirement. Verify actual memory, cold-start time, latency and cost with the bounded context/output before making claims. Do not provision or extend paid resources unless the owning account's confirmed SDC sponsor credit and no-extra-spend condition can be respected.

## Offline checks

```sh
python -m unittest discover -s runpod -p test_council_worker.py -v
```

The tests inject fake generation to validate four-stage contracts, exact fields, known IDs and quotes, prior ordering, prompt-role delimiter escaping, duplicate/non-finite JSON rejection, token-count bounds and rejection without repair. They perform no model download, neural inference or provider API call.

## Provider integration evidence

Use a separate Runpod Queue endpoint and server-held credential, with zero active workers, one maximum worker and bounded execution/idle settings appropriate to verified sponsor credit. Each explicit Council action may create four sequential jobs, so provider orchestration must account for that cost and avoid duplicate submissions. The worker itself issues no nested jobs.

After a real run, preserve the source/image/model digests, synthetic context hash, four provider job identities, actual per-stage metadata and outputs, gateway validation results, failures and observed credit usage. UI stages should advance only when their corresponding real job completes. This is how a claim of four completed AI viewpoints becomes verifiable.

See [Runpod handler documentation](https://docs.runpod.io/serverless/workers/handler-functions), [image deployment](https://docs.runpod.io/serverless/workers/deploy) and [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations) for provider mechanics. This worker adds generation alongside the separately verified E5 retrieval worker. Its model build and four-pass inference flow require independent completion evidence.
