export const ENCOUNTERS = {
  intro_zombie: {
    id: 'intro_zombie',
    route: '/',
    fps: 6,
    loop: true,
    designWidth: 1000,
    designHeight: 600,
    // TODO: Replace with FMV <video> system per TODO.md.
    // For now, use the single generated zombie frame as a static overlay.
    frames: [
      '/assets/encounters/intro_zombie/frame_0001.png'
    ],
    hitboxTimeline: [
      { startFrame: 0, endFrame: 0, rect: [430, 150, 150, 300], multiplier: 1.0 }
    ],
    stats: {
      hp: 100,
      baseDamage: 12,
      rewardLoot: 25
    }
  }
};

export function getEncounter(encounterId) {
  return ENCOUNTERS[encounterId] ?? null;
}
