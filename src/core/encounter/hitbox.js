export function getActiveHitbox(frameIndex, timeline) {
  return timeline.find((entry) => frameIndex >= entry.startFrame && frameIndex <= entry.endFrame) ?? null;
}

export function isPointInRect(point, rect) {
  const [x, y, width, height] = rect;
  return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
}

export function computeDamage(baseDamage, multiplier = 1) {
  return Math.round(baseDamage * multiplier);
}
