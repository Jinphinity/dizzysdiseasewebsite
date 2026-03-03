export const ENCOUNTERS = {
  intro_zombie: {
    id: 'intro_zombie',
    route: '/',
    fps: 6,
    loop: true,
    designWidth: 1000,
    designHeight: 600,
    frames: [
      '/assets/enemies/intro_zombie_01.svg',
      '/assets/enemies/intro_zombie_02.svg',
      '/assets/enemies/intro_zombie_03.svg'
    ],
    hitboxTimeline: [
      { startFrame: 0, endFrame: 0, rect: [430, 150, 150, 300], multiplier: 1.0 },
      { startFrame: 1, endFrame: 1, rect: [410, 130, 180, 330], multiplier: 1.1 },
      { startFrame: 2, endFrame: 2, rect: [390, 120, 210, 350], multiplier: 1.2 }
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
