export function gameReducer(state, action) {
  switch (action.type) {
    case 'WEAPON_PICKED_UP': {
      return {
        ...state,
        progress: {
          ...state.progress,
          weaponEquipped: true
        },
        encounter: {
          activeId: action.payload?.encounterId ?? state.encounter.activeId,
          hp: action.payload?.encounterHp ?? state.encounter.hp
        }
      };
    }

    case 'ENCOUNTER_COMPLETED': {
      const rewardLoot = Number(action.payload?.rewardLoot ?? 0);
      const encounterId = action.payload?.encounterId;

      return {
        ...state,
        progress: {
          ...state.progress,
          introEncounterComplete:
            encounterId === 'intro_zombie' ? true : state.progress.introEncounterComplete
        },
        player: {
          ...state.player,
          loot: state.player.loot + rewardLoot
        },
        encounter: {
          activeId: null,
          hp: 0
        }
      };
    }

    case 'CLUE_DISCOVERED': {
      const clueKey = action.payload?.clueKey;
      const value = action.payload?.value;

      if (!clueKey) {
        return state;
      }

      return {
        ...state,
        clues: {
          ...state.clues,
          [clueKey]: value
        }
      };
    }

    case 'TERMINAL_UNLOCKED': {
      return {
        ...state,
        progress: {
          ...state.progress,
          terminalUnlocked: true
        }
      };
    }

    default:
      return state;
  }
}
