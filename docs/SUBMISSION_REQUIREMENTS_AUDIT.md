# Submission requirements audit

Reviewed **25 October 2026, Asia/Kuala_Lumpur**. This audit records requirements in the supplied documents; it does **not** certify team eligibility, attendance, originality, sponsor-platform use, repository access, licence ownership, video upload or successful submission.

## Sources and page convention

All 35 PDF pages of the **Official Handbook** (OH) and all 43 PDF pages of the **Participant Handbook** (PH) were read from the extracted text. Submission and Technical Tools Declaration template text was also checked for format and word limits. The timeline, sponsor/tool requirements, submission rules, originality guidance and workshop checklist were checked against their rendered pages. Page references below are **PDF page numbers**, counting the cover as page 1; printed page numbers differ.

The original files are in `C:/Users/haziq/Desktop/MUMHACKFINALSPEEDRUN`:

| Reference | Supplied file | Pages |
| --- | --- | ---: |
| OH | `1. SDC Hackathon Official Handbook` | 35 |
| PH | `3. SDC Hackathon Official Participant Handbook` | 43 |
| Proposal | `1. SDC Hackathon_ Submission Template_` | 14 |
| Declaration | `2. SDC Hackathon_ Technical Tools Declaration Template` | 16 |

The originals are PDFs despite three filenames having no extension. Extraction, rendered pages and source hashes are recorded in the workspace's `work/submission-review/manifest.json`. This audit is separate from the Domain 1 feature/rubric review.

## Deadlines and submission channel

| Milestone | Exact supplied requirement | Reference |
| --- | --- | --- |
| Preliminary period | 19 October 2026, 20:00:00 MYT to **25 October 2026, 07:59:59 AM MYT (UTC+8)** | PH p10, §6.3.1; p23 rundown |
| Preliminary submission | Six required deliverables by that deadline; late work may not be accepted | PH pp11–13; p23 |
| Changes after preliminary deadline | No modification or resubmission unless the organising committee instructs otherwise | PH p13, paragraph misnumbered §6.3.2; p39, §15.9 |
| Finalists announced | 28 October 2026, 20:00:00 MYT | PH p14, §6.4.4; p23 |
| Finalist confirmation | Announcement through 29 October, 12:00 PM MYT; replacement teams until 29 October, 20:00 MYT | PH p14, §§6.4.4–6.4.7 |
| Upgrading round | 28–30 October 2026, only for shortlisted finalists | PH p15, §§6.5.1–6.5.2 |
| Physical hackathon | 31 October 2026, 09:30:00 AM MYT | PH p15, §6.6.1 |
| Final submission | **1 November 2026, 07:59:59 AM MYT (UTC+8)** | PH p16, §6.6.3 |
| Submission platform | Official SDC website, `sdchack.my` | PH p19, §6.6.6; p29, §10.1 |

The preliminary deadline is in the **morning**, not 19:59 or the end of 25 October. The proposal cover gives the date only; the Participant Handbook supplies the precise time. This audit does not establish an extension. Changes or outage contingencies must come from the official committee/Discord announcements, not an assumed grace period (OH p19, §8.3.1; PH p22, §6.8.4).

## Mandatory preliminary artifacts

PH pp11–13, §§6.3.5.1–6.3.5.6, and the table on PH p23 require all six:

1. **Product Requirement Documentation**, completed using the official Submission Template. It must explain the addressed problem, assigned SDG alignment, beneficiaries, scope/boundaries and key features.
2. **Pitch Deck Slides**, covering problem, solution, technical approach and expected impact, aligned with the video's narrative.
3. **Live/Functional Prototype Access**, as a deployed link or accessible demo build. A recording or static mockup alone does not meet this requirement; judges must interact with or directly observe the actual product.
4. **Technical & Tools Declaration**, listing major APIs, cloud services, AI tools/LLMs, datasets, models, sponsor resources and pre-existing materials. Sponsor-use proof requirements apply in addition to the supplied template's fields.
5. **GitHub Repository / Source Code Link**, with realistic continuous history and judge/committee access. Section 10 adds the public-repository and Apache 2.0 requirements below.
6. **Pitching Video with Prototype Demonstration**, **5–7 minutes**, submitted as a **YouTube link**. The stated overrun penalty is one point per 30 seconds exceeded, subject to final judging rules (PH p13, §6.3.5.6).

