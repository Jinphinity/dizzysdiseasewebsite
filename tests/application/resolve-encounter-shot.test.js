import { describe, expect, it } from 'vitest';
import { resolveEncounterShot } from '../../src/application/resolve-encounter-shot.js';

const encounter = {
  stats: { baseDamage: 10 },
  hitboxTimeline: [
    { startFrame: 0, endFrame: 10, rect: [100, 100, 80, 100], multiplier: 1.0 },
    { startFrame: 11, endFrame: 20, rect: [90, 90, 100, 120], multiplier: 1.2 }
  ]
};

describe('resolveEncounterShot', () => {
  it('returns hit with computed damage when point is inside active frame hitbox', () => {
    const result = resolveEncounterShot({
      encounter,
      frameIndex: 12,
      point: { x: 110, y: 120 }
    });

    expect(result.hit).toBe(true);
    expect(result.damage).toBe(12);
  });

  it('returns miss when point does not intersect active hitbox', () => {
    const result = resolveEncounterShot({
      encounter,
      frameIndex: 5,
      point: { x: 10, y: 20 }
    });

    expect(result.hit).toBe(false);
    expect(result.damage).toBe(0);
  });
});
