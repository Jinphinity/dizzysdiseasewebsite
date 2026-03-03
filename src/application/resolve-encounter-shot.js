import { computeDamage, getActiveHitbox, isPointInRect } from '../core/encounter/hitbox.js';

export function resolveEncounterShot({ encounter, frameIndex, point }) {
  const activeHitbox = getActiveHitbox(frameIndex, encounter.hitboxTimeline);

  if (!activeHitbox) {
    return { hit: false, damage: 0 };
  }

  const hit = isPointInRect(point, activeHitbox.rect);
  if (!hit) {
    return { hit: false, damage: 0 };
  }

  const damage = computeDamage(encounter.stats.baseDamage, activeHitbox.multiplier);

  return {
    hit: true,
    damage
  };
}
