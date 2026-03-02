# HANDOVER.md — Dizzy's Disease Website Project
## Complete Context for Fresh AI Continuation

> **How to use this**: This document is a full context dump from a brainstorming session. Read it top to bottom before continuing any work. Every decision, mechanic translation, and open question is captured here. The plan file with sprint breakdown lives at `~/.claude/plans/spicy-roaming-charm.md`.

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
Each HTML page = one explorable **room**. No WASD. Pure mouse. Point-and-click to interact with everything.

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
| Wobbly aim / steady shot | Custom cursor: JS lerp + noise, settles when mouse is still | Low | Landing |
| Wave survival | JS enemy spawner, CSS zombie animation, click-to-shoot | Medium | Landing |
| Weapon durability | MFD durability bar depletes on use | Low | All pages |
| Maintenance mini-game | Canvas wire/node puzzle | Medium | /comms |
| CunningLinguist (translation combat) | Click correct translation to steady aim + fire | Low | /comms + encounters |
| Surgical harvesting | Canvas steady-hand trace mini-game | Medium | /armory |
| Hayt death system | CSS grayscale state, alternate DOM layers, localStorage | Medium | All pages |
| Faction system | First-visit modal, CSS variable theming, localStorage | Low | First visit |
| Bio-material economy | Loot drops as currency, content locked behind spending | Medium | All pages |
| Dismemberment/hit effects | CSS animation on zombie sprite (limb flash/detach) | Low | Encounters |
| Mastermind AI | Grouped zombie behavior coordination | High | V2 |

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
**Game layer**: Lore discovery + Hayt encounter

- Dusty file room aesthetic with a glowing green-phosphor terminal
- Click terminal → MFD right panel shows "personnel files" (team bios as survivor records)
- Click filing cabinet → company/game history as in-world survivor logs
- A **Hayt ghost** drifts across the room (non-threatening CSS animation — semi-transparent, desaturated)
- If `playerState === 'hayt'` in localStorage: the ghost stops and speaks (text in log bar) — exclusive ghost dialogue
- Hidden document in bottom drawer: "Biopunk Origins" — first ARG seed (partially redacted)

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
**Game layer**: Translation challenge + wire puzzle

- Radio equipment aesthetic, distress signal beeping (optional Web Audio API)
- Contact form styled as "Transmission Log":
  - Name field = "Callsign"
  - Email field = "Frequency"
  - Message field = "Broadcast Content"
- **CunningLinguist challenge**: Before form submits, a word prompt appears — translate it correctly to "authenticate broadcast." Three click options. Correct = transmit. Wrong = retry.
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
- Hayt mode: ghostly wisp SVG

### Hayt Death State

```js
// On death:
function enterHaytMode(currentPage) {
  localStorage.setItem('playerState', 'hayt');
  localStorage.setItem('haytLocation', currentPage);
  document.body.classList.add('hayt-mode');
  // Reveal hidden content
  document.querySelectorAll('.hayt-only').forEach(el => el.style.display = 'block');
  document.querySelectorAll('.living-only').forEach(el => el.style.display = 'none');
}
```

```css
body.hayt-mode {
  filter: grayscale(0.9) sepia(0.3);
  animation: static-flicker 8s infinite;
}
@keyframes static-flicker {
  0%, 98%, 100% { filter: grayscale(0.9) sepia(0.3); }
  99% { filter: grayscale(1) brightness(1.4) sepia(0.3); }
}
```

Resurrection: find "serum" item hidden somewhere in game world (requires backtracking / exploration). On collect: `localStorage.setItem('playerState', 'alive')`, remove class.

### Translation Combat (CunningLinguist Demo)

```js
// Word database
const challenges = [
  { prompt: "SHOOT", options: ["Disparar", "Correr", "Saltar"], correct: "Disparar" },
  { prompt: "RELOAD", options: ["Recarga", "Corre", "Ataca"], correct: "Recarga" },
  // ...
];

function showChallenge() {
  const c = challenges[Math.floor(Math.random() * challenges.length)];
  // Render to MFD left panel
  mfdEl.innerHTML = `
    <div class="challenge-prompt">TRANSLATE: "${c.prompt}"</div>
    ${c.options.map(o => `<button onclick="checkAnswer('${o}', '${c.correct}')">${o}</button>`).join('')}
  `;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    wobbleMultiplier *= 0.3; // cursor steadies dramatically
    setTimeout(() => autoFire(), 400); // crosshair locks on → fires
  } else {
    wobbleMultiplier *= 2.5; // cursor spasms
    health -= 5; // zombie advances, takes a swipe
  }
}
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

### Faction System

```js
// First visit check
if (!localStorage.getItem('faction')) {
  showFactionSelect(); // Modal on top of landing page
}

