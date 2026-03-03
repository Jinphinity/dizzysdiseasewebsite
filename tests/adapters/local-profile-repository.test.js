import { describe, expect, it } from 'vitest';
import { LocalProfileRepository } from '../../src/adapters/storage/local-profile-repository.js';

function createMemoryStorage() {
  const data = new Map();

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, value);
    }
  };
}

describe('LocalProfileRepository', () => {
  it('returns null when there is no saved profile', async () => {
    const storage = createMemoryStorage();
    const repo = new LocalProfileRepository(storage, 'test');

    expect(await repo.load()).toBeNull();
  });

  it('saves and loads profile with default field merging', async () => {
    const storage = createMemoryStorage();
    const repo = new LocalProfileRepository(storage, 'test');

    await repo.save({
      player: {
        loot: 99,
        inventory: ['ammo_pack']
      },
      progress: {
        weaponEquipped: true
      }
    });

    const loaded = await repo.load();

    expect(loaded.player.loot).toBe(99);
    expect(loaded.player.inventory).toEqual(['ammo_pack']);
    expect(loaded.player.health).toBe(100);
    expect(loaded.progress.weaponEquipped).toBe(true);
    expect(loaded.progress.terminalUnlocked).toBe(false);
  });
});
