# Cinematic selection and Malaysia discovery layer

Updated 20 October 2026. Open `/atlas/?module=malaysia` to explore.

## Interaction

Selecting a 3D object starts a 1.45-second orbital journey. The camera rotates about 28–43 degrees, varies elevation by object, and begins its zoom after the first 23% of the journey. The resulting angle stays zoomed in. Selecting the same 3D object again starts another small orbit. Camera motion starts from its current position, so a new selection can interrupt an existing flight. Dragging cancels automatic travel. Full scene and Escape return to an overview angle. Reduced motion and Pause use immediate positioning.

The inspector overlays a fixed-size canvas. The focused target is offset in screen space to keep it clear of the panel. Motion, zoom, model scale and decorative details never change the underlying matching or labour statistics.

New low-poly details include rotating wind turbines, solar panels and floating medals above completed Learning Islands. Exploration badges record session visits and user-marked learning completion; they are demo milestones, not qualifications, independently verified achievements or employment signals. World Explorer unlocks after four distinct modules; Evidence Seeker after opening Sources & Methods; Learning in Motion after marking a learning step complete.

## Landmarks

Five original code-built miniatures are included: Petronas Towers, Kuala Lumpur Tower, Merdeka 118, Kek Lok Si and Mount Kinabalu. They use published Wikidata coordinates. Shapes are illustrative, enlarged and not accurate architectural or terrain models. The three close Kuala Lumpur landmarks are spread into a display fan with leader lines joining their original coordinate anchors; their source coordinates remain unchanged. Other models remain directly above their published positions. Vertical positioning is decorative and does not represent elevation.

Every pin supports source-linked inspection. A blue university pin can be hovered to reveal its name; select it to orbit and zoom. Search **Map locations** to reach overlapping pins, and use layer controls to hide landmarks, universities or show all labels. Smart university labels use projected screen-space layout: at most eight cards are displayed, with selected and previewed places taking priority. Colliding cards are omitted, and connector lines retain the exact anchor. Landmark labels are included by default. Search remains available for every record.

## University coverage — avoid an “all campuses verified” claim

The bundled snapshot contains **170 distinct name/state entries** from the MQA public-university and private-university directories, including branch campuses and foreign branches. All 74 raw public-directory rows and all 101 private-directory rows were fetched; duplicate current-name/state entries were merged while retaining their source links. This is not a count of 170 independent universities. The separate university-college and college directories are excluded. MQR is an accredited-programme register and does not guarantee a complete list of currently operating institutions.

The geographic layer independently contains **84 Wikidata institution records** with coordinates inside Malaysian geographic bounds. The query returned 89 bindings; repeated entity IDs and coordinates outside the bounds were excluded. These are community-maintained institution-level locations, not field-verified entrances or a full branch-campus inventory. The query follows `instance of / subclass of university`; it can include differently classified or historic institutions. Do not interpret a pin as proof of accreditation or operation.

There is deliberately no automatic fuzzy join between MQA names and Wikidata names: it could put a branch campus at a parent institution's main address. Every MQA record has its official state/territory tag and register link in **University directory**. Records without a verified coordinate match are not given invented map positions. Therefore **all university campuses in Malaysia are not yet mapped or verified**. Completing that layer requires matching each registry campus against current institutional addresses and coordinate evidence, plus checking institutions outside these MQR categories.

## Sources and reproducibility

- Public register: https://www.mqa.gov.my/mqr/akrbyipta.cfm
- Private register: https://www.mqa.gov.my/mqr/akrbyipts.cfm and pagination starts 26, 51, 76, 77. Overlapping last-page records are deduplicated.
- Coordinates: Wikidata SPARQL query included in `scripts/refresh-places.mjs`; public structured data under CC0. Each record links to its entity page.
- Landmark entity IDs: Q83063, Q745016, Q7969454, Q822518, Q60967. Fetched through `wbgetentities`, using the first returned coordinate claim.
- Snapshot: `public/data/malaysia-places.json`, with UTC retrieval time, each MQA page's SHA-256, coordinate-response hash, landmark-response hash, scope statement and all records.

Projection matches the DOSM map: `x=(longitude−109)×1.05`, `z=−(latitude−4)×1.05`. Original coordinates remain in the download. Campus pins sit above the extruded state surface; they do not encode labour outcomes. This layer does not change role ranking.

To refresh, install Python 3 and `beautifulsoup4`, then run `node scripts/refresh-places.mjs` from the app directory. It downloads public source responses to `.map-source`, parses MQA tables with Beautiful Soup, and rebuilds the JSON through `scripts/build-map-data.py`. Review source differences and coverage, run tests, then rebuild the app. Public endpoints require no API key. Overpass endpoints returned HTTP 406/429 during this revision and no OpenStreetMap records were incorporated.

## Verification

Three added automated tests check coordinate bounds, unique entity and directory IDs, official source hosts, finite inspection targets, three-layer disclosures, directional projection and preservation of original coordinates when model display offsets are applied. All 29 application tests passed. Browser automation is disabled, so rendered landmark overlap, camera feel, mouse/keyboard selection and mobile labels still need manual visual acceptance.

## Tag refinement

Map tags now have university/landmark icons, category captions, two-line names and a selected state. Projected cards avoid overlap and the inspector, with leader lines to the geographic/model anchors. Preview labels remain until another marker is hovered, making them easier to click. Transparent hit geometry enlarges small university selection targets without changing pin coordinates. Two dedicated layout tests passed for dense 84-pin scenarios, selection priority, viewport bounds and offscreen exclusion. Visual and touch acceptance remain manual.
