# Replit and Runpod setup and genuine usage evidence

Reviewed **25 October 2026, Asia/Kuala_Lumpur**, against the linked official documentation. UI labels, availability and prices can change. This is a prepared procedure, **not evidence that the team has already used or deployed to either service**. No account, paid resource, sponsor credit or live sponsor-hosted URL was created during this preparation.

## What each service would do

| Service | Appropriate role for this version | Current status |
|---|---|---|
| Replit | Import, edit, test, build and preview the application; optionally publish the static export | Configuration prepared; team must perform and record actual usage |
| Runpod | Optional remote compute for a future, separately evaluated model experiment | Not integrated or required by the current browser/rule-based MVP |

The Three.js game and atlas run on the visitor's device. A cloud GPU does not make their browser rendering faster. Matching, text retrieval and keyword extraction do not require a GPU. Do not describe a prepared configuration as a sponsor integration or fabricate proof. Check the competition's current handbook and organiser instructions for the precise sponsor requirement.

## Replit: import and run

1. Push the actual app root to the team's GitHub repository. The root must contain `package.json`, `package-lock.json`, `.replit`, `src/`, `public/` and `scripts/`. Do not import the surrounding Codex workspace, dependency folders, caches or credentials.
2. Open Replit's [import screen](https://replit.com/import), choose **GitHub**, select or enter that repository, and import it. A ZIP import is an alternative for preview; it does not create the judge-facing GitHub history. Replit documents both routes in [Import from a provider](https://docs.replit.com/build/import-from-providers).
3. Open Shell in the imported project. Verify a current Node.js 22 release, at least 22.13, and install from the lockfile:

```sh
node --version
npm ci
npm test
npm run typecheck
```

