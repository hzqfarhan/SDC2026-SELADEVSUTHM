# SHIFTATLAS 3D - Domain 1 repository submission

**SELADEVS UTHM** · Universiti Tun Hussein Onn Malaysia · SDC Hackathon 2026

We have already submitted our entry through sdchack.my, as confirmed by our team. This repository provides our implementation, product access, presentation and supporting documents. The [submission index](../submission-materials/SUBMISSION_INDEX.md) is the starting point for judges.

## Submission materials

| Material | Access |
|---|---|
| Official preliminary proposal | [SDC2026_SELADEVSUTHM_Preliminary.pdf](../submission-materials/SDC2026_SELADEVSUTHM_Preliminary.pdf) |
| Official technical tools declaration | [SDC2026_SELADEVSUTHM_TechDeclaration.pdf](../submission-materials/SDC2026_SELADEVSUTHM_TechDeclaration.pdf) |
| Pitch slides | [Editable PowerPoint](../submission-materials/SHIFTATLAS_PitchDeck.pptx) · [PDF](../submission-materials/SHIFTATLAS_PitchDeck.pdf) |
| Pitch and product demonstration | [YouTube](https://youtu.be/e8jtdJy6deo) · [MP4](../submission-materials/SHIFTATLAS_PitchAndDemo.mp4) · [Captions](../submission-materials/SHIFTATLAS_Captions.srt) |
| Live application | [SHIFTATLAS on Replit](https://sdc-2026-seladevsuthm.replit.app/) |
| Functional local build | [Download demo ZIP](../demo/SHIFTATLAS-3D-static-demo.zip) |
| Platform usage and source records | [Submission evidence index](../submission-materials/SUBMISSION_INDEX.md) · [RunPod execution](RUNPOD_EXECUTION.md) |
| Source code and setup | [Repository README](../README.md) · [Architecture](ARCHITECTURE.md) · [Deployment](REPLIT_RUNPOD_SETUP.md) |

We preserve the supplied official template pages in our repository copies of the proposal and declaration.

## Problem, approach and intended outcome

We help Malaysian tertiary learners and early-career workers turn existing experience into a next learning step they can understand and afford. SHIFTATLAS connects a reviewed profile, dated evidence, explainable role comparisons and ordered learning through inspectable 3D worlds and text controls.

Our main demonstration is the **evidence → role match → learning pathway** loop. A learner changes a skill level or applies research-topic weights, inspects the resulting score contributions and gaps, then exports an ordered plan. Official Malaysian labour observations provide geographic context without being treated as individual capability or city-level hiring demand.

We aim to reduce planning friction and improve understanding of career choices. The learner-pilot percentages in our proposal are evaluation targets, not measured learning or employment outcomes.

## Domain 1 feature alignment

The supplied Domain 1 brief, PDF page 5, lists six required final-product features. For the preliminary round it asks the proposal to explain all six and the demonstration to show the most important working feature.

| Domain 1 feature | Our implementation |
|---|---|
| Skills profile intake | Editable skills, experience, weekly time and budget, with synthetic samples and local PDF/DOCX/TXT resume extraction. Learners review detected mentions before applying them. |
| Updatable AI-trend signal layer | Refreshable arXiv metadata with source URLs and dates, alongside dated public context. An explicit experiment converts title-topic mentions into bounded matching weights. |
| Explainable future-role matching | Six O*NET-referenced occupations, ranked skill coverage, individual score contributions and clear gaps. Optional E5 retrieval supplies a separate semantic perspective. |
| Personalised reskilling pathway | Prerequisites before dependent activities, estimated practice hours, weekly sequencing, free-first resources, progress tracking and plan export. |
| Role and skill SDG mapping | Every role and required skill has an explained SDG connection; SDG World presents target-level pathways across all 17 goals. |
| Handling uncertainty | Supported and accelerated adoption scenarios expose hypothetical coefficients and illustrative ranges instead of presenting a single certain prediction. |

Our research refresh and matching-sensitivity tests show that changed evidence can change effective weights and coverage scores. Research attention is not a calibrated forecast of emerging or declining Malaysian jobs. That distinction is central to our method.

## Working proof and evaluation scope

Our validation record includes **55 application tests, 18 offline worker tests, TypeScript checks and a production build**. Our published Replit gateway completed an uncached E5 CUDA request returning all six trusted roles and six dated research-title matches. We also retain direct E5 and Qwen profile-stage CUDA receipts. The [execution record](RUNPOD_EXECUTION.md) distinguishes those checks and their inputs; they do not establish model quality or measured user outcomes.

Our hardest research risk is whether a small, query-biased set of research titles helps identify useful future skill priorities in Malaysia. We use transparent bounded weighting and a local matching fallback. Our evaluation plan calls for occupational evidence and career-adviser review before treating the experiment as a validated forecast.

The brief's preliminary rubric is **Innovation & Creativity 30%, Problem-Solution Fit 25%, Feasibility 25%, and Clarity 20%** (PDF pages 7–8). Those pages emphasise a rough working version of the central feature, usually trend signals feeding matching, backed by GitHub. Atlas Quest, badges, profile sculptures and the Malaysia discovery layer support that core journey as additional features.

## Sources, tools and licences

We use public, open or synthetic product data and fictional demonstration profiles. Recommendations reference the trusted occupation, learning and SDG catalogues. We keep human judgement central and present skill coverage separately from employment probability.

- [Data provenance](DATA_PROVENANCE.md) and [source register](SOURCE_REGISTER.md): sources, dates, hashes and geographical resolution.
- [Technical declaration](TECHNICAL_DECLARATION.md): AI assistance, runtime models, public datasets, assets and sponsor services.
- [Verification record](VERIFICATION.md): automated checks, actual execution records and the scope of observations.
- [Apache License 2.0](../LICENSE), [NOTICE](../NOTICE) and [third-party notices](../THIRD_PARTY_NOTICES.md): original code terms and retained upstream obligations.

We use AI to support career exploration and learning choices. SHIFTATLAS makes no final hiring decision and does not invent vacancies, courses or statistics to fill gaps in the evidence.
