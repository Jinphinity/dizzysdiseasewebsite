# HANDOVER.md — Dizzy's Disease Website Project

## Session Summary (Last Update: Phase 2 - Backend & Aesthetics Systems)
This project was transitioned from a static UI skeleton to a fully functional, highly modular game engine running in the browser. A strict aesthetic protocol was established to ensure future AI agents maintain the "Survival Horror" visual style.

*Note: All AI agents MUST read `PROJECT_AESTHETICS.md` before doing any visual work, and MUST read `.cortext/standards/GIT_HANDOVER.md` before committing work.*

### **CRITICAL: CHECK-FIRST MANDATE**
In this session, the AI (Gemini/Opus) initially failed to check if universal styles or git handover protocols already existed within `.cortext` before creating new ones. 
**ALL FUTURE AGENTS MUST:**
1. Search the root and `.cortext` for any existing rules before proposing a "new" system.
2. Update/extend existing docs instead of duplicating content.
3. This is the root cause of the current session's refactor bloat.

## Current Architecture State
The backend monolith (`main.js`) has been decomposed. The state machine operates on a Redux-style reducer (`game-reducer.js`).

**Deep Systems Implemented:**
- **Hotspot & Action Dispatchers:** `handle-hotspot.js`, `handle-action.js`, `handle-form.js`.
- **Encounter Engine:** `fmv-encounter.js` (manages branching video states: approach, death, kill) and `gun-arm-tracker.js` (Metroid Prime-style lerped aiming).
- **Puzzle Engine:** `radio-tuner.js`, `terminal-simulator.js` (virtual OS with terminal hacking), `dna-splicing.js`, `microscope-analyzer.js`.
- **Economy & Persistence:** `gun-workbench.js` (modular weapon parts), `migrate-state.js` (save schema versioning), `cloud-profile-repository.js` (stubbed for future remote saves).

## Open Threads / Next Steps
The backend logic is complete. The next AI/human taking over needs to:
1. **Wire the Visuals:** The 7 new complex systems (Radio, Workbench, DNA, Microscope, Terminal Simulator, FMV) need HTML/CSS interfaces built for them.
2. **Procedural Puzzles:** Design a universal procedural generation layer for the puzzle modules (noted in `TODO.md` as "Universal Modular/Procedural Puzzle System").
3. **FMV Assets:** Replace placeholder encounter SVGs with actual HTML5 `<video>` tags hooked up to the `fmv-encounter.js` state machine.
4. **Cloud Save DB:** Connect `CloudProfileRepository` to a real Supabase/Firebase backend.

## Context Pointers
- **Visuals:** `PROJECT_AESTHETICS.md` (Strict Survival Horror Guidelines).
- **Operations:** `ENGINEERING_PROTOCOL.md` (Frontend vs Backend responsibilities).
- **Requirements:** `MVP-SPEC.md` / `ownedmedia-assignment.md`.
- **Global AI System:** `.cortext/CORTEXT.md`.
