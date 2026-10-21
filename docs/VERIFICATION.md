# Verification record

Date: 20 October 2026, Asia/Kuala_Lumpur. Environment: Windows, Node.js 22.20.0, Next.js 16.4.2.

## Automated verification

**29 tests passed.** Coverage includes zero/full skill bounds; contribution sums; monotonic skill improvements; identity/location independence; prerequisite ordering and deduplication; no unnecessary courses; scenario bounds/divergence; malformed saved profile handling; keyword boundary behavior; all 17 target-level SDG mappings; every role/skill mapped to an SDG; real boundary/state joins; source-cited export; research-input sensitivity; duplicate/malformed feed filtering; and TF-IDF fixtures. Three object-inspection tests cover every selectable object's three layers and finite camera target, unknown-object rejection, and reactive explanations that preserve uncertainty language. Camera interpolation and rendered interactions still require browser acceptance.

The production static build compiled and passed TypeScript checks. A separate TypeScript no-emit check also passed during implementation. Live official-source refreshes succeeded for labour and arXiv metadata. Additional labour validation rejected invalid numeric data, invented states and duplicate keys; a historical quarter-end cutoff excluded later quarters. These checks establish implementation behavior, not scientific validity or usability.

The latest local static HTTP check returned 200 for the landing page, atlas route, SDG query route and all 11 referenced assets; layer-inspector styles were present. The earlier data delivery check also passed for all three data files. Browser automation was disabled by Work settings, so **no successful automated browser interaction, screenshot review, WebGL/device compatibility test or end-to-end acceptance test is claimed**. Attempted preview encountered a reused-origin cache/service-worker conflict; a separate port was prepared. Manual acceptance is still required.

## Manual acceptance before presenting

- [ ] Landing page: check desktop/mobile hero, chapter links, source approach section and final call to action; confirm each chapter opens the corresponding atlas module.
- [ ] Refined 3D: inspect railings, island tiers, building windows, learning bridges across rows and globe/orbit labels for overlap or clipping.
- [ ] Object inspection: select each type of mesh/label, verify zoom and layers, collapse/reopen layers, interrupt travel by dragging, and return with Escape/reset. Check mobile inspector scrolling.
- [ ] Animation: pause/resume, enable OS reduced motion, switch browser tabs and scroll away; check motion stops as intended and analytical values stay fixed.

- [ ] Desktop: check overview, every module, labels and readability at 1280×800 and a larger screen.
- [ ] Mobile: check navigation, stacked layout and horizontal tables at 390×844; no controls hidden offscreen.
- [ ] Keyboard: navigate, activate all module buttons, edit sliders/selects, view sources, export files and close the journey without pointer input.
- [ ] Test WebGL and **Use text view**; each selection/result must remain usable without 3D.
- [ ] Reset Aina; change SQL; confirm role contribution and the plan update. Reload to check browser-local persistence.
- [ ] Apply research signals; inspect before/after values; return to baseline. Confirm the active mode is visible.
- [ ] Select all three samples; inspect all six roles; complete/uncomplete a learning step and export Markdown.
- [ ] Check Malaysia map includes Peninsular Malaysia and Borneo; select tiny federal territories in the table; compare displayed values against JSON.
- [ ] Inspect goals 1–17 and the role/skill mapping disclosure. Follow representative UN links.
- [ ] Compare both scenarios at 2026, 2030 and 2035; confirm baseline pressure is zero and uncertainty language remains visible.
- [ ] Export evidence JSON and verify it includes labour/research sources, dates and active signal weights.
- [ ] Open every source/resource link during rehearsal; check access and current cost conditions.
- [ ] Check the hosted build and intended judge access; preserve a local fallback.

Record actual tester, date, device, browser and any fixes when completing this list. Do not mark unchecked steps as passed based on code inspection alone.

The additional visual-asset test verifies all 17 official SDG icon files against their source manifest and hashes, and validates the globe collection inspection target.

Resume/data refinement: five additional tests cover upload guards, evidence extraction, TXT parsing, DOCX parsing and raw DOSM source hash. Manual PDF extraction and visual interaction acceptance remain outstanding. See RESUME_AND_DATA.md.

Malaysia discovery adds three checks for coordinate bounds/source IDs, MQA provenance without invented coordinates, and projection/display offsets. Manual acceptance: select a campus and landmark, repeat-click to orbit while zoomed, toggle all map layers, search both directory views, and verify the distinction between state tags and geographic pins.
