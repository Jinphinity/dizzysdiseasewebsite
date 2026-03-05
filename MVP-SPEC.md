# Dizzy's Disease Website MVP Specification

Version: 1.0  
Date: March 3, 2026  
Target launch deadline: March 9, 2026

## 1. Objective

Build a playable five-page marketing website that satisfies the assignment rubric while functioning as a lightweight, fixed-camera, point-and-click horror experience.

Primary outcomes:
- Ship on time with all rubric requirements met.
- Deliver one clear core loop: explore -> pickup -> encounter -> loot -> unlock.
- Establish a clean foundation for future user accounts/profiles without requiring backend work now.
- Preserve explicit hospitality-facing copy so rubric interpretation remains safe for grading.
- Enforce location-first UX: Home/Archive/Armory/Comms/Devlog must feel like in-world places, not separate website sections.

## 2. Scope

### 2.1 In Scope (MVP)
- Five required pages/routes with functional navigation and at least one image each.
- Pre-rendered first-person room backgrounds.
- Center-frame gun pickup trigger on Home route.
- One zombie encounter system with deterministic hit detection.
- Inventory + loot currency persistence using local storage.
- Merchant interaction loop (buy/sell, minimal catalog).
- One clue-gated puzzle/terminal flow using lore discovered on another route.
- Contact form submission using a static form provider.
- Audio cues (ambient + interaction SFX).
- Analytics event instrumentation.
- Mobile-safe interaction model (tap hotspots, no hover-only critical actions).
- Hospitality framing layer on all required pages (mission, services, contact, blog context).
- Diegetic map/location travel system for moving between in-world areas.

### 2.2 Out of Scope (Deferred)
- Translation combat system.
- Hayt state/death mode.
- Faction system/theme switching.
- Multiplayer.
- Authentication/accounts backend.
- Complex procedural economy.

## 3. Hard Constraints

- Deadline is fixed: March 9, 2026.
- Architecture must support assignment grading requirements first.
- Runtime must remain lightweight: static-first rendering and limited animation layers.
- Must be deployable on static hosting.

## 3.1 Locked Delivery Stack (Submission-First)

- Build tool: Vite + vanilla JavaScript.
- Hosting: GitHub Pages.
- Form provider: Formspree.
- Analytics: Cloudflare Web Analytics (fallback: GA4 only if Cloudflare setup is blocked).
- Data persistence: Local storage only for MVP.

## 4. Product Pillars

1. Atmosphere first: fixed-camera pre-rendered scenes with strong horror framing.
2. Clarity over complexity: simple interactions that always communicate next possible action.
3. Assignment compliance by design: each route directly maps to rubric criteria.
4. Progressive depth: lore doubles as puzzle clue system to reinforce marketing info.
5. Location-first immersion: every required assignment page is represented as a place in the same game world.

## 4.1 Prime Mandate (Location-First UX)

- Treat Home, Archive, Armory, Comms, and Devlog as physical locations in one connected world.
- Movement between areas must read as in-world travel (map, doors, transit panel, or equivalent diegetic control).
- Never present these as disconnected marketing tabs/sections in tone or structure.
- Assignment labels remain for grading compliance only; player-facing experience remains world-native.

## 5. Route and Content Specification

## 5.1 Location Map (Assignment Mapping)

| Route | Assignment Requirement | In-World Role | Must-Have Interactions |
|---|---|---|---|
| `/` | Home | Safehouse Entry | Gun pickup, first zombie encounter, mission overview |
| `/archive` | About Us | Archive Terminal | Team/history logs, clue discovery |
| `/armory` | Services | Merchant/Loadout Room | Services list, buy/sell interaction |
| `/comms` | Contact Us | Radio Room | Contact form, puzzle terminal unlock |
| `/devlog` | Blog | Evidence Board | At least 2 lore posts, clue references |

Implementation note:
- These are location nodes in one world-state. Routing exists for grading/deep links, while UX framing stays diegetic.

