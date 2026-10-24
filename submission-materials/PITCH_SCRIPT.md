# SHIFTATLAS 3D pitch narration

SELADEVS UTHM. 14 slides with recorded GPU execution evidence. Includes source references for each section. The companion video combines this pitch with recorded prototype views.

## 1 SHIFTATLAS 3D

We are SELADEVS UTHM. SHIFTATLAS helps Malaysian graduates choose a credible next learning step as AI changes work. Our prototype connects reviewed skills with evidence, explainable role coverage and affordable learning.

Sources: Domain 1 brief PDF pages 2 and 4; https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM

## 2 The next learning decision

Aina is our fictional graduate. She can use spreadsheets, but cannot tell whether SQL, Python or another skill should come next. A useful result explains the trade-off and gives her an ordered plan that fits her time.

Sources: Synthetic Aina profile in src/lib/catalogue.ts; Domain 1 brief PDF pages 4 and 5

## 3 One profile across six connected modules

The same profile connects all six modules. Dated signals inform role coverage. Visible gaps become learning steps. SDG pathways add purpose, while scenarios expose uncertainty. The interface offers both 3D exploration and equivalent text controls.

Sources: src/components/Atlas.tsx; Domain 1 must-have features PDF page 5

## 4 Reviewed intake and a 3D profile

Resume parsing stays on the device. Users can load a synthetic PDF, DOCX or text file and inspect the original excerpt behind each detected mention. They review the evidence and choose their level. The avatar reflects those self-assessments, without inferring personality or employability.

Sources: src/components/ResumeIntake.tsx; src/lib/resume.ts; docs/PROFILE_STUDIO.md

## 5 Dated signals feed the rubric

An updatable arXiv feed supplies dated research titles. An explicit experiment counts skill-topic mentions and adjusts existing weights by at most twenty-five percent. In the current synthetic example, analyst coverage changes from sixty-nine to seventy percent. This demonstrates a working data-to-score loop. Research attention does not establish Malaysian hiring demand.

Sources: public/data/research.json, retrieved 19 October 2026; src/lib/signals.ts; https://export.arxiv.org/api/query

## 6 Explainable coverage and visible gaps

Each role score exposes current level, target and weight. O*NET supplies the six occupation references, while the project authors the numerical rubric. Users can inspect every contribution and gap. The percentage describes rubric coverage, with Malaysian transferability still requiring validation.

Sources: src/lib/engine.ts; src/lib/catalogue.ts; https://www.onetonline.org/link/summary/15-2051.01

## 7 Learning in prerequisite order

Learning Islands places foundations before dependent activities and estimates a sequence using skill gaps and weekly time. Real provider resources support each activity. Learners can track steps and export the plan. Completion records activity and does not automatically certify a skill.

Sources: src/lib/engine.ts, learningPlan; https://sqlbolt.com/; https://learn.microsoft.com/en-us/training/modules/introduction-power-bi/

## 8 Malaysia and the 17 SDGs

The Malaysia atlas uses actual DOSM state boundaries and quarterly state observations. We preserve that resolution and avoid city or individual inferences. Every role and required skill also connects to a specific SDG target. The app explains intended contributions across all seventeen goals, without claiming measured outcomes.

Sources: https://open.dosm.gov.my/data-catalogue/lfs_qtr_state; public/data/labour.json, 2026 Q2; https://sdgs.un.org/goals

## 9 Two uncertain adoption scenarios

The simulator compares a supported transition with accelerated adoption. Users change the year and inspect every chosen coefficient. These hypothetical indices illustrate how adoption and learning support could interact. We assign no scenario probability and make no forecast of jobs lost or an individual’s employment.

Sources: src/lib/engine.ts, simulate; https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure

## 10 Atlas Quest makes exploration playable

Atlas Quest adds a playable low-poly island. Five checkpoints reinforce evidence review, geographical resolution and uncertainty. Unique badges, outfits and companions personalise the saved explorer passport. The rewards track exploration only. A learner study is still needed to establish an engagement benefit.

Sources: src/lib/quest.ts; src/components/AtlasQuest.tsx; docs/ATLAS_QUEST.md

## 11 Career Council: four bounded reviews

Career Council adds four separate passes from one language model: profile, roles, learning and a grounding critic. The Node gateway prepares trusted context and is designed to coordinate sequential RunPod jobs. The server validates each result before showing a complete report. The weighted skill rubric stays unchanged. The cloud execution design uses the pinned worker and trusted catalogue.

Sources: src/components/CareerCouncil.tsx; scripts/council-gateway.mjs; Four viewpoints from one model, not four independent models; https://replit.com/@haziqfarhan174/SDC2026-SELADEVSUTHM; Council execution requires separate deployment acceptance

## 12 Grounding checks before the answer

The worker packages Qwen3-4B-Instruct-2507 at a pinned revision under Apache 2.0. Replit checks schema, catalogue references and exact quoted phrases. Those checks cannot prove every generated claim. Separate consent controls cloud text, and secrets stay on the server. The local matching flow remains available if a cloud review fails.

Sources: https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507; https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507/commit/cdbee75f17c01a7cc42f958dc650907174af0554; scripts/council-gateway.mjs, validateReview and validateReceipt; Qwen revision cdbee75f17c01a7cc42f958dc650907174af0554; This architecture slide does not present a completed Council result

## 13 Verified E5 GPU execution

E5 completed a real RunPod CUDA job on a PRO six thousand M I G, twenty-four gigabyte GPU. One fictional query retrieved two authored passages. Execution took three point four five two seconds, after eleven point six two six seconds in the queue. Fifty-five application tests, eighteen offline worker checks and the production build also pass. This is an execution smoke test, not a quality benchmark. Council and full Replit integration still require separate acceptance.

Sources: outputs/submission/evidence/runpod/e5-completion.json, Runpod job abdc818d-4447-4171-95d1-adafa18b47ce-e2, COMPLETED; outputs/submission/evidence/runpod/e5-completed-request-history.png, worker PRO 6000 MIG 24GB; Generated 2026-10-24T19:11:44.011980Z = 25 October 2026, 03:11 MYT; intfloat/multilingual-e5-base revision d128750597153bb5987e10b1c3493a34e5a4502a; One fictional query and two authored passages; executionTime 3452 ms; delayTime 11626 ms; 55 application tests, 18 offline worker contract checks, production build and TypeScript passed; docs/VERIFICATION.md; https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM

## 14 Pilot targets and the next phase

Our planned ten-learner pilot targets twenty percent less median planning time and eighty percent correctly explaining a score and uncertainty. No learner outcomes have been measured. Next we validate Malaysian job signals and role-change labels. The next phase evaluates whether learners can choose and explain a useful next step.

Sources: Planned ten-learner pilot accepted for proposal preparation on 25 October 2026; docs/TECHNICAL_DECLARATION.md; Domain 1 brief PDF pages 7 and 8
