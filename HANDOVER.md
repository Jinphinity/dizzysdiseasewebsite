# HANDOVER.md — Dizzy's Disease Website Project
## Complete Context for Fresh AI Continuation

> **How to use this**: This document is a full context dump from a brainstorming session. Read it top to bottom before continuing any work. Every decision, mechanic translation, and open question is captured here. The plan file with sprint breakdown lives at `~/.claude/plans/spicy-roaming-charm.md`.

---

## 0. Scope Lock Update (2026-03-02, User-Confirmed)

This section supersedes older notes where they conflict.

### Locked MVP Direction
- Build a **playable marketing website** with a **pre-rendered, realistic horror look** (Resident Evil remake style influence): fixed background scenes, first-person POV framing, 2D animated enemies overlaid on top.
- Keep the experience **lightweight**: most visuals are static pre-rendered images; only interaction layers animate (enemy, loot, UI, puzzle overlays).
- Keep the navigation feeling like **one live app shell** (no jarring full-page resets), but still preserve clear page/room navigation for assignment grading.
- Core interaction starts with **gun pickup in center frame**, which triggers the first zombie encounter.
- Include **audio** and **analytics** in MVP.
- Deadline is **March 9, 2026** (7 days from planning date).

### Explicitly Out of MVP (Deferred)
- Translation combat (CunningLinguist web mechanic)
- Hayt state web mode
- Faction system/theme switching

### MVP Core Loop (Approved)
1. Enter room (pre-rendered scene)
2. Investigate/click hotspots
3. Pick up weapon / key item
4. Trigger zombie encounter (animated overlay + synced hitbox)
5. Loot reward
6. Use loot at merchant / unlock puzzle path
7. Read lore/marketing details embedded as clues
8. Use discovered clues to solve simple puzzle/terminal locks

---

## 0.1 Latest Sync (2026-03-03)

### New Research Prompt Pack
- Added [`research-prompts.md`](research-prompts.md) with three implementation-grade prompts:
  - Master follow-up research (strict + expansive)
  - AI pre-rendered horror art pipeline
  - Fast 2-hour validation triage

### Current Research File Status
- `Research/point-click-research-html.md` is preserved as the latest draft input.
- This draft still contains unresolved citation placeholders and should be treated as **working notes**, not final implementation evidence.

### Immediate Next Step (Recommended)
1. Run Prompt 3 for a fast blocker pass.
2. Run Prompt 1 for full source-verified replacement research.
3. Update/replace `Research/point-click-research-html.md` with validated findings only.

---

## 0.2 Canonical Build Spec (2026-03-03)

- Implementation should now follow [`MVP-SPEC.md`](MVP-SPEC.md) as the primary execution document.
- `HANDOVER.md` remains historical context + rationale; `MVP-SPEC.md` is the build contract.

---

## 0.3 Submission Lock (2026-03-03)

For fastest assignment completion, use these locked defaults:

1. Build stack: Vite + vanilla JS
2. Hosting: GitHub Pages
3. Contact form: Formspree
4. Analytics: Cloudflare Web Analytics (fallback GA4 only if blocked)
5. Visual format: pre-rendered room stills + sprite-sequence encounter overlays
6. Copy strategy: explicit hospitality terminology on all required pages for grading safety

---

## 1. What This Project Is

### The Assignment (Hard Requirement)
A **5-page owned media website** worth 25% of a grade. Requirements:
- Pages: Home, About Us, Services, Contact, Blog (minimum 2 posts)
- Each page must have at least one image
- All links must be functional
- Rubric: 5 criteria × 5 points each = 25 total points

See `ownedmedia-assignment.md` for the full rubric.

### The Ambition (What We're Actually Building)
The assignment is the skeleton. What we're building is a **playable marketing game** that advertises the main game (Dizzy's Disease, a UE5 AAA zombie survival title) while simultaneously fulfilling all assignment requirements. The website IS the game.

