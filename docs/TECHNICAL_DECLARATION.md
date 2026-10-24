# Technical and AI-use declaration

Prepared 20 October 2026; revised 25 October 2026, Asia/Kuala_Lumpur, for the registered team’s technical declaration. Signed participant declarations are maintained separately.

## Development assistance

We used OpenAI Codex in Work extensively for implementation, research, data-processing scripts, tests and documentation. A completed bounded data-research helper was configured as GPT-6 Astra with High reasoning. Main Codex session model version: not recorded. We selected the project concept and scope. Code, prose, rubric choices and visual geometry in this handoff were substantially AI-assisted.

We retain responsibility for reviewing the work, making substantive contributions and meeting the organiser’s AI/originality requirements. The public handbook discusses team understanding and substantive original input in section 8.5. [Official handbook](https://sdchack.my/legal/handbook-2026-08-17.pdf).

Tools used: Codex file/shell tools, web research, Node.js/npm, TypeScript, Node test runner via tsx, the Sites workflow for packaging/hosting, and PDF text extraction for the supplied brief. Validation methods are recorded in VERIFICATION.md. The application uses an original app icon generated with OpenAI’s built-in image-generation tool and17 unchanged official UN SDG images. The presentation adds generated low-poly concept illustrations and the official SELADEVS logo. See VISUAL_ASSETS.md for the generation prompt, source URLs and image hashes. No downloaded 3D model or Blender asset was used. The submission video combines actual prototype captures and slides with disclosed Windows synthetic speech; it is an edited walkthrough, not continuous interaction recording.

## Runtime AI and computation

The original core runs locally: user-confirmed keyword mentions, TF-IDF retrieval over six authored role descriptions, a deterministic weighted coverage rubric, optional research-topic weighting capped at 25%, prerequisite learning plans and explicitly hypothetical scenarios. None is a validated employability or labour-demand predictor.

Two separately requested cloud features are now implemented:

| Feature | Model and licence | Execution boundary |
|---|---|---|
| Cloud Semantic Lab | `intfloat/multilingual-e5-base`, MIT, revision `d128750597153bb5987e10b1c3493a34e5a4502a` | Normalised embeddings and raw cosine similarity for trusted role text/public paper titles. Similarity is separate from proficiency and coverage. |
| Career Council | `Qwen/Qwen3-4B-Instruct-2507`, Apache-2.0, revision `cdbee75f17c01a7cc42f958dc650907174af0554` | One model, four separate generation passes: profile, role exploration, learning and critic. Maximum 384 output tokens/pass. The critic is not an independent expert or correctness guarantee. |

Replit's Node gateway owns the source-linked catalogue, keeps credentials server-side, validates requests/receipts and orchestrates the four Council jobs. Generated output must use known identifiers and exact profile quotations. The server restores course prerequisites. Invalid or incomplete output is rejected without fabricated replacement. Human review is still needed: a valid citation ID does not establish that every generated statement follows from its source.

Worker images bake pinned public model snapshots for offline loading with safetensors and remote code disabled. The E5 image was built and uploaded, and a direct synthetic request completed on CUDA on 25 October 2026: 3.452 seconds provider execution and 11.626 seconds queue delay. The [execution record](RUNPOD_EXECUTION.md) includes the exact model revision, receipt and scope. This small fixture does not establish model quality or full application integration. The Qwen image and execution remain unverified. Tests separately inject generators/provider responses. Model weights are not redistributed in the source package. The Replit import is recorded; final publication and gateway integration require separate verification. Deployment budget is SDC sponsor credit only, with no extra charges.

The optional cloud path sends only explicitly confirmed fictional text and the public catalogue. Resume files and saved self-assessed levels are not automatically transmitted. Provider processing/retention policies apply. No private training dataset, fine-tuning or real-person CV processing was performed.

Sources: [E5 model](https://huggingface.co/intfloat/multilingual-e5-base), [Qwen model](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507), [RunPod handlers](https://docs.runpod.io/serverless/workers/handler-functions), [Replit Secrets](https://docs.replit.com/core-concepts/project-editor/app-setup/secrets). See CLOUD_INTEGRATION.md for controls and limits.

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

DM Sans and Manrope are requested through Google Fonts with system fallbacks; fonts are not bundled. Third-party links and data do not imply endorsement or partnership. Original project code and documentation use Apache License2.0. LICENSE, NOTICE and THIRD_PARTY_NOTICES.md preserve the separate upstream and asset terms.

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

## Participant responsibility

We record our source review, contributions, workshop attendance and technical understanding in the official declaration. Our model, tool, dataset and licence disclosures accompany the implementation. The leader signs only after our final review.

## Resume intake revision

Resume parsing is optional and local to the browser. PDF/DOCX/TXT extraction feeds user-reviewed keyword mentions, not a model assessment. Document text is not persisted or transmitted; accepted numeric skill levels join local profile storage. See [resume and data handoff](RESUME_AND_DATA.md) for limits, dependencies, audit findings and verification. The full official DOSM source CSV is now included as a downloadable dataset with a matching SHA-256 test.

## Malaysia discovery revision

Added MQA public/private university directory facts and Wikidata CC0 coordinates. All low-poly landmark models, wind turbines, solar panels and medals are original code-generated illustrative geometry. They are not downloaded architectural models. Institution coordinates are not proof of accreditation or a complete campus inventory. See [Malaysia discovery](MALAYSIA_DISCOVERY.md) for exact coverage, attribution, hashes and source limitations. Badges are demo milestones, not credentials.

## Profile studio and Atlas Quest revision

Added an original procedural profile avatar, a CSS 3D resume/passport stack and the Atlas Quest low-poly exploration game. Geometry, challenge wording, UI and code were assisted by Codex. The game itself adds no downloaded game models or new game engine. The separately declared E5/Qwen integrations were added in the subsequent cloud revision. The question bank paraphrases existing prototype methods and points to OpenDOSM, ILO and UN references where relevant. Correct concept checks award local demo XP and badges only; they do not certify proficiency or modify career scores. Quest progress, cosmetic choices and visited worlds are stored in the browser and are reset separately from the skill profile. See ATLAS_QUEST.md and PROFILE_STUDIO.md.

## Cloud worker dependencies and review

The optional Python images pin PyTorch 2.7.1 (official CUDA base digest), RunPod SDK1.12.0, sentence-transformers5.1.1, Transformers4.57.1, Hugging Face Hub0.35.3, Tokenizers0.22.1, Safetensors0.6.2 and NumPy2.2.6. These direct pins are not a full transitive lock. The E5 build log confirms dependency checks and image upload; retain its generated `python-freeze.txt`, model manifest and registry digest. The corresponding Council build requires separate verification. Upstream licences and model cards remain authoritative. No API key, model weight or personal resume belongs in Git or proof screenshots.