The Official Handbook also requires a working technical prototype, presentation/pitch and functional UI; none substitutes for another (OH p17, §7.4.3). The Participant Handbook specifies the preliminary recording as the pitch artifact.

### Document formats and exact word limits

| Artifact / field | Requirement | Reference |
| --- | --- | --- |
| Proposal | Complete every field; one PDF named `SDC2026_TeamName_Preliminary.pdf` | Proposal p1 |
| Problem context, §2.1 | Maximum **250 words** | Proposal p3 |
| Proposed AI solution, §2.2 | Maximum **300 words** | Proposal p4 |
| Design-thinking/deployment, §3.2 | Maximum **200 words** | Proposal p6 |
| Impact framework | Exact SDG sub-target(s), numeric current baseline, measurable KPI and realistic percentage-based Phase 2 target; cite sources and identify estimates/benchmarks honestly | Proposal pp7–9 |
| Technical declaration | Complete every section; use No/None for inapplicable categories; one PDF named `SDC2026_TeamName_TechDeclaration.pdf` | Declaration p1 |
| Architecture overview, §2.1 | Maximum **200 words** | Declaration p3 |
| Team review of AI output | Maximum **100 words** | Declaration p10 |
| Sponsor resource essential/replacable explanation | Maximum **100 words** | Declaration p12 |
| Data handling/privacy, §6.1 | Maximum **150 words** | Declaration p13 |
| Known limitations/risks, §6.2 | Maximum **150 words** | Declaration p14 |

Both templates require the team leader's declaration, signature and date (Proposal p14; Declaration p16). They contain team/contact, university and project fields that must be supplied by the actual team. Do not invent or sign those details. Checklists must reflect verified facts.

**Not specified in these four documents:** a maximum PDF page count, file-size limit, preliminary deck file format, maximum slide count, required video title or YouTube privacy setting. Fourteen and sixteen are the supplied templates' page counts, not stated maximum lengths. The final deck format is explicitly `.pptx`, but that is not evidence of a preliminary-format rule. Check the current submission portal, official domain folder and Discord for additional constraints. Any suggested deck length, video title or public/unlisted setting is a preparation choice unless separately verified as a rule. A private or otherwise inaccessible video would conflict with the general requirement that submitted links be judge-accessible (PH p40, §15.11).

## Replit, RunPod and repository requirements

### Replit is mandatory

The rendered PH p28 **§9.3** says every team must use Replit as part of its solution, while allowing other tools/frameworks/services alongside it. PH p29 **§10.6** requires proof in the Technical & Tools Declaration before submission. Any one of the following is listed:

- A live Replit deployment URL.
- A Replit project link giving access to project history.
- The document's exact wording, **“Replit credit finished.”** The wording does not define a screenshot format or minimum spend; obtain organiser clarification if relying on this option.

The proof must show the **team's own account and project**. A local build, generated deployment instructions, placeholder Replit URL or a claim that code can run on Replit is not evidence that Replit was used. This audit does not establish actual Replit use.

### RunPod is conditional on GPU work

Rendered PH p28 **§9.4** requires RunPod for work that needs a GPU, explicitly including model training, fine-tuning and GPU-requiring inference. Other services may be used for work that does not require a GPU. Each team is allocated US$25 preliminary credit; each participant receives Replit Core (PH p28, §§9.1.1–9.1.2). Resource access is through the official portal within 24 hours before the preliminary round (§9.2).