function chooseFaction(faction) {
  localStorage.setItem('faction', faction);
  const colors = {
    military: { accent: '#1a7fcf', bg: '#0a1520' },
    science:  { accent: '#2db85a', bg: '#0a1a0e' },
    cult:     { accent: '#b82d2d', bg: '#1a0a0a' },
  };
  document.documentElement.style.setProperty('--accent', colors[faction].accent);
  document.documentElement.style.setProperty('--bg-deep', colors[faction].bg);
  // Persist via localStorage + re-apply on every page load
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
│   ├── state-machine.js       (alive/hayt/faction/unlocks)
│   ├── enemy-spawner.js       (configurable wave system)
│   └── mini-game-engine.js    (canvas mini-game framework)
├── mechanics/                 ← Configurable per game
│   ├── wobble-aim.js          (tune LERP, noise, weapon shapes)
│   ├── surgical-harvest.js    (steady-hand mini-game)
│   ├── translation-combat.js  (word-match to fire)
│   ├── durability-display.js  (weapon condition MFD widget)
│   └── faction-chooser.js     (persistent faction + CSS theming)
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
- **Hayt-Exclusive Content**: Players who die and enter Hayt mode see content the living can't — different ARG branch

Research reference: `Research/ARGs-Meta-Games.md` — covers The Beast (2001), I Love Bees (2004), Year Zero (NIN), Why So Serious (Dark Knight)

---

## 11. Build Sequence (Assignment MVP Priority)

### Sprint 1 — Structure (First Priority)
- [ ] HTML skeleton: all 5 pages + persistent MFD shell
- [ ] CSS: biopunk base variables, MFD panel layout, navigation doors
- [ ] Custom cursor (styled, no wobble yet)
- [ ] localStorage init: playerState, faction, inventory

### Sprint 2 — Core Game Loop
- [ ] Wobbly cursor JS (lerp + velocity tracking + noise)
- [ ] Landing page zombie (CSS animated sprite)
- [ ] Click-to-shoot with hit detection (JS bounding box)
- [ ] Loot drop + MFD right panel inventory update
- [ ] Health bar (left MFD) decrements on damage

### Sprint 3 — All 5 Pages
- [ ] Archive: terminal click interaction, personnel files, Hayt ghost CSS animation
- [ ] Armory: weapon rack hotspots, description popups, durability bar display
- [ ] Comms: contact form (Formspree), transmission aesthetic, CunningLinguist gate
- [ ] Devlog: cork board CSS, 2 blog posts (researched content)

### Sprint 4 — Mini-Games
- [ ] Canvas wire puzzle (Comms maintenance panel)
- [ ] Canvas harvesting mini-game (Armory surgical station)
- [ ] Hayt death state (CSS filter + `.hayt-only` content swap)
- [ ] Faction chooser modal (first visit)

### Sprint 5 — Polish & Launch
- [ ] Bio-material economy (loot → spend to unlock)
- [ ] Resurrection serum hidden item (enables Hayt recovery)
- [ ] Web Audio API: gunshot, zombie groan, UI blips
- [ ] Mobile graceful degradation (tap instead of point-and-click)
- [ ] Analytics: Plausible or Umami (privacy-first)
- [ ] ARG Phase 1 seeds planted (steganography, Base64 comments)

---

## 12. Tech Stack Decision (TBD — Open Question for User)

**Options evaluated**:

| Approach | Pros | Cons |
|---|---|---|
| Vanilla HTML/CSS/JS | Zero overhead, fastest load, easiest to deploy | More boilerplate |
| Vite + vanilla JS | Module bundling, hot reload, optimized output | Slightly more setup |
| Svelte | Reactive state management, small bundle | Learning curve if unfamiliar |
| React | Familiar if they know it | Overkill for this scope |

**Likely recommendation**: Vite + vanilla JS — gets module system and hot reload without framework overhead. Canvas mini-games work natively.

**Deployment**: GitHub Pages (already have GitHub account + this repo), or Netlify for form handling (Formspree alternative).

---

## 13. Open Questions (Must Resolve Before Building)

1. **Tech stack**: Vanilla JS? Vite? Framework preference?
2. **Art direction**: Pure CSS art (radically minimal), hand-drawn SVG illustration, or photographic assets?
3. **Assignment deadline**: How many days/weeks available?
4. **Contact form**: Formspree (free tier) or Netlify Forms or something else?
5. **Audio**: Include Web Audio API? (Great atmosphere, tricky on mobile autoplay policies)
6. **Hosting**: GitHub Pages (already set up) or need to configure Netlify?
7. **Which mechanic is the "hero"**: Should the landing page lead with wobbly aim shooting, or the faction chooser, or something else?
8. **MPA vs SPA**: Separate `.html` files (simpler) or single-page JS routing (smoother transitions)?

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
- Designed the MFD layout (persistent health/inventory panels)
- Designed Hayt death state as a browser-native persistent death mechanic
- Designed the universal marketing game architecture (`GameMarketingKit/`)
- Confirmed ARG layer (Phase 3) seeded in Phase 1 content
- Identified open questions blocking implementation start

**What's next**:
- Answer open questions (tech stack, art direction, deadline, hosting)
- Begin Sprint 1: HTML skeleton + MFD layout + CSS base
- The plan file at `~/.claude/plans/spicy-roaming-charm.md` has the sprint breakdown