**Core inspiration**: System Shock 1 (1994) — entirely mouse-driven, point-and-click interface even though it was first-person. No WASD. The cursor IS the interaction. Every UI element is diegetic. This is the structural model for the website.

**Marketing funnel goal**: Web browser game (this) → mobile game (future) → main UE5 game (the product)

---

## 2. The Main Game: Dizzy's Disease (UE5)

Note: this section is lore/context from the full game vision and includes systems that are intentionally out of MVP scope for the website.

Game design documents are in: `C:\Users\jinph\Documents\Vault 656\07_GameDesign`

### Genre Fusion
- Arcade survival horror (wave-based, CoD Zombies DNA)
- Action-RPG with progression
- Co-op multiplayer
- Immersive sim design philosophy
- Educational integration (language learning / CunningLinguist system)
- Biopunk / body horror aesthetic

### Lore Foundation (Critical for Web Theme)
- **Dizzy's Disease**: A neural virus. Biological interface failure where neurons over-fire, creating a visual feedback loop. The disease "desynchronizes" infected people — they remain conscious but lose motor control.
- **Wetware CPUs**: Living brain tissue used as processors. The horror is that the computer is "someone." Biological data corruption = the biopunk aesthetic.
- **Zombies are "Desynchronized"**: Not mindless. Conscious but hijacked. This matters for how the website frames enemies — they're not monsters, they're victims.
- **Organic Intelligence (OI)**: Designer organisms, surgical harvesting, bio-components. The world runs on wetware.

### Core Gameplay Pillars (from Vault 656)

**1. Wave Survival (Arcade Mode)**
- Spawn → Wave → Collection → Intermission → Escalation
- Waves 1-5: Learning, 6-15: Escalation, 16+: Survival
- Score multipliers: headshots, melee kills, ammo efficiency, speed

**2. Melee Combat System**
- Stamina-based swings
- Weapon degradation: zombie blood is corrosive (lore-justified — pathogen produces corrosive enzymes)
- Weapon condition states: Pristine → Worn → Damaged → Broken
- Maintenance system: cleaning resets active corrosion
- Weapons: Kitchen Knife (fast/fragile), Baseball Bat (control), Crowbar (utility), Fire Axe (high damage/slow), Machete, Sledgehammer (planned)

**3. Hayt Death & Resurrection System (MOST UNIQUE MECHANIC)**
- When a character dies, they can be resurrected but become "Hayt" — locked to their death location
- Death states: Living → Dying (60s bleedout) → Dead → Hayt (resurrected, spatially locked)
- Hayt restrictions: Can't leave death zone, 75% reduced XP, NPCs react with fear/disgust
- Hayt advantages: Death immunity in lock zone, fearless, +50% stats defending lock zone, can see other Hayt/spirits
- Strategic implication: characters become permanent zone defenders after death
- Hayt evolution: Fresh (0-100h) → Settled (100-500h) → Ancient (500h+)

**4. CunningLinguist (Translation-Based Combat)**
- Language learning integrated with action gameplay
- Real-time: translate commands to execute actions ("Shoot" → "Disparar" = fires weapon)
- Translation accuracy affects damage output (100% = full damage + combo, <40% = action fails)
- Adaptive difficulty: enemy speed scales with translation consistency
- Vocabulary sets: Combat (500 words), Environmental (800), Social (600), Advanced (400)
- Languages at launch: Spanish, French, German, Japanese

**5. Surgical Harvesting & Dissection**
- Skill-based mini-game for extracting biological materials from enemies
- Kill method affects material quality (headshot = brain tissue intact +50%, explosive = -70% yield)
- Tool selection: Scalpel (precision), Bone Saw (skeletal), Syringe (fluids), Forceps (organs), Cauterizer (contamination)
- Quality formula: `HarvestQuality = KillMethodBonus + SurgicalPrecision + TimeBonus + ToolQuality - ContaminationPenalty`
- Quality tiers: Pristine (90-100%) → Medical (70-89%) → Standard (50-69%) → Damaged (30-49%) → Contaminated (0-29%)

