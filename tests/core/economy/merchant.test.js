import { describe, expect, it } from 'vitest';
import { createDefaultState } from '../../../src/core/state/create-default-state.js';
import { buyItem, sellItem } from '../../../src/core/economy/merchant.js';

describe('merchant economy', () => {
  it('buys item when loot is sufficient', () => {
    const state = {
      ...createDefaultState(),
      player: { health: 100, loot: 50, inventory: [] }
    };

    const result = buyItem({ state, item: { id: 'ammo_pack', cost: 20 } });

    expect(result.ok).toBe(true);
    expect(result.state.player.loot).toBe(30);
    expect(result.state.player.inventory).toContain('ammo_pack');
  });

  it('rejects purchase when loot is insufficient', () => {
    const state = createDefaultState();

    const result = buyItem({ state, item: { id: 'signal_decoder', cost: 45 } });

    expect(result.ok).toBe(false);
    expect(result.error).toBe('INSUFFICIENT_LOOT');
  });

  it('sells item when item exists in inventory', () => {
    const state = {
      ...createDefaultState(),
      player: { health: 100, loot: 5, inventory: ['ammo_pack'] }
    };

    const result = sellItem({ state, item: { id: 'ammo_pack', sell: 10 } });

    expect(result.ok).toBe(true);
    expect(result.state.player.loot).toBe(15);
    expect(result.state.player.inventory).not.toContain('ammo_pack');
  });
});
