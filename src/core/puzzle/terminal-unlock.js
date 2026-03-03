export function normalizeAnswer(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export function attemptTerminalUnlock(state, input) {
  const expected = normalizeAnswer(state.clues?.archiveKeyphrase);
  const given = normalizeAnswer(input);

  if (!expected) {
    return {
      unlocked: false,
      reason: 'MISSING_CLUE',
      state
    };
  }

  if (given !== expected) {
    return {
      unlocked: false,
      reason: 'INCORRECT',
      state
    };
  }

  return {
    unlocked: true,
    state: {
      ...state,
      progress: {
        ...state.progress,
        terminalUnlocked: true
      }
    }
  };
}