**6. Faction AI with Mastermind System**
- Three factions: Military, Scientific, Cult
- Mastermind units as force multipliers (50-100m influence radius)
- Intelligence levels: Feral (no mastermind) → Directed → Coordinated → Hive Mind (4+ masterminds)
- Mastermind death consequences: immediate confusion → intelligence degradation → reversion to feral
- Distorter sub-type: causes drunk-like movement (screen sway, input delay) in player
- Deflector sub-type: absorbs projectiles, releases them — requires melee counter

**7. AI-Driven Procedural Economy**
- Player decisions affect real-time prices and item availability
- Item tiers: F (Scrap) → D (Makeshift) → C (Standard) → B (Quality) → A (Masterwork) → S (Legendary)
- Example ripple: Destroy medicine stockpile → prices +300% → black market emerges → new medical faction forms

**8. Level Design Philosophy**
- Immersive sim: multiple solutions to every objective
- Hub worlds with replayable mission zones
- Environmental hazards as non-linear progression gates
- Metroidvania elements (unlock secrets with new abilities)
- Gas mask mechanic as difficulty reset mechanism

---

## 3. What Already Exists in This Repo

```
DizzysDiseaseWebsite/
├── brainstorm.md              ← Original ideation (read this)
├── ownedmedia-assignment.md   ← Assignment requirements + rubric
├── HANDOVER.md                ← This file
└── Research/
    ├── ARGs-Meta-Games.md         ← ARG mechanics, I Love Bees, Year Zero, The Beast
    ├── Biopunk-Lore.md            ← Wetware CPUs, Dizzy's Disease lore, neural viruses
    ├── Marketing-SEO-Trackers-Data.md ← Analytics, SEO, design inspiration
    ├── Web-AestheTech.md          ← Design galleries: Awwwards, Codrops, GSAP Showcase
    └── Web-Games.md               ← System Shock 1 UI deep-dive (MFD model)
```

**Read `brainstorm.md` first** — it has the original point-and-click concept and the first sketch of the MFD model. This HANDOVER document extends and formalizes it.

---

## 4. The Core Concept: Website = Game

### Navigation Model
Each route = one explorable **room**. No WASD. Pure mouse. Point-and-click to interact with everything.

The app uses a **single persistent shell feel** (smooth room swaps and persistent HUD), while still exposing route-level navigation for assignment and shareable links.

```
/            → Safehouse     (Home — tutorial encounter)
/archive     → Archive Room  (About — lore + personnel)
/armory      → Armory        (Services/Features)
/comms       → Radio Room    (Contact — comms + wire puzzle)
/devlog      → Evidence Board (Blog — ARG seeds)
```

Browser back = "walking back through the room." Hover over a door hotspot → door animation plays → navigate. The URL structure itself is lore.

### MFD Layout (System Shock 1 Blueprint)
```
┌─────────────────────────────────────────────────────────┐
│              MAIN VIEWPORT (the illustrated room)        │
│   Clickable hotspots for: enemies, items, doors,        │
│   interactive objects, lore documents                   │
│                                                         │
│                                                         │
├──────────────────────────┬──────────────────────────────┤
│  LEFT MFD                │  RIGHT MFD                   │
│  [Health Bar]            │  [Inventory slots]           │
│  [Ammo: .45 ACP x12]     │  [Drag-drop bio-materials]   │
│  [Bio-Materials: 3x]     │  [Key items]                 │
│  [Weapon Durability]     │  [Equipped weapon]           │
└──────────────────────────┴──────────────────────────────┘
│  LOG BAR: "Zombie Desynchronized. Harvesting available..."  │
└─────────────────────────────────────────────────────────┘
```

The MFD panels are part of the **HTML shell** (persistent across pages). Main viewport is the page-specific content.

---

## 5. Mechanic Translation Matrix

Every major Dizzy's Disease mechanic has a browser-native equivalent. This is the core design insight.

