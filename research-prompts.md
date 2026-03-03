# Research Prompts

Use these prompts directly with your research AI. They are written for implementation-grade output (verifiable sources, concrete decisions, minimal fluff).

## Prompt 1: Master Follow-Up Research (Strict + Expansive)

```text
You are a senior research analyst for a web game production team.
Your output will directly drive implementation decisions, so every non-trivial claim must be source-backed with a real URL.

Project context:
- Product: Playable marketing website for "Dizzy's Disease"
- Deadline: March 9, 2026 (7 days)
- MVP direction:
  - Realistic pre-rendered first-person room backgrounds (RE-style influence)
  - Point-and-click hotspots
  - Gun pickup -> zombie encounter -> shoot -> loot loop
  - Merchant + clue-gated puzzle terminals
  - Audio + analytics included
- Deferred from MVP:
  - translation combat
  - Hayt state
  - faction system
- Stack direction:
  - Vite + vanilla JS
  - static hosting now, backend-ready architecture for future accounts/profiles

Primary mission:
Fix and replace the current research with an implementation-grade dossier.
You may expand scope with additional useful research, but must prioritize decisions we can ship now.

Hard quality rules:
1) Every major claim must include a direct URL source.
2) Mark each source as:
   - PRIMARY (official docs, official game/store page, developer source)
   - SECONDARY (articles, blogs, summaries)
3) No citation placeholders, no unresolved refs, no fake links.
4) If uncertain, label "UNVERIFIED" and explain why.
5) Distinguish:
   - "MVP-required now"
   - "Post-MVP optional"
6) Prefer concrete numbers/specs over general advice.
7) Include publish/update dates where available.
8) Include a "confidence" score (High/Med/Low) per decision.

Deliverables (required):

A) Executive Decision Brief (max 20 bullets)
- What to do now, what to defer, top risks, top mitigations.

B) Corrected Reference Matrix (min 30 entries)
- 15 web/browser examples relevant to point-click/game-like UX
- 15 indie/non-web examples relevant to fixed-camera horror, puzzle gating, inventory/economy loops
- Columns:
  - Name
  - Direct URL
  - Primary/Secondary
  - Relevance to our MVP
  - Camera model
  - Input model
  - Asset style
  - Loop mechanics
  - "Steal this pattern"
  - Risk if adapted
  - Confidence

C) Technical Comparison: Enemy Presentation
Compare:
1. Sprite sequence
2. Alpha video overlay (WebM/HEVC alpha)
3. 2.5D layered sprites
For each include:
- Browser support matrix (desktop + mobile Safari/Chrome/Firefox)
- CPU/GPU/memory behavior
- Hitbox sync complexity
- Tooling complexity
- Compression and CDN behavior
- Accessibility/fallback concerns
- Recommendation for MVP + fallback

D) Hitbox & Interaction Spec
- Define one recommended sync method
- Include JSON schema for:
  - encounter timeline
  - per-frame/per-time hit regions
  - damage multipliers
  - animation event hooks
- Include validation plan and test cases.

E) AI Art Production Pipeline (critical)
Design full AI-first pipeline from generation -> cleanup -> export -> integration:
- Prompt templates for:
  - room backgrounds
  - zombie overlays
  - props/loot
  - UI panel art
- Consistency strategy:
  - style anchors
  - seed/version control
  - lens/FOV/lighting rules
- Post-processing checklist:
  - artifact cleanup
  - alpha fringe cleanup
  - tonal matching
  - perspective correction
- Asset contract:
  - naming conventions
  - folder structure
  - target resolutions
  - file formats
  - quality settings
  - size budgets
- Include day-by-day throughput estimate for 7-day deadline.

F) Performance Budget + Loading Strategy
Provide hard budgets:
- initial payload
- per-room background
- zombie anim assets
- JS bundle
- audio
- memory target
- FPS target
- Core Web Vitals target (LCP/INP/CLS)
Include:
- preload/lazy strategy
- cache headers policy
- responsive variants strategy
- low-end fallback mode behavior

G) Platform & Ops Decisions
Compare free/low-cost options with exact limits:
- Hosting (Cloudflare Pages, GitHub Pages, Netlify, Vercel)
- Forms (Formspree, Netlify Forms, others)
- Analytics (Cloudflare, GA4, Plausible)
Output:
- setup effort estimate
- free-tier constraints
- recommendation for MVP

H) Future Accounts/Profile Readiness (no backend now)
Research and define:
- profile/progress schema now
- local-first repository interface now
- migration path later (anonymous -> authenticated user)
- backend candidates for phase 2 (Supabase/Firebase/etc.) with tradeoffs

I) P0/P1/P2 Backlog
- P0 = must ship by March 9
- P1 = polish if time
- P2 = post-MVP
Each item must include dependencies + rough effort (S/M/L).

J) Artifacts
- One Mermaid architecture diagram (MVP)
- One Mermaid migration diagram (MVP -> accounts backend)
- One risk register table (risk, probability, impact, mitigation)

Output format:
1. Executive Summary
2. Decision Table
3. Sections A-J in order
4. Source Appendix:
   - numbered source list with full URLs
   - primary/secondary label
   - date accessed
   - note on reliability

Important:
- You are allowed to broaden the research, but do not bury the MVP decisions.
- If a finding is cool but not useful in 7 days, tag it as "Post-MVP".
```

