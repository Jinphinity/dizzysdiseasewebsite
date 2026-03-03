import { describe, expect, it } from 'vitest';
import { createDefaultState } from '../../../src/core/state/create-default-state.js';
import { attemptTerminalUnlock, normalizeAnswer } from '../../../src/core/puzzle/terminal-unlock.js';

describe('terminal unlock', () => {
  it('normalizes spacing and case', () => {
    expect(normalizeAnswer('  Silent   HOST ')).toBe('silent host');
  });

  it('unlocks when input matches discovered clue', () => {
    const state = {
      ...createDefaultState(),
      clues: {
        archiveKeyphrase: 'silent host'
      }
    };

    const result = attemptTerminalUnlock(state, '  SILENT host ');

    expect(result.unlocked).toBe(true);
  });

  it('does not unlock when mismatch', () => {
    const state = {
      ...createDefaultState(),
      clues: {
        archiveKeyphrase: 'silent host'
      }
    };

    const result = attemptTerminalUnlock(state, 'wrong answer');

    expect(result.unlocked).toBe(false);
  });
});