4. Select **Run**. The checked-in `.replit` builds the export and starts the included server on port 3000. It explicitly sets `HOST=0.0.0.0` so Replit can reach it and maps internal port 3000 to external port 80. The local default remains loopback. See [App Configuration](https://docs.replit.com/features/project-setup/configuration) and [Ports](https://docs.replit.com/features/project-setup/ports).
5. If import replaces the Run workflow, set its command to `npm run build && npm start`, with `HOST=0.0.0.0` and `PORT=3000`. If the Node module alias is unavailable in that workspace, use Replit's Dependencies tool to select Node.js 22 or later and recheck the actual version. No custom `replit.nix` is needed for this JavaScript-only app.
6. In Preview open `/`, `/atlas/?module=skills`, `/atlas/?module=careers`, `/atlas/?module=quest` and `/atlas/?module=malaysia`. Test a fictional resume, a skill-level change, an explained match, a learning plan and a completed quest check. Reload to check that only the documented browser-local state persists.

For manual diagnosis after a successful build:

```sh
HOST=0.0.0.0 PORT=3000 npm start
```

Use this command instead of the Run workflow, not simultaneously on the same port. No application API secret is required. Never paste a GitHub or provider token into source files or proof screenshots.

## Replit: optional published judge demo

This app uses a Next.js **static export**. In Publishing, review **Adjust settings → Deployment type**. If Static is available for the imported project, use:

| Setting | Value |
|---|---|
| Build command | `npm ci && npm run build` |
| Public directory | `out` |
| Base path | Domain root |
| Start command | None for Static |

Replit states that Static serves files without a backend and that Agent-created apps may require another deployment type. If Static is unavailable, the small Node server can be used with Autoscale: use the same build command, `npm start`, `HOST=0.0.0.0` and the mapped port. Confirm those variables in the publishing environment. [Deployment types](https://docs.replit.com/features/publishing/deployment-types).

Before publishing, review the current plan, access and cost settings. Check Usage after the import and build; an import requiring Agent migration can consume credits. Use available budget controls and avoid unnecessary Agent work or automatic credit reloads. Do not assume sponsor credit, free publication or a zero bill. [Managing Your Spend](https://docs.replit.com/billing/managing-spend).

After publication, open the actual URL in a signed-out window. Test direct navigation to `/atlas/`, data files, the PDF worker and the quest. A workspace Preview URL is not proof of a durable published judge demo. Preserve the local fallback.

## Record real Replit usage proof

Create `submission-evidence/replit/` only when there is actual evidence to put in it. Capture:

- Project identity and imported repository/commit, with no secrets visible.
- Shell output showing the actual `node --version`, tests, type check and successful build.
- Replit Preview showing a skill change affecting an explained match and learning plan.
- An actual change made and reviewed by the team in Replit, with its genuine commit/diff if a development-use claim is made.
- Published URL and signed-out access check only if publication actually occurred.

Suggested filenames are `01-project.png`, `02-verification.png`, `03-match-demo.png` and `04-team-change.png`. These are planned names, not existing screenshots. Record team member, date, commit, URL and what was demonstrated in a short `README.md`. A localhost screenshot from Codex does not establish Replit usage.

## Runpod: optional, with a concrete purpose

Do not rent a GPU merely to serve this static application. A meaningful future experiment could compare a reviewed open embedding model against the current six-role TF-IDF baseline on a fixed **synthetic** query set. Record model licence/version, fixture hashes, retrieval metrics, runtime and cost; retain explanations and human review. That experiment and any application integration are **not implemented** in this handoff.

If the organiser explicitly requests a Runpod execution demonstration, a short CPU Pod is sufficient for building and testing this repository, where available. Runpod's official management guide supports CPU and GPU Pod choices. Select a trusted image/environment with Node.js 22.13+ and Git, review the displayed rate and storage, then perform the following only in a resource the team intentionally created. [Manage Pods](https://docs.runpod.io/pods/manage-pods).

```sh
git clone YOUR_ACTUAL_GITHUB_REPOSITORY_URL shiftatlas-3d
cd shiftatlas-3d
node --version
npm ci
npm test
npm run typecheck
npm run build
```

Replace the uppercase repository placeholder before running. A successful CPU build is remote development evidence; it is not AI inference or GPU use. For an optional temporary web preview, expose HTTP port **3000** in the Pod settings and run:

```sh
HOST=0.0.0.0 PORT=3000 npm start
```

Use the HTTPS service URL shown by Runpod's **Connect** panel. Its documented proxy pattern is `https://<pod-id>-3000.proxy.runpod.net`; use the actual console-generated URL. The app serves public synthetic demonstration content only. Keep management terminals and credentials separate. [Expose ports](https://docs.runpod.io/pods/configuration/expose-ports).

## Runpod cost and cleanup controls

Review the quoted compute rate and storage before starting. Set a short time budget and a reminder to stop; enable low-balance notifications if useful. Avoid automatic top-ups unless the account owner deliberately wants them. A balance warning is not a spending cap. Runpod bills resource usage against credits, and storage can continue accruing charges after compute stops. [Billing overview](https://docs.runpod.io/accounts-billing/billing).

Export logs and outputs before cleanup. **Stop** and **Terminate** have different data-retention behavior; termination deletes data outside a network volume, and retained storage can remain billable. The account owner should review the affected resource and confirm destructive cleanup in the console. Afterwards inspect Pods, endpoints, volumes and Billing to confirm what remains. Do not rely on an empty account balance as cleanup. [Pod lifecycle and cleanup](https://docs.runpod.io/pods/manage-pods).

If actual Runpod use occurs, save console resource identity, executed commands and successful outputs, dates, genuine model details if applicable, and cost/cleanup evidence under `submission-evidence/runpod/`. Remove credentials from copies. Leave the submission claim as **not used / not applicable** until that work has actually happened.

## Team completion record

| Check | Actual evidence |
|---|---|
| Replit project imported | Pending |
| Actual tests/build completed inside Replit | Pending |
| Team's Replit development contribution recorded | Pending |
| Judge URL published and access checked, if selected | Pending |
| Runpod requirement clarified with organiser | Pending |
| Runpod task executed, if applicable | Not used in this handoff |
| Runpod outputs exported and billable resources checked, if used | Not applicable until a resource is created |

Prepared files and local tests cannot fill in this record on the team's behalf.
