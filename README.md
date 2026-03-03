# Dizzy's Disease Website MVP (Implementation Start)

This repo now includes a modular, headless-core implementation foundation designed for rapid frontend redesigns.

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm test
npm run build
```

## Architecture (Frontend-Flexible)

- `src/core/*`
  - Pure game/business logic.
  - No DOM dependencies.
  - Safe to keep stable while redesigning UI.
- `src/application/create-game-engine.js`
  - Use-case orchestration layer.
  - Exposes a compact API for UI layers (`pickupWeapon`, `buyItem`, `attemptTerminalUnlock`, etc).
- `src/adapters/storage/*`
  - Persistence adapters.
  - `LocalProfileRepository` is current MVP adapter.
  - Replace with cloud adapter later without changing core rules.
- `src/ui/*`
  - Presentation-only rendering.
  - Replace this layer freely for new themes/layouts.

## Atomic Modules Implemented

- State defaults and reducer: `src/core/state/*`
- Encounter math and hitbox helpers: `src/core/encounter/hitbox.js`
- Merchant economy rules: `src/core/economy/merchant.js`
- Puzzle answer normalization + unlock logic: `src/core/puzzle/terminal-unlock.js`
- Engine boundary API: `src/application/create-game-engine.js`
- Local persistence adapter: `src/adapters/storage/local-profile-repository.js`

## Frontend Redesign Strategy

When redesigning, do not rewrite core logic. Swap only these pieces:

1. `src/ui/render-shell.js` (layout and component tree)
2. `src/styles/*` (theme and visual identity)
3. Optional route/content adapters under future `src/content/*`

As long as UI triggers engine methods and reads `engine.getState()`, gameplay behavior remains intact.

## Current Scope

This is a backend-first gameplay core + minimal UI proof shell, not final production UX.
See `MVP-SPEC.md` for the full delivery contract.
