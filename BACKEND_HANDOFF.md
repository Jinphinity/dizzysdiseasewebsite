# Dizzy's Disease: Backend & Systems Handoff

This document separates the frontend/aesthetic implementation responsibilities from the deep backend and complex state-machine systems logic. 

**Note to Backend Engineers:** The Frontend (Visual/UI) team has established a highly constrained, aesthetic-heavy baseline to market the survival horror game *Dizzy's Disease*. Your goal is to connect these visual systems to functional logic *without* breaking the CSS layout, DOM structure, or the immersive survival horror tone.

---

## 1. Full Motion Video (FMV) Encounter System

**Current Frontend State:** 
- The UI handles a basic "encounter" overlay state (a black screen placeholder or an overlay div). 
- We have scoped out the aesthetic transition (Approach, Kill, Death).

**Backend Handoff Requirements:**
- Implement the HTML5 `<video>` swapping logic that seamlessly transitions between the three states.
- The player must have a "window of opportunity" to click/shoot the zombie.
- **State Logic Needed**:
  - `start_fmv_encounter(zombie_id)`
  - Handle hit detection (click event on the video/viewport during the active frame window).
  - Preload the "Kill" and "Death" videos to prevent buffering when the swap occurs.
  - Dispatch events (e.g. `encounter_won`, `encounter_lost`) back to the UI to trigger the loot summary or game over screen.

## 2. Inventory & State Persistence

**Current Frontend State:** 
- The UI renders an "Inventory Overlay" that slides out over the game.
- We have CSS for slots, loot currency counters, and item descriptions.

**Backend Handoff Requirements:**
- Replace the mocked frontend state with a robust Inventory Manager.
- Ensure state persistence (initially `localStorage`, then migrating to user profiles).
- Handle edge cases: Insufficient currency, duplicate non-stackable items, inventory full states.
- Define a strict JSON schema for items.

## 3. Metroid-Prime Gun Arm Control

**Current Frontend State:** 
- We will have a pre-rendered 2D gun arm image set over the viewport.

**Backend Handoff Requirements:**
- Write the viewport bounds tracking logic.
- The gun arm needs to rotate or translate to track the mouse pointer smoothly (lerped).
- Enforce constraints: The arm cannot track past the halfway point of the screen to maintain the illusion that the player is looking forward rather than turning completely around.

## 4. Retro OS Hacking Simulator (Computer Terminal)

**Current Frontend State:** 
- The UI contains CSS terminal frames and `VT323` typefaces to display old CRT monitors.
- We handle the CSS zoom/pan animation to enter "Terminal Mode".

**Backend Handoff Requirements:**
- Implement the internal simulation loop of the operating system.
- Build the text-parser or multi-stage logic for the hacking minigame (e.g., matching codes, guessing passwords within attempts).
- Hook the puzzle success state up to the global game progress to unlock real-world doors/lore.

## 5. User Profiles & Cloud Save

**Current Frontend State:** 
- Static frontend only.

**Backend Handoff Requirements:**
- Scaffold the Supabase/Firebase backend.
- Create secure authentication endpoints.
- Allow players to "Save Game" and sync their inventory and puzzle states across devices.
- Generate an anonymous session ID immediately so players don't need to log in to start playing the teaser.
