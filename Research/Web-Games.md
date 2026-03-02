# Research: System Shock 1 (1994) UI & Interactivity for Web

System Shock 1 (SS1) provides the perfect blueprint for a "browser-as-game" interface because it was designed for a 1:1 mouse-driven experience before mouselook became standard.

## 1. The MFD (Multi-Function Display) System
In SS1, the HUD was composed of "MFDs" — panels that could be swapped to show maps, inventory, health, or emails.
- **Web Application:** The website UI uses similar fixed panels. Clicking a "TAB" in the game world (e.g., a physical button on a radio) swaps the content of an HTML `<aside>` or `<div>`.
- **Aesthetic:** High-contrast, pixelated, 90s cyber-medical readout styles.

## 2. Cursor Control vs. Interaction
SS1 required toggling between mouselook and cursor mode.
- **Web Application:** The browser is *always* in cursor mode. We lean into this. The "Game" isn't an FPS; it's an **Interface Simulation**.
- **The "Arm" Aiming:** In original SS1, weapons weren't centered. A literal "Arm" icon moved around the screen. This maps perfectly to a **CSS-trapped cursor** or a custom `div` that follows the mouse with "wobble" (lag/inertia).

## 3. Tactile 2D Puzzles
SS1 features "Wire Puzzles" and "Node Puzzles" that were played entirely in a 2D popup.
- **Web Application:** These translate directly to canvas-based mini-games.
- **Implementation:** Use a "Maintenance Panel" on the website's Contact page that the user must "solve" to send a message.

## 4. Item Gating & Environmental Interactivity
Picking up items involved clicking and dragging them into an MFD.
- **Web Application:** Implementing a simple "Drag and Drop" between the game-world (image) and the "Inventory" (panel) creates a sense of physical weight and scarcity.
- **Mastery:** Locked doors/content on the website can be opened only if the "Key Item" (a specific cookie or localStorage flag) is in the "MFD".

---

*Applied to Dizzy's Disease:*
- The **Home Page** is the "Viewport".
- The **Sidebar** is the "MFD" (Health/Inventory).
- The **Bottom Bar** is the "Status/Log" (Scanned files/Bio-readouts).
