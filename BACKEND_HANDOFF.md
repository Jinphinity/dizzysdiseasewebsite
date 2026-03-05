# Dizzy's Disease: Backend & Systems Handoff

This document separates the frontend/aesthetic implementation responsibilities from the deep backend and complex state-machine systems logic.

**Note to Backend Engineers:** The Frontend (Visual/UI) team has established a highly constrained, aesthetic-heavy baseline to market the survival horror game *Dizzy's Disease*. Your goal is to connect these visual systems to functional logic *without* breaking the CSS layout, DOM structure, or the immersive survival horror tone.

---

## 1. Full Motion Video (FMV) Encounter System

**Backend Module:** `src/core/encounter/fmv-encounter.js`

**Current State:** Fully implemented state machine with IDLE → APPROACH → KILL/DEATH lifecycle. The system manages timing-based shoot windows and phase transitions.

**Frontend Integration Needed:**
- Wire `<video>` element creation/swapping to the phase change callback.
- Bind viewport clicks to `attemptShot(currentVideoTime)`.
- Bind video `timeupdate` events to `onVideoTimeUpdate()`.
- Show "You Died" screen on DEATH phase, loot summary on KILL phase.

## 2. Gun Arm Tracking (Metroid Prime Style)

**Backend Module:** `src/core/encounter/gun-arm-tracker.js`

**Current State:** Full tracking system with lerped cursor following, anchor tethering (bottom-right), midpoint constraint, and rotation calculation.

**Frontend Integration Needed:**
- Create a gun arm `<img>` element positioned absolutely in the viewport.
- Bind `mousemove` on viewport to `setMousePosition()`.
- Call `tick()` in the animation loop and apply `getTransform()` CSS values.

## 3. Radio Frequency Tuning

**Backend Module:** `src/core/puzzle/radio-tuner.js`

**Current State:** Full tuning system with 4 stations (Emergency Broadcast, Lab Report, Numbers Station, Survivor Channel), signal strength calculation, and clue discovery hooks.

**Frontend Integration Needed:**
- Build the radio dial UI (frequency slider or rotary knob).
- Bind dial input to `tune(frequency)` or `nudge(delta)`.
- Display signal strength meter and static noise proportional to `getSignalStrength()`.
- Show station content when `getLockedStation()` returns a match.
- Wire `discoversClue` results to the game engine's `discoverClue()` method.

## 4. Retro OS Terminal Simulator

**Backend Module:** `src/core/puzzle/terminal-simulator.js`

**Current State:** Full command parser with virtual file system. Supports: HELP, LS, CAT, DECRYPT (requires signal_decoder item), UNLOCK, WHOAMI, CLEAR, EXIT. Tracks read files and puzzle completion.

**Frontend Integration Needed:**
- Replace the static retro OS content with a dynamic terminal that accepts text input.
- Pipe user input to `executeCommand(input, playerInventory)`.
- Render command history from `getHistory()`.
- Handle `shouldClose` flag to trigger the disconnect animation.
- Handle `unlocked` flag to dispatch the terminal unlock to the game engine.

## 5. Microscope Sample Analysis

**Backend Module:** `src/core/puzzle/microscope-analyzer.js`

**Current State:** Full spatial marker analysis system with two samples, zoom levels that scale hit detection, and clue discovery on completion.

**Frontend Integration Needed:**
- Build microscope viewport UI with zoom controls.
- Render sample slide visuals with hidden marker regions.
- Bind clicks to `identifyMarker(clickX, clickY)`.
- Show marker labels when found, completion animation when all markers discovered.
- Wire `discoversClue` to the game engine.

## 6. DNA Splicing Puzzle

**Backend Module:** `src/core/puzzle/dna-splicing.js`

**Current State:** Full puzzle system with configurable difficulty, random sequence generation, fragment pools with decoys, drag-and-drop slot placement, and attempt-limited submission.

**Frontend Integration Needed:**
- Build visual DNA strand display with target sequence indicator.
- Render draggable fragment tiles from `getFragments()`.
- Bind drag-to-slot to `placeFragment(slotIndex, fragmentId)`.
- Bind submit button to `submit()`. Show result feedback.
- Wire `discoversClue` on success to the game engine.

## 7. Gun Workbench / Customization

**Backend Module:** `src/core/economy/gun-workbench.js`

**Current State:** Full modular customization system with 5 weapon slots, 13 parts with stat modifiers, combined stats computation with condition-based penalties, and maintenance operations (clean, degrade, disassemble).

**Frontend Integration Needed:**
- Build weapon 3D/layered view showing each modular part.
- Build part selector panels per slot from `getPartsForSlot(slot)`.
- Bind part selection to `equipPart(partId)`.
- Show computed stats from `getComputedStats()`.
- Bind clean button to `clean()`, show condition bar.

## 8. Inventory & State Persistence

**Current State:** Inventory overlay dynamically renders from `state.player.inventory` with item name resolution via merchant catalog. State versioning and migration pipeline implemented.

**Frontend Integration Needed:**
- Add item icons/images to inventory slots (currently text-only).
- Add item context menu (use, drop, inspect).

## 9. User Profiles & Cloud Save

**Current State:** `LocalProfileRepository` handles localStorage persistence with migration support.

**Backend Work Needed:**
- Scaffold Supabase/Firebase backend.
- Create secure authentication endpoints.
- Implement `CloudProfileRepository` that implements the same `load()/save()` interface.
- Generate anonymous session ID so players can play without logging in.
