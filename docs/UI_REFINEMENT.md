# UI and 3D refinement

## Navigation

The home route is now a dedicated landing page. It introduces the product with a live, selectable 3D atlas, six chapter links, an evidence/local-context section, SDG purpose section and clear calls to action. `/atlas/` retains the functioning application. Chapter links use a validated `module` query parameter; dashboard navigation updates that parameter. The dashboard brand returns home.

## Visual direction

White and neutral light-grey surfaces, dark navy text, electric cobalt actions, cyan highlights and amber accents unify the landing page, dashboard and 3D materials. Saturated emerald, violet and coral distinguish skills and structures. The interface is light mode, with bold accents rather than pastel colours. Larger type, softer card corners, stronger selected states and more space around controls improve hierarchy. Small screens stack the hero and context sections, use a two-column chapter grid, and retain the dashboard's existing responsive navigation and text alternatives. Skip links and reduced-motion styling are included.

## Geometry changes

- Islands now have layered hexagonal foundations, contrasting top surfaces and inset perimeter markings.
- Buildings have plinths, window grids, rooftop equipment and entrances; the overview city includes a fountain and mast.
- Footbridges include edge rails and posts.
- Trees have faceted, layered canopies and planted bases.
- The skill constellation has orbital rings around its central node.
- Learning Islands use a serpentine route with continuous connections between rows, small book models and completed-step labels.
- The conceptual SDG globe includes faceted green patches and latitude rings. These decorative patches are not geographic continent data.
- Lighting, ground grid and floating labels use the light theme with saturated accents. Demand-based rendering and device-pixel-ratio limits remain enabled.

## Click-to-inspect and motion

Selecting an object or its label smoothly focuses the orthographic camera and opens a three-layer inspector with object-specific explanations. Island foundations separate vertically; the selected tier highlights in blue, cyan or amber. Concentric selection rings illustrate layers for other objects. The rings are explanatory indicators, not extra measurements. Official map geometry remains fixed; map clicks focus the actual geographic hit point.

Role cards, SDG tiles, trend tabs and scenario controls synchronise their selections with the scene. Overview and landing-page objects first reveal their layers; **Enter this world** opens the destination. Skills and learning selections keep the view on the model instead of automatically scrolling away.

Module content and cards enter with short staggered transitions. Scene models rise into place. Skill orbit rings and the conceptual globe rotate slowly; building beacons and selection rings have restrained pulses. Numerical building heights stay fixed. **Pause motion** stops ambient animation and makes camera/layer changes immediate. Operating-system reduced-motion settings remove animations and smooth camera travel. Continuous rendering suspends when the scene is offscreen or the browser tab is hidden.

Use **Full scene**, the close button, the existing camera-reset control, or Escape to return. Dragging interrupts a running camera transition. Layer separation can be collapsed independently of the selected object's details. Source links remain available in the inspector, with equivalent controls and details in the dashboard panels.

The DOSM map coordinates and original polygons were not changed. Role coverage, course-time heights, SDG emphasis and scenario indices keep their existing meanings. Numerical methods and source snapshots were not altered by this visual refinement.

## Verification limits

Core tests and TypeScript checks are retained. Browser automation is disabled in Work settings, so screenshot, responsive layout and WebGL interaction acceptance remain manual tasks. The existing Sites project still returns `project not found`; the local build and ZIP packages are the available deliverables, not a confirmed hosted publication.