Teams that **used RunPod** must include an own-account dashboard screenshot in the declaration showing **Pod ID, GPU type and runtime**; for Serverless, show the endpoint URL instead of Pod ID (PH p29, §10.7). Do not fabricate a dashboard, account, runtime or usage history. Do not claim RunPod is universally mandatory independent of GPU work. Conversely, do not certify exemption without reviewing the team's actual work. The handbook does not expressly discuss client-device WebGL graphics; if this is disputed, seek an organiser interpretation rather than presenting an invented exception.

**Numbering discrepancy:** extracted text order and the PH p43 FAQ cite older §9.2/§9.3 numbers for Replit/RunPod. The visible p28 headings are §9.3/§9.4. The requirements themselves are consistent.

### GitHub and Apache 2.0

- Submit a valid, complete, organised **GitHub repository** link (PH p29, §§10.2–10.5).
- The submitted repository must be **public and remain accessible throughout judging** (§10.3). Earlier instructions say private **during hacking**, with committee accounts added before the deadline (PH p9, §§6.1.2–6.1.4; p13, §6.3.5.5). These can be satisfied sequentially: private development, then public submission, while retaining the required committee access. A private judge-invited repository alone does not satisfy the later explicit public-submission rule.
- Add the committee's **designated GitHub account(s)** as collaborators before the deadline; the account names are not supplied here and must not be guessed (PH p13, §6.3.5.5).
- Include an **Apache License 2.0 `LICENSE` file** and preserve applicable copyright (PH p29, §10.2). Retain third-party licence/attribution obligations; the handbook does not grant permission to relicense third-party datasets, icons, libraries or other assets.
- Maintain realistic, continuous Git history. A near-complete project pushed as one large last-minute commit can trigger pre-built-work review and possible disqualification (PH p13, §6.3.5.5; stronger final-round wording on p17, §6.6.4.5). Do not rewrite, backdate or manufacture history to suggest work that did not occur.
- Do not expose API keys, passwords, private credentials or payment details (PH p10, §§6.1.6–6.1.7).

## Participant, workshop and originality conditions

| Condition | Source / interpretation boundary |
| --- | --- |
| Eligible student status | Students enrolled in recognised Malaysian higher-education institutions, including foundation, diploma and bachelor's programmes; enrolled throughout competition; one team per person | OH p7, §§4.1.1–4.1.5 |
| Team | 1–5 members; team leader required; no member changes after registration; unregistered people cannot contribute substantially to project, prototype, presentation, docs or submission | OH pp8–10, §§4.2.3–4.2.12 |
| Official communication | All team members must join Discord and check announcements; missing an announcement is not an accepted excuse | OH pp9,27; PH p38 |
| Reveal attendance | Required online announcement attendance and challenge review before starting | OH p30; PH p10, §6.2.2; p39 |
| Workshops | Proposal checklist says **all team members** completed mandatory **GenAI, Database and Cloud Deployment** upskilling workshops. It does not provide a waiver or evidence format | Proposal p10; solution field on p4 also asks about workshop skills |
| Time and pre-existing work | Build primarily during official hacking; pre-existing code/frameworks/models/templates/materials need declaration during registration and organiser approval | OH pp17,19, §§7.4.1,8.2.1 |
| AI assistance | Allowed with disclosure. AI output created in the hacking period in response to the team's prompts is handled under AI-use rules rather than pre-existing-work approval | OH p20, §§8.4,8.5.1 |
| Team authorship and understanding | Core problem framing, solution design and technical decisions must originate from the team. AI output must be reviewed/adapted, not used wholesale. Any member may be asked to explain substantial components | OH pp21–22, §§8.5.2–8.5.7; PH p11, §6.3.3 |
| AI originality risk | Substantially AI-generated work with minimal original input, understanding or modification can lead to deduction/disqualification. Disclosure alone does not establish originality compliance | OH pp21–22 |
| Required declarations | Major tools, APIs, cloud, AI, models, data, sponsor resources and pre-existing work; templates also ask about prior-owned work and employment/internship IP conflicts | OH p20; Proposal pp11–13; Declaration throughout |

