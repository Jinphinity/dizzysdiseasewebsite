import { describe, expect, it } from 'vitest';
import { computeDamage, getActiveHitbox, isPointInRect } from '../../../src/core/encounter/hitbox.js';

describe('hitbox', () => {
  const timeline = [
    { startFrame: 0, endFrame: 9, rect: [100, 100, 100, 100], multiplier: 1.0 },
    { startFrame: 10, endFrame: 20, rect: [80, 80, 150, 150], multiplier: 1.2 }
  ];

  it('returns active hitbox for a frame', () => {
    const active = getActiveHitbox(12, timeline);
    expect(active.multiplier).toBe(1.2);
    expect(active.rect).toEqual([80, 80, 150, 150]);
  });

  it('checks point-in-rect collision', () => {
    expect(isPointInRect({ x: 100, y: 120 }, [80, 80, 150, 150])).toBe(true);
    expect(isPointInRect({ x: 500, y: 500 }, [80, 80, 150, 150])).toBe(false);
  });

  it('computes integer damage from multiplier', () => {
    expect(computeDamage(10, 1.2)).toBe(12);
    expect(computeDamage(10, 0.75)).toBe(8);
  });
});
