# SHIFTATLAS 3D — Domain 1 submission preparation

Prepared 20 October 2026. This package is ready for team review and adaptation; it has not been submitted. Team name, members, GitHub URL and participant-specific portal fields are intentionally not invented.

## Proposal

**Problem.** A Malaysian graduate or career switcher can find AI news and long course lists, yet still struggle to decide what to learn next. Research findings, local labour context and personal skill gaps often arrive separately. A confident-looking recommendation can hide its assumptions.

**Approach.** SHIFTATLAS turns a fictional learner's self-assessed skills into a connected, inspectable journey. A skill constellation feeds six referenced career directions. Each bridge exposes the exact coverage calculation and missing skills. Learning islands put prerequisites first and attach free resources, estimated practice time and a concrete output. The user can examine research-topic weighting, see how it changes scores, compare uncertain adoption scenarios, and connect skills to SDG targets. A separate Malaysia atlas places official state-level labour context alongside the decision without treating location as an individual's capability.

**Expected outcome.** The learner leaves with a sourced, ordered plan and a clear account of what is known, assumed and still uncertain. Intended benefits are clearer next steps and lower search friction; employment, learning and SDG outcomes have not yet been measured.

**Distinctive feature.** The 3D experience visualises inspectable decisions: coverage controls career towers, prerequisites order islands, and official labour rates extrude actual polygons. Every decision also works through text controls. The innovation to demonstrate is the traceable data → signal → match → pathway loop.

**Feasibility and principal risk.** The static Next.js prototype runs without paid model inference or a database. Source snapshots make the demo reproducible. The hardest unresolved issue is whether research attention predicts useful Malaysian skill demand. The MVP labels that input as experimental; validation requires longitudinal occupational evidence and career-adviser review. It does not invent rising/declining job counts to fill that gap.

## Domain brief traceability

Source: supplied **Domain 1(1).pdf**, “The Aiversecity Future-Ready Workforce Domain”, sections 4–8. This is the domain-specific document recovered from the referenced conversation.

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

## Verified public requirements and unresolved format

The official website currently lists **25 October 2026, 11:59 PM MYT** as the preliminary submission deadline. Verify any later organiser updates in the team portal. [SDC event site](https://sdchack.my/).

The public handbook is a general guide and refers to a separate Participant Handbook for operational details. It expects a working prototype, UI and live pitch, and explains disclosure and human understanding of AI assistance. The separate handbook was not available in the recovered attachment. Exact pitch duration, page/slide limits, video requirements, file naming, portal fields and upload limits remain **unverified**. The included five-minute rehearsal is a planning choice, not an official limit. [Official handbook, sections 3, 8–9](https://sdchack.my/legal/handbook-2026-08-17.pdf).

The terms require an official GitHub repository created after competition commencement, traceable actual commit history, and no changes after the submission deadline without organiser instruction. Keep authentic timestamps; do not invent earlier development history. AI/tool disclosure does not replace participant responsibility. [Terms, sections 5.5–5.8](https://sdchack.my/legal/terms-2026-08-21.pdf).

## Submission assembly checklist

- [x] Implement working prototype and six requested modules.
- [x] Include official labour geometry/data, source dates and scope boundaries.
- [x] Include automated core checks and a successful production build.
- [x] Prepare proposal, demo narrative, deployment guide and AI/tool declaration.
- [ ] Team reviews, adapts and understands the substantial AI-assisted work; records actual contributions.
- [ ] Confirm exact operational requirements in the Participant Handbook/team portal.
- [ ] Create/provide the official team GitHub repository, preserve real history, and verify judge access.
- [ ] Complete visual, keyboard, mobile and export acceptance checks in VERIFICATION.md.
- [ ] Rehearse the actual permitted pitch length; capture any required demo video with synthetic people only.
- [ ] Replace portal-specific identity/contact fields with authorised team details.
- [ ] Check that the submitted commit, deployed build and demo match; retain a local backup.
- [ ] Submit through the authorised team portal before its deadline and preserve the receipt.

The private Sites repository/preview does not substitute for the mandatory judge-accessible GitHub repository. Do not submit an owner-only demo URL as though judges can access it. Deployment instructions provide an independent hosting route; sharing the current private demo requires an explicit access change.
