# Validation methods

25 October 2026 · Windows · Node.js22.20.0 · Next.js16.4.2.

## Automated checks

**55 application tests passed, 0 failed.** The full `npm test` run covers role-coverage bounds and contribution sums; monotonic skill changes; independence from names/location; learning prerequisites and calendar ordering; scenarios and uncertainty bounds; saved-profile guards; all 17 SDG mappings; role/skill learning and source coverage; real state-boundary joins; source-cited exports; research-input sensitivity and malformed/duplicate feed filtering; TF-IDF fixtures; object inspection; official SDG icon hashes; map-label collision placement; resume upload guards, evidence extraction, TXT/DOCX parsing and raw DOSM source hash.

Four game tests verify that only correct answers award a unique badge/100 XP, repeated answers cannot farm XP, malformed/unknown saved progress and unearned badge titles are rejected, all five discoveries yield 500 XP/final rank, and movement destinations remain inside the island. These test behavior, not educational validity or engagement outcomes.

The production `npm run build` compiled, passed TypeScript and exported `/`, `/atlas/` and the not-found page. Separate no-emit TypeScript checks also passed during feature development. Later UI fixes are recompiled before packaging. No new runtime dependency was introduced for the game or profile studio. The final local HTTP check returned 200 for all 18 checked routes, dataset/sample files and page-referenced JS/CSS assets.

## Cloud revision checks

On 25 October 2026, 55 application tests and 18 offline Python worker tests passed. The new production build compiled, passed TypeScript and exported all three routes.

Eleven Council gateway tests cover four actual mocked request stages, ordered prior outputs, literal quotations, known role/course/source IDs, exact metadata and token bounds, cache/session limits, failure stopping later passes, cancellation, consent/access/origin guards, prerequisite expansion and error redaction. Nine semantic gateway tests cover server-owned role text, receipts, cache/limits/cancellation and invalid requests. Worker tests inject an encoder/generator and do not download or execute the actual models.

The Career Council has a new R3F articulated four-arm sculpture, click focus, reduced-motion handling and text alternatives, plus real server event handling and report export. Cloud Semantic Lab has an explicit consent form and source-linked result interface. Desktop observations below cover the core, game and resume flows. Separate device/browser acceptance is required for the cloud interfaces.

Provider deployment, model quality and GPU performance use separate execution records. The smoke scripts record completed provider metadata; test fixtures are distinct from these records.

## Browser observations

Tested with the Codex in-app browser at a desktop viewport of approximately **1265 × 711** against `http://127.0.0.1:3107`.

- The low-poly island, explorer, landmarks, companion, checkpoint controls and passport rendered with the light colour scheme. The skills world also rendered its avatar and constellation.
- All five checkpoint challenges were opened and answered. The incorrect Evidence Observatory answer displayed an explanation and allowed retry. The correct answer awarded its badge and 100 XP. Completing all five displayed 500 XP, five badges and the Atlas trailblazer rank.
- An earned Purpose connector badge was equipped. Coral outfit and cube companion selections were changed. Reopening the game restored those choices and the 500 XP progress.
- The fictional resume sample loaded locally and produced eight detected dimensions with original excerpts. Switching to 3D resume showed the selected Data literacy evidence. Selecting Evidence, separating layers and rotating brought the evidence card forward while retaining the adjacent excerpt and review state.
- Browser testing found a missing first HTML annotation and a DOM cleanup error in the default Canvas label container. Game and atlas annotations were moved to dedicated overlay portals. Repeat-click reopening of an already reached game checkpoint was also repaired. The final browser recheck showed all five label nodes, successful walking to Evidence Observatory, and successful closing/reopening at the same station. Text mode retained all five checkpoint controls. A second reload verified the coral outfit, cube companion and Purpose connector equipped badge persisted. The final approach position leaves the avatar beside the building. The skill world showed all 11 annotations (ten skill nodes plus its title) and selecting Data literacy opened the three-layer inspector. The landing-page Play Atlas Quest invitation navigated to the game. Test-only quest progress was then reset to a fresh zero-XP state. No additional DOM error appeared during these rechecks.

Screenshots are delivered beside the source package as `atlas-quest-preview.png` and `profile-studio-preview.png`. They show this desktop browser only, and are not a cross-device acceptance certificate.

## Before presenting or submitting