| DD Mechanic | Browser Implementation | Complexity | Page |
|---|---|---|---|
| Gun pickup trigger | Center-frame hotspot activates encounter state machine | Low | Landing |
| Pre-rendered room scenes | AVIF/WebP background per room, fixed perspective | Low | All pages |
| Zombie encounter | 2D sprite/video overlay in front of pre-rendered scene | Medium | Landing + selected rooms |
| Hitbox sync with animation | Frame/time-indexed hitboxes tied to enemy animation timeline | Medium | Encounters |
| Weapon durability | MFD durability bar depletes on use | Low | All pages |
| Maintenance mini-game | Canvas wire/node puzzle | Medium | /comms |
| Surgical harvesting | Canvas steady-hand trace mini-game | Medium | /armory |
| Bio-material economy | Loot drops as currency, content locked behind spending | Medium | All pages |
| Merchant loop | Buy/sell equipment with loot currency | Medium | /armory or /market sub-room |
| Clue-gated puzzle terminals | Password/key item found in lore pages unlocks terminals | Medium | /archive + /comms + /devlog |

---

## 6. Page-by-Page Design

### Page 1: `/` — The Safehouse (Home)
**Satisfies**: Overview, mission statement, key features
**Game layer**: Tutorial encounter room

- CSS illustration of a barricaded safehouse interior
- A zombie animates through a cracked doorway (CSS keyframes) immediately on load
- **TUTORIAL**: Bottom log bar says "Steady your aim." Cursor becomes wobbly crosshair
- Hold mouse still → wobble settles → click zombie → gunshot effect → zombie drops
- Loot item falls (click to collect → enters right MFD inventory)
- Navigation: three door hotspots visible (leading to other pages)
- Bio-readout text scrolls in log bar introducing the disease lore

**Assignment content embedded**: Game overview text appears in the "safehouse bulletin board" style on the wall. Mission statement as a pinned note.

### Page 2: `/archive` — The Archive Terminal (About)
**Satisfies**: Company history, team, values
**Game layer**: Lore discovery + clue discovery

- Dusty file room aesthetic with a glowing green-phosphor terminal
- Click terminal → MFD right panel shows "personnel files" (team bios as survivor records)
- Click filing cabinet → company/game history as in-world survivor logs
- Hidden document in bottom drawer: "Biopunk Origins" (partially redacted) contains a puzzle clue used later in `/comms`

### Page 3: `/armory` — The Armory (Services/Features)
**Satisfies**: Product features, service descriptions
**Game layer**: Weapon inspection + harvesting mini-game

- Wall-mounted weapon rack (CSS illustration)
- Click each weapon → description popup in MFD right panel (this IS the features list, fully diegetic)
- **Surgical Station** in corner: click it → harvesting mini-game canvas overlay opens
- Durability bar visible on each weapon (teaches the mechanic passively)
- A locked footlocker: requires spending bio-materials to open → inside is a "spec sheet" (the pricing/tiers info, reframed as resource costs in-world)
- Optional zombie encounter in this room (guarding a locked weapons case)

### Page 4: `/comms` — The Radio Room (Contact)
**Satisfies**: Contact form, contact information
**Game layer**: Wire puzzle + terminal lock

- Radio equipment aesthetic, distress signal beeping (optional Web Audio API)
- Contact form styled as "Transmission Log":
  - Name field = "Callsign"
  - Email field = "Frequency"
  - Message field = "Broadcast Content"
- **Terminal lock challenge**: Before full terminal access, user enters a simple password/clue discovered from `/archive` or `/devlog`.
- **Maintenance Panel** hotspot: opens canvas wire/node puzzle. Completing it unlocks a "hidden frequency" — ARG Easter egg, maybe a Discord invite or lore document URL.
- Functional form submit (use Formspree or similar static form handler)

### Page 5: `/devlog` — The Evidence Board (Blog)
**Satisfies**: 2+ blog posts with research
**Game layer**: ARG clue distribution

