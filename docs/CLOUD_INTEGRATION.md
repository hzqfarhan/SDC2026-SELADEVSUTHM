# Cloud AI integration

Updated 25 October 2026. SHIFTATLAS combines a Replit-compatible Node gateway with two Runpod Queue workers: multilingual semantic retrieval and a four-stage Career Council. Both integrations are implemented in source. Deployed model builds, live GPU execution and account billing acceptance are tracked separately from local software tests.

## Runtime responsibilities

| Component | Responsibility |
|---|---|
| Browser | 3D atlas, local resume parsing, self-assessment, deterministic matching/planning and explicitly initiated AI requests |
| Node gateway | Trusted catalogues, server-held credentials, access control, request limits, provider orchestration and result validation |
| E5 worker | Normalised embeddings and cosine retrieval over supplied role passages |
| Qwen worker | One bounded generative review stage per job |

The browser renders the atlas and game. The Runpod workers execute neural models. Cloud results do not automatically change self-assessed skill levels, deterministic coverage scores, course completion or scenario coefficients.

| Model | Licence | Pinned revision |
|---|---|---|
| `intfloat/multilingual-e5-base` | MIT | `d128750597153bb5987e10b1c3493a34e5a4502a` |
| `Qwen/Qwen3-4B-Instruct-2507` | Apache-2.0 | `cdbee75f17c01a7cc42f958dc650907174af0554` |