- [ ] Test mobile/touch layout at 390 × 844 and a real phone; check small labels and the stacked explorer passport.
- [ ] Rehearse WASD/arrow movement, focus loss, pause/resume, OS reduced motion, offscreen suspension and a hidden browser tab on the intended presentation device.
- [ ] Test a synthetic PDF upload, scanned-PDF limitations and drag/drop. TXT and DOCX parsing have automated coverage; the browser sample check used the supplied TXT fixture.
- [ ] Rehearse every module, all source/resource links, map state selection, university/landmark layers and scene camera/layer transitions on the intended device.
- [ ] Check the core evidence → role contribution → learning plan → export flow and both uncertain scenarios before the demo.
- [x] Check the published landing page, dashboard and both API status routes: HTTP 200, expected JSON/model revisions and configured settings on 25 October 2026. The public six-role E5 request also completed on CUDA.
- [ ] Confirm team contributions and final organiser submission requirements, then preserve the actual portal receipt.

Browser badges and self-marked learning completions are activity records, not credentials. No study of retention, proficiency improvement, fairness or employment outcomes was conducted. Keep these limitations in the handoff and presentation.

## Local HTTP check after the cloud revision

The server was restarted on port3107. GET `/`, `/atlas/`, both cloud status routes, the research snapshot and PDF worker returned200 with the expected MIME types. Both local status routes returned `configured:false`; explicit POSTs to unconfigured inference routes returned503 without model output. These are setup/fallback checks, not provider execution.

## Direct E5 GPU execution

The team-supplied RunPod response for job `abdc818d-4447-4171-95d1-adafa18b47ce-e2` returned `COMPLETED`, `device: cuda`, the expected model and pinned revision on 25 October 2026. Its output passed `validateOutput` against the exact synthetic input. Reported provider execution was 3,452 ms and delay 11,626 ms. The input used one fictional query and two authored passages. This verifies that direct worker fixture, not the six-role app gateway, model quality or representative performance. See [the execution record](RUNPOD_EXECUTION.md) and [exact provider response](evidence/runpod-e5-completion.json). The nine build-time worker tests use injected encoders and remain distinct from this real neural inference.

## Final downloadable-package check

The extracted final demo served the landing page, atlas/skills route, Council route, both cloud status routes, research data and the original SDG 4 image with HTTP 200 and appropriate MIME types. With credentials absent, an explicit semantic POST returned HTTP 503 and no model output. This check submitted no provider jobs. Both ZIPs passed integrity checks; the source contains both root Dockerfiles, worker sources and the redacted E5 receipt, and the built demo contains the same receipt documentation. Source/model quality and account deployment remain distinct from package serving.

## Direct Qwen profile-stage execution

Job `2bed0b24-4f56-4c9c-85f3-8703b0cd7b05-e2` on endpoint `yx2pzhigxtbnnm` returned `COMPLETED`, stage `profile`, device `cuda`, the pinned Qwen model/revision and a schema-valid review at 04:22:17 MYT on 25 October 2026. Both worker and gateway validators accepted its source IDs and exact fictional quotation. Provider execution was 5,927 ms, queue delay 9,342 ms and worker-reported duration 5,756 ms, with 343 input and 83 output tokens. This is one direct stage, separate from the full application/four-stage check and model-quality evaluation. See RUNPOD_EXECUTION.md and the exact provider receipt.


## Published Replit application and E5 gateway

On 25 October 2026, publication `7779ace0` served the Next.js landing page and `/atlas/?module=council` with HTTP 200. Both public status routes returned HTTP 200 JSON, `configured: true`, and the expected E5/Qwen model names and pinned revisions. The account showed Asia-region Autoscale hosting with 2 vCPU and 4 GiB RAM.

The E5 smoke check ran from the Replit workspace against the public origin, using an explicit matching Origin header, fictional text and the server-held demo code. It completed on CUDA with the expected model/revision, `cached: false`, and six role results accepted by the original smoke validator. The receipt is retained in the Replit release at `submission-evidence/runpod/latest-completion.json`. This establishes one public application request, separate from the earlier two-passage direct worker fixture and any quality or performance study.

The public Council attempt stopped before model execution because the provider returned HTTP 403. Its read-only endpoint health request also returned `Forbidden` with the provider detail, “You do not have permission to perform this action.” No complete Council report resulted from that attempt. The direct Qwen profile-stage CUDA receipt remains a separate successful worker check; the deployment guide records the endpoint-access action before another attempt.

Replit publishing analytics were enabled in the observed production settings. The application includes no analytics SDK; platform analytics and provider records are separate from browser-local profiles.

## Published product video

The [YouTube pitch and demo](https://youtu.be/e8jtdJy6deo) returned an unauthenticated HTTP 200 oEmbed response titled `SDC2026 SELADEVSUTHM PitchAndDemo`; the player displayed 6:50. The local exported video has its own measured duration and caption files. No organiser submission is inferred from publishing a video.
