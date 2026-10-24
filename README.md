# SHIFTATLAS 3D

**SELADEVS UTHM** · Universiti Tun Hussein Onn Malaysia · SDC Hackathon 2026, Domain 1

[GitHub repository](https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM) · [Download functional demo](https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM/raw/refs/heads/main/demo/SHIFTATLAS-3D-static-demo.zip) · [Replit project](https://replit.com/@haziqfarhan174/SDC2026-SELADEVSUTHM) · [Replit and RunPod setup](docs/REPLIT_RUNPOD_SETUP.md) · [Requirements audit](docs/SUBMISSION_REQUIREMENTS_AUDIT.md)

A source-traceable career exploration prototype for **SDC Hackathon 2026, Domain 1**. A fictional learner moves from skills to explainable role coverage, an affordable learning sequence, SDG pathways and uncertain AI-adoption scenarios.

Built with Next.js, React, React Three Fiber and Three.js. The low-poly worlds are interactive geometry, not images. The Malaysia scene uses actual DOSM state polygons and official quarterly labour observations.

## Submission summary

**User and problem:** a Malaysian graduate or career switcher needs a source-checked next learning step as AI changes work. **Output:** an editable skill profile, six explainable role comparisons and an ordered learning plan tied to SDG targets. The optional dated research experiment visibly changes matching weights, while official Malaysian state statistics add geographic context. Atlas Quest adds five short concept checks and an explorer passport.

**Runtime:** browser computation and local storage, with a static Next.js export. No backend account, private CV dataset, hosted LLM, trained job-loss predictor or cloud GPU inference. **Sponsor setup:** `.replit` uses Node.js 22, builds the static export and runs a cloud-compatible preview. The actual team project was imported into Replit on 25 October 2026. Project link above; preview/publication verification remains pending. Current compute does not require a RunPod GPU.

**Validation:** 35 tests and production build passed. Desktop prototype, resume sample, game checkpoints, rewards and persistence were checked. See the verification record for exact limits. No user-study or employment-outcome claim is made.

## Prebuilt demo for judges

Download and extract `demo/SHIFTATLAS-3D-static-demo.zip`, open `shiftatlas-demo`, then run `START-DEMO.cmd` on Windows. Requires Node.js 22; no dependency installation is needed. Other platforms: run `node serve.mjs` in that folder. Open the URL printed by the server. The build is interactive, uses the bundled data, and provides a fallback while Replit publication is verified.

## Run from source

Requires Node.js 22 LTS and npm. Tested on Node 22.20.0. From this folder:

```sh
npm ci
npm test
npm run build
npm start
```

Open `http://127.0.0.1:3000`. To develop, run `npm run dev`. If another app uses port 3000, set `PORT=3107` before `npm start` (PowerShell: `$env:PORT='3107'`). Static output is in `out/`; opening its HTML directly with a file URL will not load the application correctly.

The home route `/` is the introductory landing page with an interactive 3D world. The working dashboard is at `/atlas/`; links such as `/atlas/?module=learning` open a specific chapter. The brand returns to the landing page. The refined scenes include layered islands, detailed buildings, railed bridges, orbital skill rings and a conceptual SDG globe. Geographic boundaries and numerical encodings remain unchanged.

Select a model or label to zoom in and reveal its three explanatory layers. Use the layer buttons to inspect sources, calculations and next steps; collapse the layers or press Escape / **Full scene** to return. From the landing or overview world, **Enter this world** opens the selected module. Scene and module transitions, rotating accents and beacon pulses respect reduced-motion preferences; **Pause motion** stops ambient motion. See [visual interaction notes](docs/UI_REFINEMENT.md).

## What works

| Module | Implemented behavior |
|---|---|
| Skill constellation | 3D profile sculpture, rotatable layered resume/passport, local synthetic PDF/DOCX/TXT intake, three synthetic samples, editable skill levels, hours and budget; keyword suggestions require confirmation; TF-IDF retrieves related reference roles. |
| Future Skills City | Dated TalentCorp/ILO/research references and refreshable arXiv metadata; optional evidence-derived skill weighting shows baseline and adjusted scores. |
| Career Bridges | Six real O*NET reference occupations, ranked coverage, visible weight/contribution/gap calculations and source links. |
| Learning Islands | Prerequisites before dependent skills, practice estimates, free-first resources, weekly milestones, completion tracking and Markdown export. |
| SDG World | All 17 goals with target-level contribution pathways and limitations; each role and every required skill has an explicit mapping. |
| Future Simulator | Two hypothetical adoption/support scenarios, 2026–2035 controls, visible formulas and illustrative sensitivity bands. |
| Malaysia labour atlas | All 16 states/federal territories, original DOSM MultiPolygons, 2026 Q2 unemployment/participation/employment data and a matching table. |
| Atlas Quest (extra feature) | Low-poly island exploration, five short sourced concept checks, unique XP/badge awards, an explorer passport, cosmetic choices and browser-local saved progress. |
| Sources & methods | Evidence export, geographical scope, dates, assumptions and runtime tool disclosure. |

Use the guided journey or go directly to **Future Skills City → Apply research signals to matches → Career Bridges** to demonstrate the data-to-matching MVP. Change a skill level and inspect its contribution; export the resulting learning plan.

## What the numbers mean

Skill coverage is an authored weighted rubric, **not a probability of employment**. O*NET supplies occupation references, not our numeric targets or weights. Research titles indicate attention within a small query-biased sample, not local hiring demand. The simulator is a sensitivity exercise, not an empirically fitted forecast. Learning titles are authored practice activities attached to real provider resources; practice hours are our estimates.

The data-to-score loop is implemented. Validated forecasts of emerging/declining occupations, live job postings, Malaysian occupation calibration, and measured educational/employment outcomes remain future work. The app does not claim to have solved those research problems.

## Refresh evidence

```sh
npm run refresh:labour
npm run refresh:research
npm test
npm run typecheck
npm run build
```

Refresh scripts contact official public sources and preserve the last good file on fetch/validation failure. A rebuild and deployment publish the new snapshot. There is no hidden background refresh or scheduler. Labour refresh does not change role rankings; research-topic weighting can change coverage and learning priority when explicitly enabled.

## Team

All four members are affiliated with Universiti Tun Hussein Onn Malaysia.

- Muhammad Haziq Farhan bin Nordin — team leader
- Muhammad Khairul Ibad bin Jima'ain
- Muhammad Aizat Ridhauddin bin Mohd Rizal
- Muhammad Qaid Uqail bin Khairul Anuar

The team reports completing the mandatory SDC GenAI, Database and Cloud Deployment workshops. Team members must review and understand all AI-assisted materials before signing the official declarations.

## Licence and attribution

Original project code and documentation use [Apache License 2.0](LICENSE). Preserve [NOTICE](NOTICE) and [third-party notices](THIRD_PARTY_NOTICES.md). DOSM data, UN icons, Wikidata/MQA facts, upstream packages and linked provider content retain their own terms. Major Codex development assistance and the generated icon are disclosed in the technical declaration.

## Handoff

- [Atlas Quest](docs/ATLAS_QUEST.md): the highlighted extra game, five concept checks, achievements, explorer passport and storage. Open `/atlas/?module=quest`.
- [3D profile and resume studio](docs/PROFILE_STUDIO.md): avatar bars, readable layer controls and local reviewed resume evidence.

- [Malaysia discovery layer](docs/MALAYSIA_DISCOVERY.md): orbital selection, five landmarks, 170 directory entries, 84 geographic pins and coverage limitations.

- [Resume intake and refreshed datasets](docs/RESUME_AND_DATA.md): local parsing, privacy, review flow, provenance and transition changes.
- [Technical declaration](docs/TECHNICAL_DECLARATION.md): AI assistance, runtime methods, assets and data licences.
- [Architecture and model card](docs/ARCHITECTURE.md): formulas, data flow, risks and maintenance.
- [Data provenance](docs/DATA_PROVENANCE.md): official URLs, dates, units, hashes and granularity.
- [Deployment](docs/DEPLOYMENT.md): static hosting, local backup and evidence updates.
- [Submission package](docs/SUBMISSION.md): proposal, rubric mapping, official requirements and unresolved submission details.
- [Demo and pitch](docs/DEMO_SCRIPT.md): rehearsable demonstration and slide outline.
- [Verification record](docs/VERIFICATION.md): completed checks and manual acceptance checklist.

Only synthetic people are included. Sample edits and completed steps remain in browser local storage. No profile backend, telemetry, API key or runtime language model is used. Use fictional resumes for public demonstrations; optional resume parsing stays in browser memory, and only accepted skill levels persist. See the verification record for the latest automated checks, browser observations and outstanding device acceptance. Submission is complete only after the official PDFs, real platform proof, slides, accessible 5–7 minute YouTube video and functional prototype/repository links are accepted by the portal. See the requirements audit for the exact morning deadline and outstanding team actions.