The earlier concept selection and extensive AI-assisted implementation must be disclosed accurately. Actual team review, adaptation, independent reasoning and understanding cannot be established by an unsigned declaration. Do not claim workshop completion, approved prior work, team originality or absence of IP conflicts without the team's factual confirmation. These are eligibility facts, not code features.

Mentors may advise but cannot build, design, code, document or make final project decisions for a team (OH pp25–26; PH p33). This is distinct from the expressly permitted, declared AI-tool assistance.

## Final-round artifacts and presentation limits

Only shortlisted teams advance. PH pp16–18, §§6.6.4.1–6.6.4.7 require:

1. Updated PRD explaining what changed after preliminary submission and why, including feedback.
2. Updated Technical & Tools Declaration.
3. Final Solution Report covering final features, architecture, SDG impact and evolution.
4. Backup recorded pitch/demo as a YouTube link, for live technical failure.
5. GitHub/source link with history and access.
6. Final presentation slides in **`.pptx`**, tested to open/display.
7. Working final prototype link/build and necessary demo materials/accounts/test credentials.

Final live pitch is **10 minutes plus 5 minutes Q&A**; the stated overrun penalty is one point per 30 seconds (PH p20, §§6.7.3–6.7.4). Bring the team's own laptop and HDMI adapter as needed (PH p21). These documents do not state a duration limit for the final backup video or a final slide-count maximum.

**Unresolved final schedule conflict:** PH p20 §6.7.1 says pitching on 1 November **18:00–20:30**, but the p26 rundown shows parallel pitching **09:40–12:40** and **13:40–15:40**, followed by closing **16:00–18:30**. PH p20 gives pitching rooms A3#517/A3#516, while the p7 venue table gives A4#113/A5#119. Confirm assigned time and room through the committee; do not silently choose a version. The final submission deadline of 07:59:59 AM is separately explicit.

## Judging and sponsor-policy distinctions

The handbooks refer to official criteria but do not provide a full weighted rubric. PH p22 §6.8.3 gives a **tie-break priority**, not weights: Technical Execution, Problem–Solution Fit, Impact & Feasibility, Innovation & Creativity, Presentation & Pitch, Design & UX. Use the separately supplied Domain 1 brief for its actual round-specific rubric; do not turn the tie-break list into percentages.

Sponsor recognition and ORION membership are separate from the mandatory platform rules. PH p34 says sponsor marketing recognition can be declined via `xmumai@gmail.com`, without affecting participation, scoring, advancement or prizes. It does not imply employment, endorsement or a commercial relationship. PH pp35–36 describe automatic ORION membership and sharing registration contact/institution data, with opt-out at registration or by email and no judging/prize penalty for declining. These do not require SHIFTATLAS users to join, upload CVs to the sponsor or share profile data with ORION. Do not add such a product flow on this basis.

## Rule hierarchy and outstanding verification

Both handbooks say official **Terms and Conditions take precedence** in a conflict (OH p5; PH p5). OH p6 says the Participant Handbook governs event operations while the Official Handbook and Terms govern eligibility/conduct/policy. PH p6 retains Official Handbook rules. The separate Terms and Conditions are not among the five supplied originals in this review; a complete legal/rules compliance determination therefore remains open. Latest official Discord/portal updates must also be checked.

Before marking submission ready, the actual team must verify: current deadline/any official extension; registration and workshop facts; truthful originality and tool declarations; real Replit evidence; RunPod applicability/evidence if used; Apache 2.0 plus third-party licence handling; real accessible public GitHub and designated collaborator access; completed official PDFs with genuine team details/signatures; actual accessible 5–7 minute YouTube video; correct deck; functional judge-accessible build; and the portal's final submission receipt. None is certified merely by having local documentation or ZIP packages.