## 5.2 Page-by-Page Requirements

### `/` Home (Safehouse)
Required informational content:
- Mission statement.
- Vision statement.
- Key offering summary.

Gameplay requirements:
- Center-frame weapon pickup hotspot.
- Weapon pickup triggers encounter state.
- One zombie animation layer with synced hitboxes.
- On defeat, grant loot and log update.

Acceptance criteria:
- User can complete first encounter in under 60 seconds on first visit.
- User receives a visible reward and next-step hint.

### `/archive` About Us (Archive Terminal)
Required informational content:
- Company history timeline.
- Values and principles.
- Team member entries.

Gameplay requirements:
- Clickable documents/terminal entries.
- At least one clue required later by `/comms` puzzle.

Acceptance criteria:
- Clue is discoverable within 3 interactions.
- Content remains readable on mobile.

### `/armory` Services (Merchant)
Required informational content:
- Service list with descriptions.
- Any pricing or value indicators.

Gameplay requirements:
- Merchant UI showing 4-8 items.
- Buy/sell flow using loot currency.
- Item acquisition affects available options in at least one other route.

Acceptance criteria:
- Invalid purchase attempts provide clear error feedback.
- Inventory updates persist after refresh.

### `/comms` Contact Us (Radio Room)
Required informational content:
- Phone number.
- Email address.
- Physical address.
- Functional contact form.

Gameplay requirements:
- Terminal/puzzle lock requiring clue from another route.
- Contact form can submit regardless of puzzle completion (puzzle gates bonus content, not rubric-critical path).

Acceptance criteria:
- Form submission success/failure states are visible.
- Puzzle unlock state persists after refresh.

### `/devlog` Blog (Evidence Board)
Required informational content:
- Minimum two blog posts.
- Posts are relevant to project/game world and marketing narrative.

Gameplay requirements:
- At least one post contains a clue reference or follow-up hint.

Acceptance criteria:
- Both posts have clear titles, publish dates, and readable body content.
- Links inside posts are functional.

## 5.3 Hospitality-Safe Copy Mapping (Rubric Protection)

Use explicit language so grader can clearly identify hospitality assignment compliance while preserving game framing.

| Route | Required Hospitality Framing |
|---|---|
| `/` | Describe mission/vision as guest safety, immersive hospitality experience, and service quality. |
| `/archive` | Present company history/team as hospitality operation leadership and service culture. |
| `/armory` | Label offerings as service packages/guest support services with clear descriptions and value tiers. |
| `/comms` | Provide standard business contact details and inquiry workflow for guests/partners. |
| `/devlog` | Frame posts as hospitality industry updates + brand development updates. |

## 5.4 Navigation Contract (Mandatory)

- Primary traversal control is a world/map travel interface inside the game HUD or viewport.
- Route changes should be framed as moving to another room/street/location, not opening a different website section.
- Navigation labels may include assignment names in secondary text for grading, but the primary label should be location-oriented.
- Transition style must preserve single-world continuity (no hard context reset in narrative framing).

## 6. Gameplay and Systems Specification

## 6.1 Core Loop

1. Enter route.
2. Scan hotspots.
3. Interact with object or pickup.
4. Trigger encounter or unlock condition.
5. Earn/consume loot.
6. Use lore clue for gated interaction.
7. Progress to next route objective.

## 6.2 State Model

Persist state in local storage for MVP.

Storage key: `dd_mvp_save_v1`

```json
{
  "version": 1,
  "progress": {
    "weaponEquipped": false,
    "introEncounterComplete": false,
    "terminalUnlocked": false
  },
  "player": {
    "health": 100,
    "loot": 0,
    "inventory": []
  },
  "clues": {
    "archiveKeyphrase": null
  },
  "meta": {
    "firstSeenAt": "2026-03-03T00:00:00.000Z",
    "lastSeenRoute": "/"
  }
}
```

## 6.3 Encounter Specification

Default approach for MVP: sprite sequence overlays (PNG/WebP frame set).

