# Deployment and maintenance

Updated 25 October 2026. The local core remains a Next.js static export, served by `scripts/serve.mjs`. The Node server now also runs the optional E5 and Career Council gateways. **Use a Node-capable Replit deployment for cloud features. Static hosting provides only the local core.**

## Reproduce locally

```sh
npm ci
npm test
npm run build
npm start
```

Requires Node.js22 LTS. Open http://127.0.0.1:3000. For another local port, set `PORT=3107` before starting. The build copies the PDF worker and exports server-owned catalogues to `server-data/`. Keep `scripts/`, `server-data/`, `public/data/` and `out/` together when running the Node server.

## Replit and RunPod

Follow [the current setup guide](REPLIT_RUNPOD_SETUP.md) and [cloud integration details](CLOUD_INTEGRATION.md). Replit project: https://replit.com/@haziqfarhan174/SDC2026-SELADEVSUTHM . Use the project’s tested published origin for judge access.

For Node publishing: build `npm ci && npm run build`; start `npm start`; `HOST=0.0.0.0`, `PORT=3000`. Replit terminates HTTPS. Set provider credentials only in Secrets. Never use `NEXT_PUBLIC_` for a key. Keep both cloud features gated by a unique team demo code and fictional-text confirmation. The demo code is shared demo access, not individual user authentication.

The E5 and Council endpoints use different supplied images. Create and test them only after verifying SDC sponsor credit and disabling reload/top-up. No extra charges are authorised. Application counters are per-process and ephemeral; they are not monetary hard limits. Review worker/storage charges and stop billable resources when finished.

The local starter does not read `.env` automatically. For local cloud development use Node22's `node --env-file=.env scripts/serve.mjs` after creating an untracked file; Replit injects Secrets directly. Core local use requires no secret.

## Static fallback

Deploy `out/` to any static host with directory index support for the core demo. Serve from the domain root; preserve `_next/`, `data/`, `workers/`, images and404.html with correct MIME types. Optional `/api/` routes will be unavailable and the UI will show setup required. Do not claim Static publishing runs the cloud studio.

The public repository and downloadable functional ZIP are linked in README. The ZIP requires Node22 but no npm install; it includes the small Node gateway and catalogue files with cloud credentials unset. Do not open HTML directly. No hosted judge URL is claimed until a real signed-out test succeeds.

## Release checks

1. Run application tests, offline worker tests and build. Test actual browser/module flows on the presenting device.
2. Rebuild/publish after changing source snapshots, worker identity, catalogue or UI. Preserve publisher URLs, dates, hashes and units.
3. For cloud proof, save actual own-account project/endpoint/GPU/job screenshots plus real completion receipts. Injected test outputs do not qualify.
4. Test direct routes, PDF worker, source data, unavailable cloud fallback and signed-out judge access.
5. Review repository for credentials and real personal data; keep `.env`, caches, model weights and private submission contacts out of public commits.

External fonts/resources require internet. Browser-local progress is convenience storage and may reset across origins. Use text controls when WebGL is unavailable. Resume parsing is local; separately requested cloud text is transmitted as disclosed. A failed feed refresh preserves the last good snapshot rather than inventing missing values.