- Cork board covered in pinned notes, photographs, string connecting elements
- Articles appear as hybrid handwritten + typed documents (CSS)
- **Post 1**: "The Biopunk Aesthetic: How Living Machines Change Horror" — researched, SEO-friendly
- **Post 2**: "Why Zombie AI Needs to Be Smarter: Beyond the Shamble" — researched, game design focused
- Hidden elements: steganographic text in images (white-on-white), Base64 in HTML comments, subtle Morse code in post metadata
- These seed the ARG Phase 3

---

## 7. Core Mechanic Technical Implementations

### Wobbly Cursor System

Custom absolutely-positioned div follows mouse via JS. System cursor hidden (`cursor: none` on body).

```js
// State
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
let mouseVelocity = 0;
let lastMouseX = 0, lastMouseY = 0;
const LERP = 0.12;
const MAX_WOBBLE = 6; // pixels

document.addEventListener('mousemove', e => {
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  mouseVelocity = Math.sqrt(dx*dx + dy*dy);
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  targetX = e.clientX;
  targetY = e.clientY;
});

function tick() {
  // Lerp toward target (creates lag/inertia)
  cursorX += (targetX - cursorX) * LERP;
  cursorY += (targetY - cursorY) * LERP;

  // Wobble based on velocity (settles when still)
  const wobbleAmount = Math.min(mouseVelocity * 0.3, MAX_WOBBLE);
  cursorX += (Math.random() - 0.5) * wobbleAmount;
  cursorY += (Math.random() - 0.5) * wobbleAmount;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  mouseVelocity *= 0.85; // decay
  requestAnimationFrame(tick);
}
```

Cursor changes shape based on context:
- Default zone: OS-style arrow (CSS SVG)
- Over enemy: crosshair/weapon sight SVG
- Over loot: grabbing hand SVG
- Over door/hotspot: door arrow SVG

### Encounter Trigger + Animated Enemy Overlay

```js
// Player clicks center-frame weapon pickup
function onWeaponPickup() {
  gameState.weaponEquipped = true;
  startEncounter("intro-zombie");
}

function startEncounter(id) {
  const encounter = encounterConfig[id];
  playEnemyAnimation(encounter.animation); // sprite sequence or short video loop
  enableHitboxLayer(encounter.hitboxTimeline);
}
```

### Frame/Time-Synced Hitboxes (Video or Sprite Sequence)

```js
// Map frame ranges to hit regions for deterministic hit detection
const hitboxTimeline = [
  { startFrame: 0, endFrame: 12, rect: [610, 220, 180, 260], damageMult: 1.0 },
  { startFrame: 13, endFrame: 24, rect: [590, 210, 220, 300], damageMult: 1.1 },
  { startFrame: 25, endFrame: 36, rect: [560, 200, 280, 360], damageMult: 1.2 }
];
```

### Surgical Harvesting Mini-Game (Canvas)

```js
// Canvas overlay with animated trace path
// Player must follow the bezier curve with their mouse
// deviation = Math.hypot(mouseX - pathX, mouseY - pathY)
// totalDeviation accumulates → maps to quality tier at end
// Decomposition timer adds pressure (10 seconds)
```

Procedure:
1. Click dead zombie → canvas overlay slides in
2. Scalpel cursor appears (custom SVG)
3. Animated dashed line traces the extraction path
4. Player follows it — deviation tracked per frame
5. 10-second timer (decomposition)
6. On complete → quality calculation → loot item added to inventory

### Merchant + Puzzle Gating

```js
// Minimal economy loop
function buyItem(itemId) {
  const item = merchantStock[itemId];
  if (player.loot >= item.cost) {
    player.loot -= item.cost;
    player.inventory.push(itemId);
  }
}

// Lore clue/password gate
function unlockTerminal(input) {
  if (input.trim().toLowerCase() === gameState.discoveredPassword) {
    gameState.terminalUnlocked = true;
  }
}
```

---

## 8. Universal Marketing Game Architecture

The architecture built for Dizzy's Disease is designed to be a **reusable template** for any game's marketing site:

