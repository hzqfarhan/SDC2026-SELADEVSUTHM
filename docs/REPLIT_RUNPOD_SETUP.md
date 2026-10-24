# Replit and Runpod deployment

Updated 25 October 2026. Repository: [hzqfarhan/SDC2026-SELADEVSUTHM](https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM). Application project: [SDC2026-SELADEVSUTHM on Replit](https://replit.com/@haziqfarhan174/SDC2026-SELADEVSUTHM).

The application uses a Replit-compatible Node gateway and two Runpod Queue endpoints: E5 semantic retrieval and Qwen Career Council. Local Docker is not required for the preferred GitHub deployment route.

## 1. Activate sponsor resources

The SDC Participant Handbook, section 9.1–9.2, PDF page 28, provides Replit Core worth US$20 per participant and US$25 Runpod credit per team for the Preliminary Round. Resources are distributed through the team leader's official portal. Sign in at [sdchack.my/login](https://sdchack.my/login) and follow the account-specific resource instructions. Section 9.3 requires Replit in the solution; section 9.4 requires Runpod for work needing a GPU.

Deployment policy is **SDC sponsor credit only, with no additional spending**. Before a paid build, endpoint or publication:

- Confirm the credit has reached the correct account and check its remaining balance, expiry and permitted services.
- Disable automatic payment/reload and avoid paid overages or purchases beyond sponsor credit.
- Review the current build, hosting, inference and retained-storage charges.
- Keep each model endpoint at zero active workers and one maximum worker.

Worker and application limits reduce exposure; they do not establish a monetary hard cap. Account billing must remain within the credited allowance. [Runpod billing](https://docs.runpod.io/accounts-billing/billing), [Replit spend management](https://docs.replit.com/billing/managing-spend).

## 2. Prepare the Replit application

Import or pull the repository's `main` branch into the existing Replit project. Its root contains `package.json`, `.replit`, `src/`, `public/`, `scripts/`, `server-data/` and `runpod/`. Confirm the package name is `shiftatlas-3d`.

In Replit Shell:

```sh
node --version
npm ci
npm test
npm run typecheck
npm run build
```

Use Node.js 22.13 or later. The build prepares the PDF worker and exports the trusted server catalogues. Required outputs are `out/index.html`, `out/atlas/index.html`, `server-data/semantic-catalogue.json` and `server-data/council-catalogue.json`.

The Run workflow builds and starts the application. To start an existing build directly:

```sh
HOST=0.0.0.0 PORT=3000 npm start
```

`.replit` maps internal port 3000 to external port 80. Use one server process per port. [Replit configuration](https://docs.replit.com/features/project-setup/configuration), [port configuration](https://docs.replit.com/features/project-setup/ports).

## 3. Build Runpod endpoints directly from GitHub

Runpod can build, store and deploy an image directly from the repository. The root recipes `Dockerfile.e5` and `Dockerfile.council` use repository-root `COPY` paths; `.dockerignore` limits the build context to worker files. [Official GitHub integration](https://docs.runpod.io/serverless/workers/github-integration).

1. In Runpod **Settings → Connections**, connect GitHub and grant access to the selected `hzqfarhan/SDC2026-SELADEVSUTHM` repository.
2. Open **Serverless → New Endpoint → Import Git Repository**.
3. Select the repository and branch `main`.
4. Create the E5 endpoint using **Dockerfile Path: `Dockerfile.e5`**.
5. Select **Queue** and configure the limits below before deploying.
6. Create a separate Council endpoint from the same repository and branch using **Dockerfile Path: `Dockerfile.council`**.
7. Inspect each endpoint's **Builds** tab and build logs. A completed build is distinct from a completed inference job.

| Setting | E5 | Career Council |
|---|---|---|
| Endpoint type | Queue | Queue |
| Dockerfile path | `Dockerfile.e5` | `Dockerfile.council` |
| Active workers | 0 | 0 |
| Maximum workers | 1 | 1 |
| GPUs per worker | 1 | 1 |
| `REQUIRE_GPU` | 1 | 1 |
| Idle timeout | Short, e.g. 5 seconds | Short, e.g. 5 seconds |
| Network volume | Not required | Not required |

Select CUDA-compatible hardware and review its current rate. A 24 GB GPU is an initial planning option for Council, not a measured requirement. Apply a bounded execution timeout and verify cold-start latency against the gateway's approximately 90-second provider wait. These Queue workers need no exposed HTTP/TCP port.

Runpod's GitHub integration builds the image automatically. Subsequent source changes require a repository release to trigger the documented update flow; record the deployed release/commit and image digest. [GitHub build lifecycle](https://docs.runpod.io/serverless/workers/github-integration), [endpoint settings](https://docs.runpod.io/serverless/endpoints/endpoint-configurations).

### Alternative: local container build

For a registry-managed release, build the same root recipes with repository-root context:

```sh
docker build --platform linux/amd64 -f Dockerfile.e5 -t TEAM_REGISTRY/shiftatlas-e5:1.0.0 .
docker build --platform linux/amd64 -f Dockerfile.council -t TEAM_REGISTRY/shiftatlas-council:1.0.0 .
```

Replace `TEAM_REGISTRY` with the actual registry namespace, push the images through its authenticated workflow and deploy their immutable digests. This alternative is unnecessary when using direct GitHub builds. [Registry deployment](https://docs.runpod.io/serverless/workers/deploy).

The E5 worker has a recorded direct CUDA completion on endpoint `7ib627oev3kwlb`; see [the execution record](RUNPOD_EXECUTION.md). This endpoint ID is a configuration identifier, not a credential. The application gateway must still be configured and tested.

## 4. Configure Replit Secrets

Set the following in the application's server environment. The first four values are required for both AI paths; the remaining values control the demo allowance and server binding.

| Name | Value |
|---|---|
| `RUNPOD_API_KEY` | Server-held provider credential |
| `RUNPOD_ENDPOINT_ID` | E5 Queue endpoint ID |
| `RUNPOD_COUNCIL_ENDPOINT_ID` | Council Queue endpoint ID |
| `CLOUD_ACCESS_CODE` | Private demo access code, at least 12 characters |
| `CLOUD_DAILY_JOB_LIMIT` | 20 by default; maximum 50 |
| `COUNCIL_DAILY_SESSION_LIMIT` | 3 by default; maximum 5 |
| `HOST` | `0.0.0.0` |
| `PORT` | `3000` |

Use `.env.example` as the variable-name reference. Provider credentials must remain server-side, outside source control, browser bundles and `NEXT_PUBLIC_` variables. A scoped credential is preferable where supported. The demo access code is separate from the provider key. [Replit Secrets](https://docs.replit.com/core-concepts/project-editor/app-setup/secrets).

E5 and Council allowances are independent. One Council session can submit four jobs. Both use one-hour process-memory caches; restarts and multiple instances can reset or multiply counters. They are application safeguards rather than billing caps.

## 5. Check configuration

With the Node server running, these read-only routes do not invoke a model:

```sh
curl -fsS http://127.0.0.1:3000/api/cloud-status
curl -fsS http://127.0.0.1:3000/api/council-status
```

`configured: true` means the expected server values are present. The `configured-unverified` state does not establish endpoint health, credited balance or GPU execution.

## 6. Verify E5 inference

Use fictional experience without personal details in Cloud Semantic Lab. Confirm the transfer disclosure, enter the demo code and submit one request. Check the returned model revision, date, device, allowed role IDs and source links. Similarity remains separate from deterministic skill coverage.

The Shell smoke check submits one request and records a completion receipt:

```sh
CLOUD_APP_URL=https://ACTUAL_APP_ORIGIN node scripts/smoke-cloud.mjs --run-cloud-job
```

Use the actual app origin with the demo code in the server environment. Review `submission-evidence/runpod/latest-completion.json` and its cached status. A cached result is not a new inference job. This command does not test Council.

## 7. Verify all four Council stages

Career Council sends a separately confirmed fictional brief. The gateway runs profile → roles → learning → critic as four distinct Queue jobs and streams NDJSON stage events to the browser. A complete report requires four validated receipts. The server checks source/role/course/skill IDs, exact profile quotations and learning prerequisites. Generated interpretations still require human review.

The Council smoke check requests up to four jobs:

```sh
CLOUD_APP_URL=https://ACTUAL_APP_ORIGIN node scripts/smoke-council.mjs --run-four-cloud-jobs
```

Inspect `submission-evidence/runpod/latest-council-completion.json`, four actual provider job identities, model/revision/device, timing and token counts. Verify that skill levels and rubric scores remain unchanged. A timeout or interrupted client can leave provider work running; inspect jobs and account usage before another submission.

## 8. Publish the Node application

Use **Replit Autoscale or another Node-capable deployment**:

| Setting | Value |
|---|---|
| Build | `npm ci && npm run build` |
| Start | `npm start` |
| Host / internal port | `0.0.0.0` / `3000` |
| Required runtime files | `scripts/`, `server-data/`, `public/data/`, `out/` |
| Environment | Server Secrets from step 4 |

Static publishing serves the local atlas fallback only. It cannot run the AI gateways or use server secrets. After publication, test the real URL in a signed-out browser, both status routes, source links, PDF parsing and an authorised cloud flow. [Replit deployment types](https://docs.replit.com/features/publishing/deployment-types).

## 9. Record deployment acceptance

Keep source/release/image/model identifiers, configuration, test results and redacted completion receipts with the deployment record. The Participant Handbook, section 10.6–10.7, PDF page 29, requires own-account Replit proof and Runpod dashboard evidence; Serverless proof uses the endpoint URL in place of a Pod ID and includes GPU/runtime details.

| Acceptance item | Status |
|---|---|
| Replit project | Imported |
| Replit dependency installation/build | Not verified |
| Node publication and judge access | Not verified |
| RunPod sponsor credit | US$25 redeemed and auto-pay off, confirmed by the team; remaining balance is checked in Billing |
| E5 image build/download/upload | Completed; build log and image tag recorded |
| Council runtime / build provenance | Profile-stage CUDA completed; exact image/build records are separate |
| E5 GPU completion | COMPLETED / CUDA; 3.452 s execution, 11.626 s delay; exact receipt retained |
| Council endpoint | `yx2pzhigxtbnnm` |
| Council profile completion | COMPLETED / CUDA; 5.927 s execution, 9.342 s delay |
| Four-stage Council completion | Full application test is next |

After testing, inspect active workers, endpoints, Pods, volumes and billing. Export results before removing resources. No persistent volume is required by the baked-model recipes.
