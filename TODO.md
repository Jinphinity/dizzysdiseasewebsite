# TODO: Future Features & Polish

## Interaction & UI
- [ ] **Dynamic Contextual Cursors**:
  - `Finger / Magnifying Glass` cursor when hovering inspectable items (like pictures/notes).
  - `Grabbing Hand` cursor (animates opening/closing) when hovering grabbable items.
  - Custom crosshair/reticle cursors for weapons (change reticle design based on the equipped gun).
- [ ] **Layered Interactivity System**:
  - Separate interactable object images from the base background layer.
  - Hovering an interactable object triggers it to enlarge, highlight, and rattle/shake to clearly indicate interactivity.
- [ ] **Inventory Overlay**:
  - Clickable button on the side of the screen to toggle the Inventory.
  - Inventory renders as an UI overlay *on top* of the current room, without changing the route or resetting the background state.

## Gameplay Mechanics
- [ ] **Diegetic Computer Hacking (Archive/Comms)**:
  - Clicking a computer terminal pans/zooms the camera so the screen fills most of the viewport.
  - Within the screen, simulate a functional retro OS for puzzles, reading logs, and hacking sequences.
- [ ] **Metroid Prime-Style Gun Arm**:
  - Pre-rendered first-person gun arm that moves locally inside the viewport based on mouse position.
  - Arm is tethered (e.g., bottom right) and has a movement limit.
- [ ] **Radio Frequency Tuning**:
  - A tactile, diegetic radio interface where players can dial frequencies to intercept lore broadcasts or solve audio puzzles.
- [ ] **3D Workbench / Gun Customization**:
  - A seamless 3D (or pseudo-3D layered) workbench where players can inspect, clean, and modularly customize weapon attachments.
- [ ] **Lab Equipment & DNA Splicing**:
  - Microscope minigames for analyzing mutant blood samples to discover clues.
  - A DNA splicing puzzle interface required to synthesize antivenoms or progress the narrative.
- [ ] **Universal Modular/Procedural Puzzle System**:
  - Research and design a modular framework for puzzles so they can be procedurally generated or easily created by designers using existing systems.
  - Ensure systems like Terminal, DNA Splicing, and Radio are universal and parameter-driven.

## Encounter Animation Polish (FMV System)
- [ ] **Full Motion Video (FMV) Encounters**:
  - Replace the old sprite-sequence system with pre-rendered video clips to make encounters terrifying and fluid.
  - **The Attack Video**: A video of a realistic mutant zombie walking towards the camera, eventually lunging and biting the lens.
  - **The "You Died" State**: If the Attack Video reaches the end (the bite frame) before the player successfully lands a shot, transition immediately to a "You Died" screen.
  - **The "Kill" Video**: If the player manages to click/shoot the zombie during the active window of the Attack Video, immediately pause the Attack Video and cut to a "Kill" video (showing the zombie getting shot back/falling dead).
  - *Note: Look into HTML5 `<video>` swapping or seamless overlays to make this transition snappy.*

## Profile & Backend
- [ ] **User Account System**:
  - Complete profile creation and login flow.
  - Save progress and inventory persistently to a deployed server database.
