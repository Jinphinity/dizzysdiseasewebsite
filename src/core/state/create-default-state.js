export function createDefaultState() {
  return {
    version: 1,
    progress: {
      weaponEquipped: false,
      introEncounterComplete: false,
      terminalUnlocked: false
    },
    player: {
      health: 100,
      loot: 0,
      inventory: []
    },
    clues: {
      archiveKeyphrase: null
    },
    encounter: {
      activeId: null,
      hp: 0
    },
    meta: {
      lastSeenRoute: '/'
    }
  };
}