```json
{
  "id": "intro_zombie",
  "route": "/",
  "fps": 12,
  "loop": true,
  "frames": [
    "/assets/encounters/intro_zombie/frame_0001.webp",
    "/assets/encounters/intro_zombie/frame_0002.webp"
  ],
  "hitboxTimeline": [
    { "startFrame": 0, "endFrame": 7, "rect": [610, 220, 170, 260], "multiplier": 1.0 },
    { "startFrame": 8, "endFrame": 15, "rect": [590, 210, 210, 300], "multiplier": 1.1 },
    { "startFrame": 16, "endFrame": 23, "rect": [560, 200, 260, 360], "multiplier": 1.2 }
  ],
  "stats": {
    "hp": 100,
    "baseDamage": 8,
    "rewardLoot": 25
  }
}
```

Rules:
- Hit registration only allowed while encounter is active.
- Each valid hit applies cooldown to prevent multi-hit from one click.
- On HP <= 0, encounter ends, reward applied, state persisted.

## 6.4 Hotspot Specification

```json
{
  "id": "pickup_pistol",
  "route": "/",
  "rect": [702, 468, 124, 70],
  "cursor": "pickup",
  "requires": [],
  "effects": [
    { "type": "set_progress", "key": "weaponEquipped", "value": true },
    { "type": "start_encounter", "encounterId": "intro_zombie" }
  ]
}
```

## 6.5 Merchant Specification

```json
{
  "catalog": [
    { "id": "ammo_pack", "name": "Ammo Pack", "cost": 20, "sell": 10 },
    { "id": "med_kit", "name": "Med Kit", "cost": 30, "sell": 15 },
    { "id": "signal_decoder", "name": "Signal Decoder", "cost": 45, "sell": 22 }
  ]
}
```

Rules:
- Purchase requires `loot >= cost`.
- Sell requires item in inventory.
- All transactions generate analytics events.

## 6.6 Puzzle Gate Specification

- Source clue appears in `/archive` and optionally reinforced in `/devlog`.
- Puzzle input in `/comms` compares normalized string against stored clue.
- Unlock enables bonus terminal content and sets `terminalUnlocked=true`.

## 7. UX and Interaction Rules

- No critical interaction may depend on hover alone.
- Hotspots must provide one of: cursor change, glow outline, or tooltip.
- Maintain persistent lower HUD shell across route transitions.
- Route transitions should feel continuous (fade/slide <= 300ms).
- Provide visible feedback for every click outcome: success, locked, insufficient loot, missed shot.
- Ensure location travel UX (map/room movement) is always primary over generic site navigation patterns.

## 8. Visual/Asset Pipeline Specification

## 8.1 Asset Classes

- Room backgrounds: pre-rendered stills.
- Encounter animation: sprite sequence.
- Foreground/UI overlays: HUD panels, cursor icons, effects.
- Props: pickups, clue documents, merchant items.
- Audio: ambient loops + event SFX.

## 8.2 File Format Targets

- Backgrounds: AVIF primary, WebP fallback.
- Encounter frames: WebP or PNG sequence.
- UI icons: SVG where possible.
- Audio: OGG primary, MP3 fallback.

## 8.3 Naming Convention

- Rooms: `room_<route>_<variant>.<ext>`
- Encounter frames: `enc_<id>_f####.<ext>`
- Hotspot masks: `mask_<route>_<name>.<ext>`
- Audio: `sfx_<event>.<ext>`, `amb_<route>.<ext>`

## 8.4 Performance Budgets

- Initial payload target: <= 2.0 MB compressed.
- Per-room background target: <= 800 KB.
- Encounter animation target: <= 1.2 MB total per encounter.
- JavaScript target: <= 120 KB compressed for MVP core bundle.
- Audio target: <= 2.0 MB total.
- Runtime target: stable 30 FPS on mid-range laptop/mobile.
- Web vitals target: LCP < 2.5s, INP < 200ms, CLS < 0.1.

