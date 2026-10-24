# Deployment and maintenance

**Publication status, 20 October 2026:** the Site was registered earlier, but both credential renewal and a subsequent lookup returned `Sites project not found`. No successful source push or production deployment was confirmed. The existing project ID is preserved; no duplicate Site was created. Reconnect the account/workspace that owns the registered project before resuming that route, or deploy the built static output independently. An expected Site URL is not a verified live demo.

## Reproduce locally

Use Node.js 22 LTS and the committed package lock. No application secrets or paid API account are required.

```sh
npm ci
npm test
npm run typecheck
npm run build
npm start
```

`npm start` serves `out/` at `http://127.0.0.1:3000`. The custom server is for local demonstration, binds only to loopback and should not be used as an internet-facing production server. Use a static host for production. PowerShell alternate port:

```powershell
$env:PORT='3107'
npm start
```

## Host the static build

Deploy the entire `out/` directory to a static host supporting directory index files. Preserve `_next/`, `data/` and `404.html`. Serve from the domain root because data URLs begin with `/data/`; subfolder hosting requires changing the base path and fetch URLs together. Use HTTPS and correct JSON/JavaScript/CSS content types. This app has no server functions, API routes or database migrations.

For a Git-connected static host, the normal build command is `npm ci && npm run build` and the output directory is `out`. Exact host control labels depend on the provider. Source imports and browser local storage remain independent of hosting.

The checked-in `.openai/hosting.json` binds this checkout to its current **private Sites project** and declares `out` as the static directory. Preserve that ID when updating the same Site. Do not reuse its identity for a different team's Site. Source credentials are short-lived and must never be added to files or Git. Current Site publication is owner-private; judge access requires an intentional sharing decision or an independently hosted demo.

## Update evidence

```sh
npm run refresh:labour
npm run refresh:research
npx tsx scripts/source-register.ts
npm test
npm run typecheck
npm run build
```

Inspect diffs in both JSON snapshots, the generated register and any curated catalogue changes. Commit the actual reviewed state, deploy its matching build and record the commit used for judging. The labour script checks the newest complete ended quarter and retains original source units. The research script retrieves up to six records; new retrieval dates do not imply new findings. Neither script rewrites the curated TalentCorp/ILO cards.

There is no scheduled updater in this MVP. The UI transparently shows snapshot dates. Keep the last good snapshot if an upstream source is unavailable; do not silently substitute invented data. If refreshing fails, use the pinned demo and disclose its date.

## GitHub handoff

The organiser requires GitHub. The Sites source repository is separate and does not meet that requirement by itself. A destination GitHub account/repository was not provided or connected in this workspace, so no judge-facing GitHub repository has been created here.

Create the team repository in accordance with the competition rules. Push the actual project source and authentic history, excluding `node_modules/`, `.next/`, `out/`, `.sites-runtime/`, credentials and `.env` files. Keep `package-lock.json`, source, tests, scripts, public snapshots and docs. Verify judge access and the submitted commit. Do not manufacture commits or backdate activity. Choose any project licence as a team decision; preserve source attributions.

## Demo fallback and troubleshooting

- If WebGL is unavailable, use **Use text view**. Equivalent selections and results are in the HTML panels.
- If a map file fails to load, use the official-source link; missing statistics are not filled in.
- If the feed is unavailable, display the existing dated snapshot. A refresh is not required to demonstrate deterministic matching.
- If local storage is blocked, edits last only for the visit. Reset the synthetic sample before a new demonstration.
- If a different app appears on localhost, use a fresh port; an unrelated service worker on a reused origin can intercept requests.
- If fonts fail offline, system fallbacks remain usable. External source and resource pages require internet; the core matching and bundled data do not after local load.
- If deployment fails, retain `out/` and the source archive for local presentation. Do not call a build successful unless the build process exits successfully.

Resume support: `npm run build` runs the PDF worker-copy pre-hook. When invoking Next directly, first run `node scripts/prepare-workers.mjs`. Host `/workers/pdf.worker.min.mjs` with a JavaScript MIME type and serve the worker from the same origin. The included static server supports this.

## SDC Replit configuration

The root `.replit` selects Node.js 22. Run `npm ci` once in Replit Shell, then use Run. It builds `out/` and serves it with `HOST=0.0.0.0 PORT=3000`. Local `npm start` still defaults to loopback. For publishing a static export, use build `npm ci && npm run build` and public directory `out` where Static publishing is available; inspect the current Replit plan and cost controls. See REPLIT_RUNPOD_SETUP.md. Platform configuration is separate from actual own-account proof.
