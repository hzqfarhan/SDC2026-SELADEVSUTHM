# Technical and AI-use declaration

Prepared 20 October 2026 for team review. This is an accurate development disclosure, **not a signed declaration that the team has completed its own review**.

## Development assistance

OpenAI Codex in Work was used extensively for implementation, research, data-processing scripts, tests and documentation. A completed bounded data-research helper was configured as GPT-6 Astra with High reasoning. The main session's exact selectable model/version was not exposed through an available model-setting action; no claim is made that the whole session was switched to Astra. The original concept and requested scope came from the user's referenced conversation and current instructions. Code, prose, rubric choices and visual geometry in this handoff were substantially AI-assisted.

Do not represent this package as wholly hand-written by the team. Registered participants must understand, review and meaningfully adapt it, document their actual contributions, and comply with the organiser's AI/originality rules. The public handbook discusses team understanding and substantive original input in section 8.5. [Official handbook](https://sdchack.my/legal/handbook-2026-08-17.pdf).

Tools used: Codex file/shell tools, web research, Node.js/npm, TypeScript, Node test runner via tsx, the Sites workflow for packaging/hosting, and PDF text extraction for the supplied brief. Browser preview was attempted but automated browser control was disabled; no visual QA result is claimed. The refined version adds an original app icon generated with OpenAI’s built-in image-generation tool and 17 unchanged official UN SDG images. See VISUAL_ASSETS.md for the generation prompt, source URLs and image hashes. No downloaded 3D model, Blender asset or video asset was used.

## Runtime AI and computation

- No language model API, trained neural network, model weights or generative model runs in the app.
- Skill mentions use explicit local keyword rules with user confirmation.
- Narrative-to-role retrieval uses locally computed TF-IDF and cosine similarity over six authored descriptions.
- Matching is a deterministic weighted coverage rubric. Optional research-title topic counts adjust existing weights by at most 25%.
- Future scenarios use disclosed, hypothetical coefficients. They are not learned occupational forecasts.

This is a classical retrieval and rule-based decision-support MVP. It must not be described as a validated predictive AI model or an LLM-powered career adviser. No private training data was used. Every person and self-assessed level in the sample set is synthetic.

## Software inventory

Versions below are from the installed lockfile at verification. `package-lock.json` is the reproducible dependency record; transitive packages retain their own licences.

| Component | Version | Declared package licence | Use |
|---|---|---|---|
| Next.js | 16.4.2 | MIT | Static React application |
| React / React DOM | 19.3.1 | MIT | Interface and state |
| Three.js | 0.180.0 | MIT | 3D geometry/rendering |
| React Three Fiber | 9.8.2 | MIT | React renderer for Three |
| Drei | 10.7.9 | MIT | Orbit controls and HTML labels |
| Lucide React | 0.468.0 | ISC | Interface icons |
| TypeScript | 5.9.3 | Apache-2.0 | Static checks |
| PDF.js | 6.4.299 | Apache-2.0 | Browser PDF text extraction |
| Mammoth | 1.13.0 | BSD-2-Clause | Browser DOCX raw-text extraction |
| tsx | 4.23.15 | MIT | Test and TypeScript script execution |

DM Sans and Manrope are requested through Google Fonts with system fallbacks; fonts are not bundled. Third-party links and data do not imply endorsement or partnership. No project-wide open-source licence is assigned on the team's behalf; decide that before public redistribution, while preserving third-party notices.

## Data and assets

| Source | Use and limits |
|---|---|
| OpenDOSM quarterly state labour CSV | Public official statistics, 2026 Q2 snapshot, CC BY 4.0 attribution; source/hash/date in data provenance. |
| DOSM data-open state boundaries | Original public GeoJSON retained; source repository attribution and boundary hash recorded. |
| TalentCorp | Linked national workforce transition study release; no local vacancy or city-level figures inferred. |
| O*NET OnLine | Linked occupation references. No O*NET score database or model is copied; numeric targets/weights are authored. US-to-Malaysia transferability unvalidated. ESCO is not integrated in this version. |
| ILO / NASK / World Bank | Linked research context, paraphrased conservatively; no report figures fitted into the scenario coefficients. |
| arXiv API | Public paper metadata, with authors, dates, original URLs and raw response hash. No paper full text redistributed. Preprints unreviewed. |
| Microsoft, SQLBolt, Python, IBM, Google, W3C, UN | Links to learning/reference material; no provider course content copied. Activity names and estimated practice time are authored. |
| UN SDGs | Linked target references and authored contribution pathways; no measured impact or UN endorsement claimed. |

See [data provenance](DATA_PROVENANCE.md) and [source register](SOURCE_REGISTER.md) for exact links. “Authenticated public data” here means verified against the named publisher's official public endpoint; these endpoints require no login or API credentials.

## Participant review record — complete before submission

| Required team action | Actual reviewer/date/evidence |
|---|---|
| Explain and review matching, TF-IDF and research weighting | Pending team review |
| Review resource relevance, accessibility and all source claims | Pending team review |
| Explain geography, SDG mappings and scenario limitations | Pending team review |
| Make and record substantive team design/implementation contributions | Pending team review |
| Confirm participant handbook, originality and submission rules | Pending team review |
| Rehearse live demo and record actual individual contributions | Pending team review |

Do not replace pending entries with invented names, dates, signatures or claims of approval.

## Resume intake revision

Resume parsing is optional and local to the browser. PDF/DOCX/TXT extraction feeds user-reviewed keyword mentions, not a model assessment. Document text is not persisted or transmitted; accepted numeric skill levels join local profile storage. See [resume and data handoff](RESUME_AND_DATA.md) for limits, dependencies, audit findings and verification. The full official DOSM source CSV is now included as a downloadable dataset with a matching SHA-256 test.

## Malaysia discovery revision

Added MQA public/private university directory facts and Wikidata CC0 coordinates. All low-poly landmark models, wind turbines, solar panels and medals are original code-generated illustrative geometry. They are not downloaded architectural models. Institution coordinates are not proof of accreditation or a complete campus inventory. See [Malaysia discovery](MALAYSIA_DISCOVERY.md) for exact coverage, attribution, hashes and source limitations. Badges are demo milestones, not credentials.
