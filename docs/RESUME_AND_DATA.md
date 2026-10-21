# Resume intake, refreshed data and interaction handoff

Updated 20 October 2026 (Malaysia). Run `npm install`, `npm run build`, then `npm start`. Set `PORT=3107` to use the established demo URL. The build/dev pre-hook copies the installed PDF.js worker to the same-origin `/workers/pdf.worker.min.mjs`; do not use a mismatched CDN worker.

## Try the workflow

1. Open **Skill constellation**. Download the supplied fictional resume or choose a PDF, DOCX or TXT file. Dropping a file and pasting text are also supported.
2. Review extracted text and correct extraction errors. Analyse again after edits.
3. Inspect the original sentence beside each detected skill. Uncheck misleading mentions, including negated skills. Accepting a mention sets its level to at least 1 and preserves existing higher self-assessments. Existing sample skills are not cleared automatically.
4. Set your actual levels with the sliders, then open **Career Bridges**. Matching coverage, gaps, Learning Islands and the skill constellation update from the reviewed profile.
5. Use **Clear resume** to discard the file name, text and analysis. Use the profile reset separately to remove accepted levels.

## Method and privacy

PDF.js extracts text from text-based PDFs. Mammoth's browser bundle extracts raw text from DOCX; it does not insert converted document HTML. TXT is read directly. All three run in the browser. No document is posted to a server or an AI provider, and no document text or file name is written to localStorage. Text exists in component memory until cleared or the module is left. An asynchronous request token prevents an old or cancelled read from restoring cleared results. Accepted numeric skill levels are saved with the existing local profile; they remain until reset. The user-written narrative field is a separate locally persisted field.

Analysis uses the ten explicit skill vocabularies in `src/lib/catalogue.ts`, matches word boundaries, deduplicates skill dimensions and displays the first matching sentence (up to 280 characters). No proficiency, experience duration, identity, education equivalence, personality or employment probability is inferred. Mentions may be negated or ambiguous and synonyms outside the vocabulary are missed. User confirmation is mandatory. This is deterministic assistance, not a semantic LLM resume assessment or an ATS score.

Limits: 5 MB input, 30 PDF pages, 100,000 extracted characters. Scanned PDFs require OCR elsewhere; encrypted, malformed or unsupported documents show an error and the paste-text fallback. Only PDF, DOCX and TXT are accepted. No legacy DOC support. Input size limits do not guarantee bounded decompressed DOCX memory. Large or complex files may be slow; production deployment should consider worker isolation and decompression limits. Built-in demo people and fixtures are entirely fictional.

## Real datasets and provenance

| Source | Retrieved data | Use / limits |
|---|---|---|
| [DOSM quarterly state labour](https://open.dosm.gov.my/data-catalogue/lfs_qtr_state) | Full [official CSV](https://storage.dosm.gov.my/labour/lfs_qtr_state.csv), refreshed in this revision; latest available complete quarter: **2026 Q2**, 16 states/FTs | CC BY 4.0. Rates are percentages; employment and labour force are thousands of persons. State aggregates only. The raw CSV is downloadable at `/data/lfs_qtr_state.csv`, and its SHA-256 matches `/data/labour.json`. |
| [DOSM state boundaries](https://github.com/dosm-malaysia/data-open/blob/main/datasets/geodata/administrative_1_state.geojson) | Existing official GeoJSON retained | Joins by state name. Geographic boundary geometry is real; height is a visual encoding of unemployment, not terrain or building height. |
| [arXiv API](https://info.arxiv.org/help/api/index.html) | Refreshed six title/author/publication-date/link records for the configured AI/labour query | Preprint metadata, not validated findings. Exact query, retrieval UTC timestamp and response SHA-256 are in `/data/research.json`. Optional title-topic weighting is experimental and does not establish labour demand. |

Retrieval timestamps are recorded in UTC; a local 20 October retrieval can appear as 19 October UTC. The source UI uses UTC dates. Refresh with `npm run refresh:labour` and `npm run refresh:research`, inspect differences, then rebuild. Fetch/validation failures retain the previous validated snapshot. The labour script validates every source row and chooses the latest complete eligible quarter with all 16 states. A raw-CSV hash test detects any mismatch between downloadable bytes and the derived snapshot.

O*NET occupational pages, TalentCorp and ILO reports remain cited reference material. The six-role rubric, ten-skill crosswalk, numeric weights, SDG mappings and scenario coefficients are **project-authored**; they are not downloaded official predictive datasets. No live vacancies, salaries or city-level skill-demand statistics are invented. ESCO is not integrated. Real labour statistics contextualise the map and do not alter role ranking.

## Smoother interaction

The object inspector overlays the scene, avoiding a sudden canvas resize on selection. Camera position, orbit target and orthographic zoom follow a 950 ms quintic ease-in/out from their current values, including when a new selection interrupts travel. Layer lifts use damped movement. Pointer orbit interrupts automatic travel. Module changes use native View Transitions where supported, with CSS entry fallback. Reduced-motion users get immediate camera positioning and disabled transition animations. Motion does not change any analytical value.

## Verification and remaining acceptance

Automated tests cover file type/size guards, exact evidence text, word-boundary false positives, local text parsing, real zipped DOCX parsing, empty-text handling, and the raw DOSM fingerprint. Type checking and the production export validate parser bundling. PDF worker serving must use JavaScript MIME (`.mjs`); the included server does so. Browser-controlled PDF extraction, camera feel, file picker, drag/drop, rapid clicks and mobile layout still need manual acceptance because browser automation is disabled in this environment.

Dependency audit found a moderate `sprintf-js` advisory through Mammoth's CLI dependency chain (`argparse`). The implementation imports `mammoth/mammoth.browser`, not its CLI, and does not supply format strings. No patched compatible upstream chain was offered by npm at verification; do not blindly apply its suggested downgrade to Mammoth 0.3.29. Track GHSA-hp3w-g68c-fv3c before broader deployment.

Parser documentation: [PDF.js](https://mozilla.github.io/pdf.js/examples/) (Apache-2.0), [Mammoth](https://github.com/mwilliamson/mammoth.js) (BSD-2-Clause). Installed versions: PDF.js 6.4.299; Mammoth 1.13.0. Exact dependencies are locked in `package-lock.json`.