## 8.5 Loading Strategy

- Preload current route background + HUD assets.
- Lazy-load next likely route assets after first interaction.
- Defer non-critical audio until user interaction.
- Cache immutable static assets with long max-age + content hash filenames.

## 9. Architecture and Code Layout

Proposed structure:

```text
src/
  app/
    router.js
    shell.js
    state-store.js
    analytics.js
  content/
    routes.js
    blog-posts.js
    contacts.js
  systems/
    hotspot-system.js
    encounter-system.js
    hitbox-system.js
    inventory-system.js
    merchant-system.js
    puzzle-system.js
    audio-system.js
  ui/
    hud.js
    log-bar.js
    panels/
  data/
    encounters.json
    hotspots.json
    merchant.json
  styles/
    base.css
    theme-biopunk.css
    hud.css
```

Architectural rules:
- Content data separated from interaction logic.
- Systems should be deterministic and side-effect constrained.
- Route modules may declare required assets and hotspot config.

## 10. Analytics Specification

Track the following events:
- `route_view`
- `hotspot_click`
- `pickup_weapon`
- `encounter_start`
- `encounter_hit`
- `encounter_complete`
- `merchant_buy`
- `merchant_sell`
- `puzzle_attempt`
- `puzzle_unlock`
- `contact_submit`
- `blog_post_open`

Event payload baseline:

```json
{
  "event": "encounter_complete",
  "route": "/",
  "timestamp": "2026-03-03T00:00:00.000Z",
  "sessionId": "anon-uuid",
  "details": {
    "encounterId": "intro_zombie",
    "timeToCompleteMs": 24112,
    "remainingHealth": 72
  }
}
```

## 11. Accessibility and Device Support

Minimum support matrix:
- Desktop: latest Chrome, Firefox, Safari, Edge.
- Mobile: latest iOS Safari, Android Chrome.

Accessibility requirements:
- Visible focus styles for keyboard navigation.
- Buttons/interactive hotspots with accessible labels.
- Color contrast for text and controls meets WCAG AA where practical.
- Option to mute audio.

## 12. Testing and Validation Plan

## 12.1 Unit Test Targets

- State initialization and migration logic.
- Encounter damage and completion logic.
- Hitbox frame lookup logic.
- Merchant transaction validation.
- Puzzle normalization and unlock logic.
- Analytics event payload shape.

## 12.2 Integration Test Targets

- Full intro loop from pickup to loot reward.
- Clue discovery in `/archive` unlocks `/comms` terminal.
- Contact form success and error states.
- Route persistence of HUD and state.

## 12.3 Manual QA Checklist

- All five routes load and are linked correctly.
- Each route contains at least one image.
- Contact fields and submission path work.
- Two blog posts visible and readable.
- No blocker interaction requires desktop-only behavior.
- Save state survives page refresh.
- Core loop can be completed on a clean session in < 3 minutes.
- Hospitality terminology is explicitly present on each required assignment page.

## 13. Delivery Plan (March 3 -> March 9)

### Day 1 (March 3)
- Scaffold project and route shell.
- Implement global state store and persistence.
- Build static page content skeletons for all routes.

Exit criteria:
- Five routes reachable; assignment text placeholders complete.

### Day 2 (March 4)
- Implement hotspot system and HUD shell.
- Add background assets and route transitions.

Exit criteria:
- Clickable hotspots with feedback in at least three routes.

### Day 3 (March 5)
- Implement encounter + hitbox system.
- Hook gun pickup trigger and loot reward.

Exit criteria:
- Intro encounter fully playable on Home route.

### Day 4 (March 6)
- Implement inventory and merchant buy/sell.
- Integrate service content into Armory UI.

Exit criteria:
- User can buy/sell at least 3 items with persistent state.

### Day 5 (March 7)
- Implement clue system and `/comms` puzzle gate.
- Integrate contact form provider.

