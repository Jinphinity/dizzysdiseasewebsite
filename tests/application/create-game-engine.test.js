import { describe, expect, it } from 'vitest';
import { createGameEngine } from '../../src/application/create-game-engine.js';

function createMemoryRepo(seed) {
  let state = seed;

  return {
    async load() {
      return state;
    },
    async save(next) {
      state = next;
      return next;
    }
  };
}

describe('createGameEngine', () => {
  it('loads from repository and persists transitions', async () => {
    const repo = createMemoryRepo();
    const engine = await createGameEngine({ repository: repo });

    engine.pickupWeapon({ encounterId: 'intro_zombie', encounterHp: 100 });
    engine.discoverClue({ clueKey: 'archiveKeyphrase', value: 'silent host' });

    const result = engine.attemptTerminalUnlock('SILENT HOST');

    expect(result.unlocked).toBe(true);
    expect(engine.getState().progress.terminalUnlocked).toBe(true);
    expect(engine.getState().progress.weaponEquipped).toBe(true);
  });
});
