import { describe, expect, it } from 'vitest';
import { getHotspotLockState } from '../../src/application/hotspot-lock-state.js';
import { createDefaultState } from '../../src/core/state/create-default-state.js';

describe('getHotspotLockState', () => {
  it('returns locked with custom message when requirements are not met', () => {
    const state = createDefaultState();
    const hotspot = {
      id: 'door_to_archive',
      requires: [{ type: 'progress', key: 'introEncounterComplete', equals: true }],
      lockedMessage: 'Door sealed. Neutralize threat first.'
    };

    const result = getHotspotLockState({ state, hotspot });

    expect(result.locked).toBe(true);
    expect(result.unlocked).toBe(false);
    expect(result.message).toBe('Door sealed. Neutralize threat first.');
  });

  it('returns unlocked when requirements are met', () => {
    const state = {
      ...createDefaultState(),
      progress: {
        ...createDefaultState().progress,
        introEncounterComplete: true
      }
    };
    const hotspot = {
      id: 'door_to_archive',
      requires: [{ type: 'progress', key: 'introEncounterComplete', equals: true }]
    };

    const result = getHotspotLockState({ state, hotspot });

    expect(result.locked).toBe(false);
    expect(result.unlocked).toBe(true);
    expect(result.message).toBeNull();
  });
});
