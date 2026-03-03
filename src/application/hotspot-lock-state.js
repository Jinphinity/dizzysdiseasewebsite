import { areRequirementsMet } from './requirements.js';

export function getHotspotLockState({ state, hotspot }) {
  const unlocked = areRequirementsMet(state, hotspot?.requires ?? []);

  if (unlocked) {
    return {
      locked: false,
      unlocked: true,
      message: null
    };
  }

  return {
    locked: true,
    unlocked: false,
    message: hotspot?.lockedMessage ?? 'This path is locked. Complete current objective first.'
  };
}