The [E5](https://huggingface.co/intfloat/multilingual-e5-base) and [Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) snapshots are baked into separate images, loaded offline from safe weights with remote custom code disabled.

## Node routes and trusted context

`scripts/serve.mjs` serves the exported frontend and both same-origin API gateways.

| Route | Behavior |
|---|---|
| `GET /api/cloud-status` | E5 configuration and remaining allowance; no inference |
| `POST /api/semantic-match` | One fictional summary and up to six public research titles retrieved against six trusted role descriptions |
| `GET /api/council-status` | Council configuration and remaining session allowance; no inference |
| `POST /api/career-council` | Four sequential Qwen jobs with streamed NDJSON progress |

Requests require a private demo code, explicit confirmation of fictional text and 30–2,000 characters. Gateways enforce request-size and origin checks and reject obvious contact patterns. These checks do not establish that arbitrary input is anonymous; the demonstration uses synthetic text only.

The build exports `server-data/semantic-catalogue.json` and `server-data/council-catalogue.json`. The server owns role/course descriptions, source IDs, URLs and limitations. Browser input cannot replace the catalogue or select arbitrary models, code or remote URLs.

## Semantic retrieval

`scripts/cloud-gateway.mjs` constructs E5 queries from the confirmed fictional summary and up to six valid arXiv titles. `runpod/worker.py` applies query/passage prefixes and returns allowed passage IDs, finite cosine values and model/revision/device/date metadata. The gateway checks complete query/passage coverage and identity before display.

The UI displays role similarity and paper relevance separately from authored skill coverage. Similarity does not establish proficiency, Malaysian hiring demand or employment probability. Research-title relevance is not evidence of the paper's findings. See [E5 worker contract](RUNPOD_WORKER.md).

## Career Council

`scripts/council-gateway.mjs` supplies fictional text, ten skills, six roles, ten learning resources and cited source context to four sequential jobs:

1. **Profile:** explicit skill mentions with exact evidence quotes and uncertainty.
2. **Roles:** a small selection of catalogue roles with cited reasoning.
3. **Learning:** catalogue resources and a proposed practice project.
4. **Critic:** cautions and questions about the preceding suggestions.

Each stage is a separate inference pass from the same Qwen model. Accepted previous reviews become context for later jobs. The critic shares the model's weaknesses and does not certify the other passes.

The gateway streams `started`, `review`, `complete` and `error` NDJSON events. Four validated receipts are required for a complete report. Receipts include actual model/revision/device, date, duration, token counts and provider job ID. Cached reports identify themselves as cached.

The worker rejects prompts above 6,144 tokens and limits greedy generation to 384 new tokens. Invalid or truncated stage JSON is rejected without repair calls. Worker and gateway independently validate fields, allowed IDs and exact profile quotes. Role/course selections must cite their catalogue references. The server restores and orders prerequisite resources before displaying learning suggestions. These structural checks constrain output; generated interpretation still requires human review. See [Council worker contract](CAREER_COUNCIL_WORKER.md).

## Hosting and secrets

The full application needs **Replit Autoscale or another Node-capable host**. Static publication provides the local atlas fallback without either AI API. [Replit deployment types](https://docs.replit.com/features/publishing/deployment-types).

Required server values are `RUNPOD_API_KEY`, `RUNPOD_ENDPOINT_ID`, `RUNPOD_COUNCIL_ENDPOINT_ID` and `CLOUD_ACCESS_CODE`. `.env.example` also documents daily allowances and host/port settings. Credentials remain outside the browser bundle and source control. [Replit Secrets](https://docs.replit.com/core-concepts/project-editor/app-setup/secrets).

The preferred worker deployment builds directly from [hzqfarhan/SDC2026-SELADEVSUTHM](https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM), branch `main`, using root Dockerfile paths `Dockerfile.e5` and `Dockerfile.council`. Runpod's GitHub build service removes the local Docker prerequisite. [.dockerignore and deployment procedure](REPLIT_RUNPOD_SETUP.md), [Runpod GitHub integration](https://docs.runpod.io/serverless/workers/github-integration).

## Resource limits

Deployment is limited to confirmed SDC sponsor credit without additional spending. The Participant Handbook, section 9.1–9.2, PDF page 28, specifies US$25 Runpod credit per team and distribution through the team leader's [official portal](https://sdchack.my/login). Credited account balance, expiry and restrictions must be checked before resources start. Automatic reload and paid overages are disabled under this deployment policy.

| Gateway control | E5 | Council |
|---|---|---|
| Default daily allowance per process, UTC | 20 uncached attempts | 3 uncached sessions |
| Configurable maximum | 50 attempts | 5 sessions |
| In-flight limit | 1 job | 1 session, up to 4 sequential jobs |
| Completed-input cache | 1 hour | 1 hour |
| Additional client-address limit | 3 uncached attempts/minute | Session limit above |

Allowances are independent: default limits can submit up to 20 E5 jobs plus 12 Council jobs. Failed uncached attempts consume allowance. Restarts or replicas reset/multiply in-memory counters. Cancellation is best-effort and submitted work can outlive a disconnected client. These application safeguards are not monetary hard caps.

Each provider endpoint uses zero active workers, one maximum worker, a short idle timeout and bounded execution time. Active workers, startup and retained storage can incur charges. Account usage and credited balance remain the billing authority. [Runpod endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations), [billing](https://docs.runpod.io/accounts-billing/billing).

## Privacy and acceptance

Uploaded synthetic resumes parse locally. A separate cloud request sends only the fictional text explicitly confirmed in that request plus public catalogue context. The gateways do not explicitly log submitted text or persist it to disk; their caches are process memory. Hosting/provider operational logs and retention policies apply independently.

Application tests mock provider contracts; worker tests inject fake encoders and generators. These validate software behavior, not model quality, actual CUDA execution or billing. Deployment acceptance requires completed image builds, real E5/Council receipts, signed-out application access, streaming verification and redacted own-account evidence. Current acceptance status and reproducible checks are in [deployment setup](REPLIT_RUNPOD_SETUP.md) and VERIFICATION.md.


The [recorded E5 worker run](RUNPOD_EXECUTION.md) completed one synthetic CUDA request on 25 October 2026. Its pinned model output passed the application schema validator. The six-role Replit application route, signed-out publication and complete four-stage Qwen Council flow remain separate acceptance checks; the direct profile-stage CUDA receipt is recorded.


## One AI, four perspectives

Our Career Council assigns the same Qwen model four sequential roles: profile reviewer, career explorer, learning planner and critic. Each stage receives the earlier reviews, and the critic challenges the evidence and reasoning. This creates a structured comparison of suggestions for the learner. The roles share one model and are not independent experts. E5 is a separate semantic-retrieval component; it does not generate Council reviews. Our schema/citation checks organise the comparison, while the learner makes the final selection.
