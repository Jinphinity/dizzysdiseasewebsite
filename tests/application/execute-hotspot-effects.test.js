import { describe, expect, it } from 'vitest';
import { executeHotspotEffects } from '../../src/application/execute-hotspot-effects.js';

describe('executeHotspotEffects', () => {
  it('runs weapon pickup and clue effects through engine methods', () => {
    const calls = [];
    const engine = {
      pickupWeapon(payload) {
        calls.push(['pickupWeapon', payload]);
      },
      discoverClue(payload) {
        calls.push(['discoverClue', payload]);
      },
      dispatch(action) {
        calls.push(['dispatch', action]);
      }
    };

    const result = executeHotspotEffects({
      engine,
      effects: [
        { type: 'start_encounter', encounterId: 'intro_zombie', encounterHp: 100 },
        { type: 'discover_clue', clueKey: 'archiveKeyphrase', value: 'silent host' },
        { type: 'set_progress', key: 'weaponEquipped', value: true }
      ]
    });

    expect(result.ok).toBe(true);
    expect(calls).toEqual([
      ['pickupWeapon', { encounterId: 'intro_zombie', encounterHp: 100 }],
      ['discoverClue', { clueKey: 'archiveKeyphrase', value: 'silent host' }],
      ['dispatch', { type: 'SET_PROGRESS_FLAG', payload: { key: 'weaponEquipped', value: true } }]
    ]);
  });

  it('returns redirect when navigate effect is present', () => {
    const engine = {
      pickupWeapon() {},
      discoverClue() {},
      dispatch() {}
    };

    const result = executeHotspotEffects({
      engine,
      effects: [{ type: 'navigate', to: '/armory' }]
    });

    expect(result.redirectTo).toBe('/armory');
  });
});
