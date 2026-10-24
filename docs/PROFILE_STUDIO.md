# 3D profile and resume studio

Implementation notes dated **25 October 2026, Asia/Kuala_Lumpur**. This document describes the current source. The acceptance checklist below is not a record of completed browser tests; see `VERIFICATION.md` for executed checks.

## Open the feature

Open `/atlas/?module=skills`. The skill world contains the profile sculpture, and the **A sample resume, brought to life** section contains the interactive document studio and resume intake controls.

Use fictional profiles and synthetic resumes only. The competition demo does not permit real personal data or real CVs.

## Profile sculpture

`src/components/ProfileSculpture.tsx` adds a procedural React Three Fiber/Three.js avatar to the centre of the skill constellation. It has a faceted head, capsule body and arms, a pedestal and ten coloured skill bars. The bars use the existing profile's self-assessed levels. Their height is `0.12 + level × 0.1` scene units, so even a zero level has a small visible base. The avatar itself does not encode a score or inferred personal characteristic.

The bars rotate slowly when the scene's ambient motion is enabled. The existing scene visibility, pause and reduced-motion controls govern that rotation. Clicking a bar selects its skill and passes the actual world-space click point to the existing camera and layer inspector. The outer labelled constellation nodes and the self-assessment controls remain alternative ways to inspect the same skills.

The sculpture does not infer identity, demographics, personality, proficiency or employability from appearance or uploaded text.

## Interactive document studio

`src/components/ResumeStudio.tsx` renders a CSS 3D stack of HTML cards. This is a layered document visualization, rather than an additional WebGL canvas or a 3D reconstruction of an uploaded document's page layout.

The **3D profile** view shows the selected synthetic profile, weekly learning capacity, content budget and self-assessed skill levels. **3D resume** shows the current review-selection count, local extraction status and whether supported skill mentions were found. The skill selector beside the stack covers all ten supported dimensions; the small passport preview contains six of them.

The three selectable layers are:

- **Passport:** the profile or resume summary and selectable skill previews.
- **Evidence:** the detected-dimension count and a preview of up to four detected skill names. Full excerpts and review checkboxes are below the studio.
- **Connections:** the number of self-assessed skills above zero and an illustrative bar display of all ten levels.

Use **Passport**, **Evidence** or **Connections** to bring a layer forward. **Rotate** cycles through four readable front-facing angles: −15°, 10°, 35° and −35°. **Separate layers** spreads the stack, and **Stack layers** collapses it. **Front view** restores the initial angle, Passport layer and stacked arrangement. The rear faces are hidden. Covered Passport controls are made inert when another layer is brought forward.

Selecting a skill updates the adjacent detail card. Profile mode displays its self-assessed level. Resume mode displays the extracted excerpt, its current review-selection state, or a statement that no supported mention was found. A missing keyword is not proof that a person lacks a skill. Selection and layer controls use pressed states and visible keyboard-focus styling. CSS transitions are removed when the operating system requests reduced motion.

## Resume intake and review

`src/components/ResumeIntake.tsx` accepts a synthetic PDF, DOCX or TXT file, pasted fictional text, or **Load fictional sample** from `/data/synthetic-resume.txt`.

File parsing runs in the browser using the existing PDF.js and Mammoth integrations. Guards reject unsupported extensions, empty files and files over 5 MB. PDFs are limited to 30 pages; extracted text is limited to 100,000 characters and must contain at least 30 readable characters. Scanned PDFs need OCR elsewhere; this prototype does not provide OCR. The pasted-text analysis button requires 30 non-whitespace characters and the field is limited to 100,000 characters.

Analysis uses the local, deterministic keyword matcher in `src/lib/resume.ts`. It searches the existing catalogue terms and displays the first matching sentence or line for each supported dimension, with each excerpt capped at 280 characters. All found dimensions initially enter the review selection. Users can deselect inaccurate mentions before choosing **Use … reviewed mentions**. Accepted dimensions receive a minimum self-assessed level of 1; higher existing levels are preserved. Role matches and learning gaps then use the updated profile. Users should adjust their actual self-assessment with the level controls.

Keywords do not establish proficiency. Negation, context and skills outside the ten-dimension catalogue may be missed. The visualizations add no new AI inference, model call, credential verification or external resume-analysis API.

Starting a new file or sample clears the previous evidence and review selection. Editing extracted text invalidates the previous analysis. **Clear resume** clears the document text, filename, evidence and selection held by this component; it does not undo previously accepted profile levels. Request counters prevent a stale asynchronous file/sample result from repopulating a cleared or unmounted intake.

## Data handling and dependencies

The selected file, filename and extracted text remain in the active intake component's memory and are discarded when leaving this module. They are not sent to an upload server or AI service. Loading the bundled fictional sample makes a same-origin request for that public sample. Accepted skill levels become part of the existing browser-local demo profile; use the existing reset controls to reset them.

This addition uses React, React Three Fiber, Three.js, Lucide icons and CSS already present in the app. Existing PDF.js and Mammoth packages perform document extraction. It introduces no external API, new runtime AI service or additional personal-data store. See `RESUME_AND_DATA.md`, `TECHNICAL_DECLARATION.md` and `DATA_PROVENANCE.md` for the broader project's declarations.

## Manual acceptance checklist

Record the browser, device, date and actual outcome when running these checks. Source inspection alone does not complete them.

- [ ] Open the skills route and check the avatar, orbiting bars, labels and studio at desktop and narrow/mobile widths; check for clipped controls and overlapping text.
- [ ] Change a self-assessed level and confirm the constellation, avatar bars, passport value and Connections display update consistently.
- [ ] Click an avatar bar and confirm the camera focuses its clicked position and the inspector describes the correct skill; return with Full scene or Escape.
- [ ] Pause scene motion and enable operating-system reduced motion; confirm the intended scene and document motions stop or become immediate.
- [ ] Switch between 3D profile and 3D resume, select all ten skill dimensions, and inspect their detail cards.
- [ ] Cycle Rotate repeatedly, separate/stack the cards, bring each layer forward and use Front view. Confirm readable orientation, visible content and usable controls.
- [ ] Navigate studio controls by keyboard; confirm visible focus, correct pressed states and no focus on a covered Passport layer.
- [ ] Load the bundled fictional sample. Confirm the displayed excerpts and mention count; deselect a mention and check the studio selection count before applying it.
- [ ] Apply reviewed mentions and confirm only selected dimensions below level 1 rise to 1; higher existing levels remain unchanged and matches update.
- [ ] Edit extracted text and confirm old evidence is removed until analysis runs again. Test text with no supported terms and inspect the missing-mention explanation.
- [ ] Test synthetic TXT, DOCX and text-based PDF files, plus unsupported, empty, oversized and scanned-PDF cases. Check the displayed error and recovery path.
- [ ] Clear while loading, start a second document and leave/reopen the module. Confirm stale text/evidence does not return and previously accepted levels have the documented persistence behaviour.
- [ ] Inspect browser requests during analysis and confirm no selected file or extracted text leaves the browser.
