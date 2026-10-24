# SHIFTATLAS 3D — Domain 1 submission preparation

Updated 25 October 2026 for SELADEVS UTHM, Universiti Tun Hussein Onn Malaysia. This document maps the implementation to Domain 1 and the supplied submission requirements. It does not constitute an organiser submission receipt.

## Proposal

**Problem.** A Malaysian graduate or career switcher can find AI news and long course lists, yet still struggle to decide what to learn next. Research findings, local labour context and personal skill gaps often arrive separately. A confident-looking recommendation can hide its assumptions.

**Approach.** We built SHIFTATLAS to turn a learner's self-assessed skills into a connected, inspectable journey. A skill constellation feeds six referenced career directions. Each bridge exposes the exact coverage calculation and missing skills. Learning islands put prerequisites first and attach free resources, estimated practice time and a concrete output. The user can examine research-topic weighting, see how it changes scores, compare uncertain adoption scenarios, and connect skills to SDG targets. A separate Malaysia atlas places official state-level labour context alongside the decision without treating location as an individual's capability.

**Expected outcome.** The learner leaves with a sourced, ordered plan and a clear account of what is known, assumed and still uncertain. Intended benefits are clearer next steps and lower search friction; employment, learning and SDG outcomes have not yet been measured.

**Distinctive feature.** The 3D experience visualises inspectable decisions: coverage controls career towers, prerequisites order islands, and official labour rates extrude actual polygons. Every decision also works through text controls. The innovation to demonstrate is the traceable data → signal → match → pathway loop.

**Feasibility and principal risk.** The core Next.js prototype runs without paid model inference or a database. Optional E5 semantic retrieval and the four-pass Career Council use a Replit Node gateway plus RunPod workers once separately configured. One direct E5 CUDA request is recorded; our Qwen profile stage has also completed on CUDA. The complete gateway/four-stage flow is a separate check. Source snapshots make the demo reproducible. The hardest unresolved issue is whether research attention predicts useful Malaysian skill demand. The MVP labels that input as experimental; validation requires longitudinal occupational evidence and career-adviser review. It does not invent rising/declining job counts to fill that gap.

## Domain brief traceability

Source: supplied **Domain 1.pdf**, “The Aiversecity Future-Ready Workforce Domain”, sections 4–8; reviewed alongside the official and participant handbooks and both submission templates.

| Requirement | Implemented demonstration | Evidence / limitation |
|---|---|---|
| Skills intake | Form, synthetic samples, skill levels, weekly time, budget | Form is the chosen permitted intake route; no real CVs. |
| Updatable AI-trend source with dates | arXiv refresh script, dated metadata, curated TalentCorp/ILO context | Manual refresh and rebuild; research attention does not prove job demand. |
| Explainable role ranking and gaps | Career Bridges and contribution table | Six actual O*NET occupations; authored numeric rubric. |
| Ordered affordable learning | Prerequisite traversal, weekly sequence and export | Free content resources; estimates exclude indirect costs. |
| Each role and skill linked to SDGs | Expand pathway mapping; inspect all 17 goals | Intended contributions, not measured impact. |
| Multiple uncertain futures | Supported and accelerated adoption scenarios | Explicit hypothetical coefficients, no probabilities. |
| Output responds to evidence | Apply research signals; inspect baseline/adjusted table | Updates affect weights and may affect scores/order; no guaranteed movement for every profile. |

## Preliminary rubric

The supplied brief gives **Innovation & Creativity 30%; Problem–Solution Fit 25%; Feasibility 25%; Clarity 20%**. Demonstrate the working evidence-to-match loop first. Explain all six features and identify the hardest risk. Use the map and 3D scenes to clarify the decision. The brief requires a GitHub repository accessible to judges and states that the final round has a separate rubric.

## Submission requirements

The supplied Participant Handbook gives the preliminary deadline as **25 October 2026, 07:59:59 AM MYT**, section 6.3.1, PDF page 10. Use the team portal or committee announcements to confirm any subsequent official change. Do not assume an extension; the requirements audit records the supplied source and timing.

The official handbook, participant handbook, Domain 1 brief and both submission templates were reviewed. The detailed [requirements audit](SUBMISSION_REQUIREMENTS_AUDIT.md) records the required repository, Apache 2.0 licence, platform evidence, completed forms, slides, accessible prototype and 5–7 minute YouTube product demo. Signatures, the actual video URL and final organiser submission must use the team's completed account actions.

The terms require an official GitHub repository created after competition commencement, traceable actual commit history, and no changes after the submission deadline without organiser instruction. Keep authentic timestamps; do not invent earlier development history. AI/tool disclosure does not replace participant responsibility. [Terms, sections 5.5–5.8](https://sdchack.my/legal/terms-2026-08-21.pdf).

## Submission assembly

The public [repository](https://github.com/hzqfarhan/SDC2026-SELADEVSUTHM) contains the code, Apache 2.0 licence, notices, source snapshots, tests and deployment guides. The downloadable functional build provides a local fallback. The private handoff includes the official proposal and technical declaration, editable 14-slide deck, PDF, 5–7 minute pitch/walkthrough, platform evidence and source/demo packages.

Our final submission process includes reviewing the added cloud code, signing the official declarations, verifying judge access to our application and video, providing designated committee repository access and submitting through the team portal. We retain the submitted commit and portal receipt.

## Additional highlight — 25 October refinement

Atlas Quest is an optional engagement feature: a playable low-poly discovery island with five sourced concept checks, browser-local achievements, XP and an explorer passport. The landing page and dashboard highlight it. The 3D profile sculpture and layered resume studio connect the visual experience to actual self-assessment and reviewed text evidence. No measured engagement improvement, credential or new predictive capability is claimed. Keep the data-to-matching MVP central to the pitch; show the game briefly as a differentiator and include it in the AI/tool declaration.

## Current submission artifacts

The local handoff includes official14-page proposal and16-page technical-declaration drafts, an updated14-slide editable pitch deck and PDF, a5–7minute edited pitch/walkthrough video, source/demo ZIPs, source provenance and cloud setup guides. A direct E5 CUDA request is evidenced in RUNPOD_EXECUTION.md. The leader signature, added-cloud participant review, Replit gateway/publication checks, Council execution, YouTube watch link and actual portal receipt remain separate completion steps. Do not equate completed local artifacts with a submitted entry.