Exit criteria:
- Clue discovered in `/archive` unlocks `/comms` bonus terminal path; form submits.

### Day 6 (March 8)
- Add audio system, analytics events, and blog polish.
- Optimize assets and loading.

Exit criteria:
- Audio and analytics live; performance budget mostly met.

### Day 7 (March 9)
- Final QA pass and bugfixes.
- Deploy and submission validation.

Exit criteria:
- All rubric items verified; no critical defects.

## 14. Future-Proofing for Accounts/Profile (Post-MVP)

Use repository abstraction now so backend swap is low-risk later.

Interface contract:

```ts
interface PlayerProfileRepository {
  load(): Promise<PlayerProfile>;
  save(profile: PlayerProfile): Promise<void>;
}
```

MVP implementation:
- `LocalProfileRepository` backed by local storage.

Phase 2 implementations:
- `SupabaseProfileRepository` or `FirebaseProfileRepository` with auth.

Migration path:
1. Anonymous local profile generated on first visit.
2. On account creation, local profile serialized and uploaded.
3. Merge rules applied server-side for inventory/progress conflicts.

## 15. Next Major Feature Phase (Spec Additions)

### 15.1 Dynamic Diegetic UI
- **Contextual Cursors**: Hovering over different interactable elements alters the cursor to specifically matching icons (e.g. magnifying glass for inspection, open/close hand for grabbing, discrete reticles unique to different equipped firearms).
- **Layered Hotspots**: Interactive items are decoupled from the base room background. On-hover, the layered item enlarges, highlights, and shakes to clearly communicate interactivity.
- **Inventory Overlay**: An on-screen UI toggle that slides/fades an inventory menu directly over the current scene without routing away from the active location.

### 15.2 Functional Retro OS (Computer Terminal)
- Interacting with in-world computers triggers a smooth pan/zoom in until the monitor fills the viewport.
- The screen acts as a simulated retro operating system allowing the player to engage in narrative hacking puzzles and read deeper lore, keeping the player anchored inside the 3D space rather than switching to an abstract UI page.

### 15.3 The Metroid-Prime Gun Arm
- An independent, pre-rendered 1st-person gun arm asset layered over the viewpoint.
- The camera itself remains fixed, but the arm aligns dynamically with the user's cursor position.
- Tether constraints limit the rotation (e.g., anchored bottom-right, cannot aim past the center X/Y bounds unreasonably) to maintain visual realism without needing real-time 3D rendering.

### 15.4 Cinematic Encounter Implementation
- Encounters utilize realistic, pre-rendered animated frames of a mutant zombie.
- **Phases:** 
  1. Distant wandering/walking animation.
  2. Approach phase (scaling up, accompanied by screen flickers and tension audio).
  3. Lunge read (arms raising).
  4. Final execution frame (face directly clamping onto the camera/viewport).
- Visual identity of the mutant must be strictly consistent across all pre-rendered frames.

### 15.5 Full Profile Backend
- Establish secure user authentication and profiles.
- Migrate local storage save states to cloud persistence, allowing cross-device tracking and dedicated user progression through the marketing narrative.

## 16. Definition of Done (MVP)

MVP is complete only if all are true:
- Five assignment pages are present and fully compliant.
- The five assignment pages are experienced as in-world locations connected by diegetic travel.
- Core gameplay loop is playable end-to-end.
- Deferred systems are not partially implemented in a way that creates dead UI.
- Contact form works in production.
- Analytics events are firing for primary interactions.
- Mobile interaction path is functional.
- Performance is within acceptable range for submission context.
- Documentation is sufficient for another machine/developer to continue without ambiguity.

## 16. Immediate Build Order (Actionable)

1. Scaffold Vite app with route shell and persistent HUD.
2. Implement data-driven hotspot system.
3. Implement intro encounter system with sprite/hitbox timeline.
4. Implement inventory + merchant transaction logic.
5. Implement clue gate + contact flow.
6. Add analytics + audio.
7. Run QA checklist and deploy.
