# Verification record

Updated **25 October 2026, Asia/Kuala_Lumpur**. Windows; Node.js 22.20.0; Next.js 16.4.2. Earlier preparation could not use browser automation. Browser controls became available for this revision; the observations below supersede the earlier blanket statement that no visual checks were possible.

## Automated checks

**35 tests passed, 0 failed.** The full `npm test` run covers role-coverage bounds and contribution sums; monotonic skill changes; independence from names/location; learning prerequisites and calendar ordering; scenarios and uncertainty bounds; saved-profile guards; all 17 SDG mappings; role/skill learning and source coverage; real state-boundary joins; source-cited exports; research-input sensitivity and malformed/duplicate feed filtering; TF-IDF fixtures; object inspection; official SDG icon hashes; map-label collision placement; resume upload guards, evidence extraction, TXT/DOCX parsing and raw DOSM source hash.

Four game tests verify that only correct answers award a unique badge/100 XP, repeated answers cannot farm XP, malformed/unknown saved progress and unearned badge titles are rejected, all five discoveries yield 500 XP/final rank, and movement destinations remain inside the island. These test behavior, not educational validity or engagement outcomes.

The production `npm run build` compiled, passed TypeScript and exported `/`, `/atlas/` and the not-found page. Separate no-emit TypeScript checks also passed during feature development. Later UI fixes are recompiled before packaging. No new runtime dependency was introduced for the game or profile studio. The final local HTTP check returned 200 for all 18 checked routes, dataset/sample files and page-referenced JS/CSS assets.

## Browser observations

Tested with the Codex in-app browser at a desktop viewport of approximately **1265 × 711** against `http://127.0.0.1:3107`.

- The low-poly island, explorer, landmarks, companion, checkpoint controls and passport rendered with the light colour scheme. The skills world also rendered its avatar and constellation.
- All five checkpoint challenges were opened and answered. The incorrect Evidence Observatory answer displayed an explanation and allowed retry. The correct answer awarded its badge and 100 XP. Completing all five displayed 500 XP, five badges and the Atlas trailblazer rank.
- An earned Purpose connector badge was equipped. Coral outfit and cube companion selections were changed. Reopening the game restored those choices and the 500 XP progress.
- The fictional resume sample loaded locally and produced eight detected dimensions with original excerpts. Switching to 3D resume showed the selected Data literacy evidence. Selecting Evidence, separating layers and rotating brought the evidence card forward while retaining the adjacent excerpt and review state.
- Browser testing found a missing first HTML annotation and a DOM cleanup error in the default Canvas label container. Game and atlas annotations were moved to dedicated overlay portals. Repeat-click reopening of an already reached game checkpoint was also repaired. The final browser recheck showed all five label nodes, successful walking to Evidence Observatory, and successful closing/reopening at the same station. Text mode retained all five checkpoint controls. A second explicit reload verified the coral outfit, cube companion and Purpose connector equipped badge persisted. The final approach position leaves the avatar beside the building. The skill world showed all 11 annotations (ten skill nodes plus its title) and selecting Data literacy opened the three-layer inspector. The landing-page Play Atlas Quest invitation navigated to the game. Test-only quest progress was then reset to a fresh zero-XP state. The earlier DOM error remained in the historical log; no additional error appeared during these rechecks.

Screenshots are delivered beside the source package as `atlas-quest-preview.png` and `profile-studio-preview.png`. They show this desktop browser only, and are not a cross-device acceptance certificate.

## Before presenting or submitting

- [ ] Test mobile/touch layout at 390 × 844 and a real phone; check small labels and the stacked explorer passport.
- [ ] Rehearse WASD/arrow movement, focus loss, pause/resume, OS reduced motion, offscreen suspension and a hidden browser tab on the intended presentation device.
- [ ] Test a synthetic PDF upload, scanned-PDF limitations and drag/drop. TXT and DOCX parsing have automated coverage; the browser sample check used the supplied TXT fixture.
- [ ] Rehearse every module, all source/resource links, map state selection, university/landmark layers and scene camera/layer transitions on the intended device.
- [ ] Check the core evidence → role contribution → learning plan → export flow and both uncertain scenarios before the demo.
- [ ] Verify the judge-accessible hosted build and GitHub repository, team contributions and final submission requirements. No hosted publication or organiser submission is claimed by these local checks.

Browser badges and self-marked learning completions are activity records, not credentials. No study of retention, proficiency improvement, fairness or employment outcomes was conducted. Keep these limitations in the handoff and presentation.