## Prompt 2: AI Pre-Rendered Horror Art Pipeline

```text
You are a technical art director designing an AI-first prerendered horror art pipeline for a web game-like marketing site.

Project constraints:
- Goal: realistic pre-rendered first-person horror scenes (Resident Evil remake style influence).
- Delivery: static web stack (Vite + vanilla JS), lightweight, mobile-tolerant.
- Gameplay format: fixed room backgrounds + animated 2D zombie overlays + click hitboxes.
- Deadline: 7 days.
- All art will be AI-generated first, then minimally edited.

Your task:
Design a complete production-ready pipeline for creating and shipping assets from AI generation to optimized web integration.

Required output sections:

1) Art Bible (for consistency)
- Define visual pillars: lens/FOV, lighting style, color palette, film grain, depth cues, set-dressing density.
- Define do/don't rules so every room looks from the same game.
- Define naming conventions for rooms, enemies, props, UI overlays, and puzzle assets.

2) Asset Taxonomy + Specs
- Background room stills: target resolution(s), aspect ratios, safe zones for UI/hotspots.
- Enemy overlays: sprite sheet vs frame PNG sequence vs alpha video recommendations.
- Loot/item cards, hotspot masks, foreground occluders, VFX overlays (dust/fog/blood decals).
- For each asset type provide:
  - exact file format
  - target dimensions
  - size budget
  - compression method
  - fallback format

3) AI Generation Workflow
- Prompt structure template for:
  - room backgrounds (fixed camera)
  - zombie overlays (pose and motion consistency)
  - item pickups
  - terminal/puzzle props
- Include negative prompts and continuity constraints.
- Explain how to maintain character/environment consistency across many generations.
- Provide a shot list template for 5 rooms with required deliverables per room.

4) Post-Generation Cleanup Workflow
- Minimum manual/automated cleanup steps:
  - artifact cleanup
  - edge/fringe cleanup for alpha
  - perspective correction
  - tonal matching between rooms
- Define when to use masks, layer separation, and paintover.
- Include QA checklist for usable in-engine approval.

5) Animation + Hitbox Sync Workflow
- Recommend best approach for zombie movement under tight timeline:
  A) frame sequence
  B) transparent video
  C) limited 2D transform animation
- For chosen approach:
  - how to produce animation assets from AI
  - how to define frame/timestamp hitboxes
  - how to validate hitbox accuracy
- Provide JSON schema example for animation + hitbox timeline data.

6) Web Optimization Pipeline
- Exact export profiles:
  - AVIF/WebP/JPEG decision rules
  - quality settings per asset class
  - responsive variants (desktop/tablet/mobile)
- Preload/lazy-load strategy by room and interaction priority.
- Caching strategy for static hosting/CDN.
- Performance budget table with hard limits.

7) Toolchain Recommendations
- Suggest practical toolchains for AI-heavy workflow:
  - image generation
  - upscaling
  - background removal/masking
  - sprite assembly
  - compression/optimization
- Prioritize tools with free or low-cost tiers where possible.
- Include estimated time per room using this pipeline.

8) Risk Register + Mitigations
- List likely risks:
  - style inconsistency
  - uncanny artifacts
  - oversized payloads
  - poor mobile performance
  - legal/licensing concerns with AI assets
- For each, provide mitigation actions and fallback plans.

9) 7-Day Production Plan
- Day-by-day schedule from concept to deploy-ready assets.
- Include daily deliverables and acceptance criteria.
- Separate must-have vs optional polish.

Output format:
- concise executive summary
- tables for specs/budgets
- checklist format for QA
- one Mermaid flowchart of the asset pipeline
- include concrete examples, not generic advice
```

## Prompt 3: Fast Validation Pass (2-Hour Triage)

```text
You are performing a fast research triage for a 7-day web game MVP.

Goal:
Validate only the most decision-critical unknowns in under 2 hours.

Output exactly:
1) Top 10 decision blockers (ranked)
2) For each blocker: best current answer + one primary source URL
3) Red flags list (facts that are uncertain or likely wrong)
4) "Build now" list (what can proceed immediately without more research)
5) "Research next" list (what must be clarified before coding that module)

Scope to prioritize:
- sprite vs alpha-video for enemy overlays
- hitbox sync approach
- browser/mobile support constraints
- free-tier hosting/forms/analytics limits
- minimal backend-ready data model for future accounts

Rules:
- Primary sources first
- No placeholder citations
- No long prose
- If unsure, label UNVERIFIED explicitly
```

## Usage Notes

- Start with Prompt 3 if you want immediate momentum.
- Run Prompt 1 for the full implementation-grade dossier.
- Run Prompt 2 in parallel if asset production starts immediately.