```
GameMarketingKit/
├── core/                      ← Never changes between games
│   ├── cursor-system.js       (wobble, inertia, context shapes)
│   ├── mfd-panel.js           (SS1-style persistent UI panels)
│   ├── inventory-system.js    (drag-drop, localStorage)
│   ├── state-machine.js       (encounter/loot/puzzle progression)
│   ├── encounter-engine.js    (enemy overlay state + hitbox sync)
│   └── mini-game-engine.js    (canvas mini-game framework)
├── mechanics/                 ← Configurable per game
│   ├── wobble-aim.js          (tune LERP, noise, weapon shapes)
│   ├── surgical-harvest.js    (steady-hand mini-game)
│   ├── encounter-shooting.js  (pickup trigger + shooting loop)
│   ├── durability-display.js  (weapon condition MFD widget)
│   └── merchant-loop.js       (buy/sell + simple economy)
├── themes/                    ← Swap entirely per game
│   ├── biopunk/               (Dizzy's Disease)
│   │   ├── variables.css      (CSS custom properties)
│   │   ├── enemies/           (zombie.svg, boss.svg, etc.)
│   │   └── lore.json          (narrative text, log entries)
│   ├── cyberpunk/             (placeholder for future game)
│   └── cosmic-horror/         (placeholder for future game)
└── pages/                     ← Reusable room templates
    ├── safehouse.html         (home)
    ├── archive.html           (about)
    ├── armory.html            (features)
    ├── comms.html             (contact)
    └── devlog.html            (blog)
```

**To skin for a new game**: Swap `themes/biopunk/` → `themes/cyberpunk/`, update `lore.json`, provide new enemy SVGs, adjust CSS variables. Core mechanics unchanged.

---

## 9. Lore Aesthetic in the UI

The Dizzy's Disease biopunk aesthetic should bleed into every piece of copy on the site:

| Normal Web Copy | Biopunk Equivalent |
|---|---|
| Loading... | Neural Calibration in Progress |
| 404 Not Found | Signal Desynchronized. Node Unreachable. |
| Submit | Transmit Broadcast |
| Error | Pathogen Interference Detected |
| Click to continue | Interface Stabilized. Proceed. |
| Home | Safehouse |
| About | Archive Terminal |
| Services | Armory & Harvest Station |
| Contact | Comms Array |
| Blog | Evidence Board |

Text should occasionally glitch (CSS `@keyframes` that briefly shifts letter-spacing or applies a scanline).

---

## 10. ARG Layer (Phase 3 — Post Assignment)

Seeded in Phase 1, activated later:
- **Steganography**: White text on white backgrounds in blog post images (CSS color: transparent, reveals on `Ctrl+A` or inspect)
- **HTML Comments**: Base64-encoded lore fragments
- **Morse Code**: Hidden in post publish timestamps or image alt text
- **Hidden Frequency**: Completing /comms wire puzzle → reveals URL → leads to a locked Discord channel or Notion page

Research reference: `Research/ARGs-Meta-Games.md` — covers The Beast (2001), I Love Bees (2004), Year Zero (NIN), Why So Serious (Dark Knight)

---

## 11. Build Sequence (Assignment MVP Priority)

### Sprint 1 — Structure (First Priority)
- [ ] 5-page skeleton + persistent MFD shell
- [ ] Route-safe navigation with one-shell transition feel
- [ ] CSS: pre-rendered scene framing, HUD layout, hotspot layers
- [ ] localStorage init: inventory, loot currency, puzzle flags

### Sprint 2 — Core Game Loop
- [ ] Landing page center weapon pickup trigger
- [ ] Zombie encounter overlay (sprite/video) with synced hitboxes
- [ ] Click-to-shoot with deterministic hit detection
- [ ] Loot drop + MFD right panel inventory update
- [ ] Health bar (left MFD) decrements on damage

