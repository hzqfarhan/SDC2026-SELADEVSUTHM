# Replit artifact workspace deployment

Published application: [SHIFTATLAS](https://sdc-2026-seladevsuthm.replit.app/). Account project: [SDC2026-SELADEVSUTHM](https://replit.com/@haziqfarhan174/SDC2026-SELADEVSUTHM).

This project uses Replit's artifact workspace: one website artifact and one API artifact. Their production manifests control publishing. Updating the root `.replit` file alone does not change those artifact commands.

On 25 October 2026, publication `7779ace0` served the Next.js landing page and dashboard with HTTP 200. Both public AI status routes returned HTTP 200 JSON with `configured: true` and the expected pinned model revisions. Our account showed Asia-region Autoscale hosting with 2 vCPU and 4 GiB RAM. The published six-role E5 gateway also completed a non-cached CUDA request with the expected model and revision. Page access, API configuration and model execution have separate records.

## Prepare the pinned release

The release contains the built Next.js pages, public data, trusted catalogues and both Node gateways. It requires no dependency installation at runtime. Preserve the current workspace and back up both artifact manifests before editing them.

From the workspace root:

```sh
curl -fsSL https://raw.githubusercontent.com/hzqfarhan/SDC2026-SELADEVSUTHM/384de37ece2555e732b71d35dfea56d41640c4a8/demo/SHIFTATLAS-3D-static-demo.zip -o /tmp/shiftatlas-384de37.zip
echo '2f13e379b08cfa212874f5af0f18a4ac9da62b73957b23ac36faaccacc6843b0  /tmp/shiftatlas-384de37.zip' | sha256sum -c -
mkdir -p shiftatlas-release-384de37
unzip -qn /tmp/shiftatlas-384de37.zip -d shiftatlas-release-384de37
```

Proceed only when the checksum prints `OK`. The directory is a pinned snapshot from source commit `384de37ece2555e732b71d35dfea56d41640c4a8`; rebuilding newer source requires a new release package and checksum.

Save the following as `launch-shiftatlas.mjs` at the workspace root:

```js
import {fileURLToPath} from 'node:url';
process.env.RUNPOD_ENDPOINT_ID = '7ib627oev3kwlb';
process.env.RUNPOD_COUNCIL_ENDPOINT_ID = 'yx2pzhigxtbnnm';
process.env.RUNPOD_API_KEY = (process.env.RUNPOD_API_KEY || '').trim();
process.env.HOST ||= '0.0.0.0';
process.env.PORT ||= '3000';
process.chdir(fileURLToPath(new URL('./shiftatlas-release-384de37/shiftatlas-demo/', import.meta.url)));
await import('./shiftatlas-release-384de37/shiftatlas-demo/serve.mjs');
```

The endpoint IDs identify our two Queue endpoints and are public configuration. The API key stays in Replit Secrets and is trimmed only in the running process. The private `CLOUD_ACCESS_CODE` stays unchanged in Secrets. No credential belongs in the launcher, source package or browser bundle.

## Configure the two artifacts

Keep the website and API artifacts and update their existing production settings. The paths below resolve from the workspace root.

Website manifest: `artifacts/shiftatlas/.replit-artifact/artifact.toml`.

| Production setting | Value |
|---|---|
| Kind | `web` |
| Build command | `node --check launch-shiftatlas.mjs` |
| Serve | `static` |
| Public directory | `shiftatlas-release-384de37/shiftatlas-demo/out` |
| Exact rewrite `/atlas` | `/atlas/index.html` |
| Exact rewrite `/atlas/` | `/atlas/index.html` |

Use the built pages directly; do not run the older Vite frontend build over this public directory. The two exact rewrites preserve the dashboard entry point without replacing missing assets or API errors with landing-page HTML.

API manifest: `artifacts/api-server/.replit-artifact/artifact.toml`.

| Production setting | Value |
|---|---|
| Build arguments | `["node", "--check", "launch-shiftatlas.mjs"]` |
| Run arguments | `["node", "launch-shiftatlas.mjs"]` |
| Existing environment | `PORT=8080`, `NODE_ENV=production` |
| Startup health path | `/api/cloud-status` |

Keep the API artifact's existing routing and port. The launcher uses the provided `PORT`, changes into the release directory and starts the Node server there. This working directory is required because `out/` and `server-data/` are relative paths.

Confirm the deployment includes `RUNPOD_API_KEY` and `CLOUD_ACCESS_CODE` through Replit's production Secrets. Check names and masked presence; do not reveal or copy secret values into logs. Republish the existing application with its existing resource allocation and sponsor-credit limits.

## Check the published release

Open these read-only routes:

- [Landing page](https://sdc-2026-seladevsuthm.replit.app/)
- [Career Council](https://sdc-2026-seladevsuthm.replit.app/atlas/?module=council)
- [E5 status](https://sdc-2026-seladevsuthm.replit.app/api/cloud-status)
- [Council status](https://sdc-2026-seladevsuthm.replit.app/api/council-status)

Both status routes returned JSON with `configured: true`. This confirms settings are present and submits no model job. An explicitly confirmed fictional E5 request through the public app completed on CUDA and passed the six-role smoke check, with `cached: false`.

The current server credential reaches E5; Council returned HTTP 403 before model execution. Include endpoint `yx2pzhigxtbnnm` in that credential's allowed endpoints before submitting another Council request. A full Council result needs profile, roles, learning and critic completion receipts.

Retain the publication record, actual request receipts and a masked own-account screenshot. See [Replit and RunPod setup](REPLIT_RUNPOD_SETUP.md#9-record-deployment-acceptance) for the dated acceptance record and [RunPod execution](RUNPOD_EXECUTION.md) for the recorded CUDA jobs.
