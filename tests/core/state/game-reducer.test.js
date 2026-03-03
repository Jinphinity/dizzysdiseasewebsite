import { describe, expect, it } from 'vitest';
import { createDefaultState } from '../../../src/core/state/create-default-state.js';
import { gameReducer } from '../../../src/core/state/game-reducer.js';

describe('gameReducer', () => {
  it('equips weapon and starts encounter on WEAPON_PICKED_UP', () => {
    const state = createDefaultState();

    const next = gameReducer(state, {
      type: 'WEAPON_PICKED_UP',
      payload: { encounterId: 'intro_zombie', encounterHp: 100 }
    });

    expect(next.progress.weaponEquipped).toBe(true);
    expect(next.encounter.activeId).toBe('intro_zombie');
    expect(next.encounter.hp).toBe(100);
  });

  it('marks intro encounter complete and grants loot', () => {
    const state = {
      ...createDefaultState(),
      encounter: {
        activeId: 'intro_zombie',
        hp: 0
      }
    };

    const next = gameReducer(state, {
      type: 'ENCOUNTER_COMPLETED',
      payload: { encounterId: 'intro_zombie', rewardLoot: 25 }
    });

    expect(next.progress.introEncounterComplete).toBe(true);
    expect(next.player.loot).toBe(25);
    expect(next.encounter.activeId).toBe(null);
  });

  it('stores clue and unlocks terminal when actions are dispatched', () => {
    const state = createDefaultState();

    const withClue = gameReducer(state, {
      type: 'CLUE_DISCOVERED',
      payload: { clueKey: 'archiveKeyphrase', value: 'silent host' }
    });

    const unlocked = gameReducer(withClue, { type: 'TERMINAL_UNLOCKED' });

    expect(unlocked.clues.archiveKeyphrase).toBe('silent host');
    expect(unlocked.progress.terminalUnlocked).toBe(true);
  });

  it('updates arbitrary progress flags via SET_PROGRESS_FLAG', () => {
    const state = createDefaultState();
    const next = gameReducer(state, {
      type: 'SET_PROGRESS_FLAG',
      payload: { key: 'weaponEquipped', value: true }
    });

    expect(next.progress.weaponEquipped).toBe(true);
  });

  it('applies encounter damage and updates viewed route', () => {
    const state = {
      ...createDefaultState(),
      encounter: { activeId: 'intro_zombie', hp: 40 }
    };

    const damaged = gameReducer(state, {
      type: 'ENCOUNTER_DAMAGED',
      payload: { damage: 15 }
    });
    const routed = gameReducer(damaged, {
      type: 'ROUTE_VIEWED',
      payload: { route: '/archive' }
    });

    expect(damaged.encounter.hp).toBe(25);
    expect(routed.meta.lastSeenRoute).toBe('/archive');
  });
});