### Sprint 3 — All 5 Pages
- [ ] Archive: terminal interaction + diary/lore clue discovery
- [ ] Armory: weapon rack hotspots, description popups, durability bar display
- [ ] Comms: contact form + transmission aesthetic + terminal password gate
- [ ] Devlog: cork board CSS, 2 blog posts (researched content)

### Sprint 4 — Mini-Games
- [ ] Canvas wire puzzle (Comms maintenance panel)
- [ ] Canvas harvesting mini-game (Armory surgical station)
- [ ] Merchant buy/sell panel (basic economy loop)
- [ ] Key-item + clue-based puzzle unlocking flow

### Sprint 5 — Polish & Launch
- [ ] Bio-material economy (loot → spend to unlock)
- [ ] Web Audio API: gunshot, zombie groan, UI blips
- [ ] Mobile graceful degradation (tap-friendly hotspots)
- [ ] Analytics instrumentation (free-tier friendly)
- [ ] ARG Phase 1 seeds planted (steganography, Base64 comments)

---

## 12. Tech Stack Decision (Locked for MVP)

**Options evaluated**:

| Approach | Pros | Cons |
|---|---|---|
| Vanilla HTML/CSS/JS | Zero overhead, fastest load, easiest to deploy | More boilerplate |
| Vite + vanilla JS | Module bundling, hot reload, optimized output | Slightly more setup |
| Svelte | Reactive state management, small bundle | Learning curve if unfamiliar |
| React | Familiar if they know it | Overkill for this scope |

**Chosen recommendation**: Vite + vanilla JS — fastest setup, low overhead, good module structure, and native Canvas/media support.

**Deployment**: GitHub Pages for hosting (free for public repos) + Formspree for contact form handling + Cloudflare Web Analytics (or GA4 if required).

---

## 13. Resolved Decisions + Execution Defaults

### Resolved
1. Tech stack direction: Vite + vanilla JS
2. Visual direction: realistic pre-rendered scenes, first-person framing
3. Hero mechanic: center weapon pickup triggers first zombie encounter
4. De-scoped for MVP: translation combat, Hayt state, faction system
5. Audio: yes
6. Analytics: yes
7. Deadline: March 9, 2026

### Execution defaults (unless explicitly changed)
1. Contact form provider: Formspree free tier
2. Routing model: multi-page routes with SPA-like transitions (persistent shell feel + grading-safe URLs)
3. Enemy animation format: sprite sequences for encounter loops (sync-safe), optional short video only for cinematic moments

---

## 14. Research References in Repo

| File | What It Covers |
|---|---|
| `Research/Web-Games.md` | System Shock 1 MFD deep-dive, cursor model, item gating |
| `Research/ARGs-Meta-Games.md` | ARG mechanics, I Love Bees, Year Zero, legal/privacy |
| `Research/Biopunk-Lore.md` | Wetware CPUs, neural viruses, biopunk aesthetic sources |
| `Research/Web-AestheTech.md` | Awwwards, Codrops, GSAP Showcase, design gallery curation |
| `Research/Marketing-SEO-Trackers-Data.md` | SEO, analytics, game studio site patterns |

---

## 15. Session Summary (What Was Decided This Session)

**Date**: 2026-03-02

**What happened**:
- Loaded full game design vault from `C:\Users\jinph\Documents\Vault 656\07_GameDesign`
- Synthesized all Dizzy's Disease mechanics into browser-feasible equivalents
- Established System Shock 1 as the navigation/UI architecture model
- Designed the 5-page room map (Safehouse, Archive, Armory, Comms, Evidence Board)
- Locked MVP scope to pre-rendered realistic scenes + lightweight encounter overlays
- Removed translation combat, Hayt state, and faction system from MVP
- Confirmed audio + analytics are in MVP
- Confirmed deadline: March 9, 2026

**What's next**:
- Implementation choices are locked in `MVP-SPEC.md`; do not reopen unless blocked.
- Begin Sprint 1 immediately: 5-page skeleton + persistent shell + hotspot system
- The plan file at `~/.claude/plans/spicy-roaming-charm.md` has the sprint breakdown
