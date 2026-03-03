import { describe, expect, it } from 'vitest';
import { areRequirementsMet } from '../../src/application/requirements.js';
import { createDefaultState } from '../../src/core/state/create-default-state.js';

describe('requirements', () => {
  it('passes for matching progress and clue requirements', () => {
    const state = {
      ...createDefaultState(),
      progress: { ...createDefaultState().progress, introEncounterComplete: true },
      clues: { archiveKeyphrase: 'silent host' }
    };

    const ok = areRequirementsMet(state, [
      { type: 'progress', key: 'introEncounterComplete', equals: true },
      { type: 'clue', key: 'archiveKeyphrase' }
    ]);

    expect(ok).toBe(true);
  });

  it('fails when inventory requirement is not met', () => {
    const state = createDefaultState();

    const ok = areRequirementsMet(state, [{ type: 'inventory_contains', itemId: 'keycard_alpha' }]);

    expect(ok).toBe(false);
  });
});
