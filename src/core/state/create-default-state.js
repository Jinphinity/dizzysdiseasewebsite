export function createDefaultState() {
  return {
    version: 1,
    progress: {
      weaponEquipped: false,
      introEncounterComplete: false,
      terminalUnlocked: false,
      weaponCondition: 100,
      discoveredMarkers: [],
      radioStationsFound: []
    },
    player: {
      health: 100,
      loot: 0,
      inventory: []
    },
    clues: {
      archiveKeyphrase: null,
      numbersSequence: null,
      bloodSampleAnalyzed: null,
      tissueSampleAnalyzed: null,
      antivenomSynthesized: null
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
