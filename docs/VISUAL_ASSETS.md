# Visual asset provenance

Updated 20 October 2026.

## SHIFTATLAS app icon

`public/brand/shiftatlas-icon.png` is an original AI-generated concept produced with OpenAI's built-in image-generation tool. It is used in the navigation, footer, browser icon metadata and Apple touch-icon metadata. It does not imply Apple affiliation or review. The original generated PNG is retained without image editing.

Generation prompt:

> Create a single premium iOS-style app icon for SHIFTATLAS, a 3D skills and career exploration atlas. Square 1024x1024 composition, icon fills canvas edge-to-edge, softly rounded squircle silhouette, no surrounding mockup or phone. A distinctive sculptural white ribbon forming an ascending S-shaped path over three subtly layered isometric platforms, one small vivid amber navigation diamond at the upper end. Rich saturated cobalt blue background with subtle cyan directional lighting and precise tactile glass/ceramic depth. Bold clean recognizable silhouette at 32px, refined Apple-platform app-icon craft but original branding, balanced central composition, polished bevels and soft internal shadows. Bright luminous finish, no dark mode, no pastel palette, no text, no letters beyond the abstract path shape, no Apple logo, no SDG logos, no watermark. Deliver one finished icon only.

The prompt specifies a target composition; the delivered image's actual dimensions are those of the retained PNG. It is a prototype identity requiring team review before external brand registration or publication.

## Official SDG icons

All 17 English icons were downloaded directly from the [United Nations goals page](https://sdgs.un.org/goals). Original image URLs follow `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg` through `E_SDG_Icons-17.jpg`. No colours, text, proportions or source bytes were altered. Browser layout scales the complete square images proportionally; no cropping or recolouring is applied.

`public/images/sdg/provenance.json` records each original URL, retrieval timestamp, byte count and SHA-256 digest. `scripts/fetch-sdg-icons.mjs` reproduces the download and validates the JPEG signature. The automated asset test checks every file against its recorded hash and confirms complete goal coverage.

Refer to the [UN communications materials and usage guidance](https://www.un.org/sustainabledevelopment/news/communications-material/) before repurposing these assets. They remain UN artwork, not SHIFTATLAS-generated artwork. The app links to the UN and includes the requested disclaimer in SDG World. There is no UN approval, endorsement or affiliation. No UN emblem is used as part of our app icon.

## 3D backgrounds and SDG interaction

Page backgrounds use CSS three-dimensional cubes, orbit lines and a diamond; scene backgrounds use original Three.js octahedra and rings. Decorations are not factual data. They avoid the official Malaysian map scene to keep geographic context clear.

Entering SDG World focuses the globe and reveals the 17 official icon buttons. Selecting the central globe reopens the collection; selecting an individual icon focuses that goal and displays its original artwork with the target and contribution layers. The overview globe reveals the icon collection in its inspector before navigation. The accessible SDG cards also use the original artwork.
