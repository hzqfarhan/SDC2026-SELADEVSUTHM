# SHIFTATLAS 3D

A source-traceable career exploration prototype for **SDC Hackathon 2026, Domain 1**. A fictional learner moves from skills to explainable role coverage, an affordable learning sequence, SDG pathways and uncertain AI-adoption scenarios.

Built with Next.js, React, React Three Fiber and Three.js. The low-poly worlds are interactive geometry, not images. The Malaysia scene uses actual DOSM state polygons and official quarterly labour observations.

## Run the demo

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
| Skill constellation | Three synthetic samples, editable skill levels, hours and budget; keyword suggestions require confirmation; TF-IDF retrieves related reference roles. |
| Future Skills City | Dated TalentCorp/ILO/research references and refreshable arXiv metadata; optional evidence-derived skill weighting shows baseline and adjusted scores. |
| Career Bridges | Six real O*NET reference occupations, ranked coverage, visible weight/contribution/gap calculations and source links. |
| Learning Islands | Prerequisites before dependent skills, practice estimates, free-first resources, weekly milestones, completion tracking and Markdown export. |
| SDG World | All 17 goals with target-level contribution pathways and limitations; each role and every required skill has an explicit mapping. |
| Future Simulator | Two hypothetical adoption/support scenarios, 2026–2035 controls, visible formulas and illustrative sensitivity bands. |
| Malaysia labour atlas | All 16 states/federal territories, original DOSM MultiPolygons, 2026 Q2 unemployment/participation/employment data and a matching table. |
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

## Handoff

- [Malaysia discovery layer](docs/MALAYSIA_DISCOVERY.md): orbital selection, five landmarks, 170 directory entries, 84 geographic pins and coverage limitations.

- [Resume intake and refreshed datasets](docs/RESUME_AND_DATA.md): local parsing, privacy, review flow, provenance and transition changes.
- [Technical declaration](docs/TECHNICAL_DECLARATION.md): AI assistance, runtime methods, assets and data licences.
- [Architecture and model card](docs/ARCHITECTURE.md): formulas, data flow, risks and maintenance.
- [Data provenance](docs/DATA_PROVENANCE.md): official URLs, dates, units, hashes and granularity.
- [Deployment](docs/DEPLOYMENT.md): static hosting, local backup and evidence updates.
- [Submission package](docs/SUBMISSION.md): proposal, rubric mapping, official requirements and unresolved submission details.
- [Demo and pitch](docs/DEMO_SCRIPT.md): rehearsable demonstration and slide outline.
- [Verification record](docs/VERIFICATION.md): completed checks and manual acceptance checklist.

Only synthetic people are included. Sample edits and completed steps remain in browser local storage. No profile backend, telemetry, API key or runtime language model is used. Use fictional resumes for public demonstrations; optional resume parsing stays in browser memory, and only accepted skill levels persist. Browser automation was disabled during handoff; visual and interaction acceptance still needs a human pass. This package has not been submitted to the organiser, and a judge-accessible GitHub repository still needs to be provided.
