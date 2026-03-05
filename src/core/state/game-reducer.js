import { buyItem as executeBuy, sellItem as executeSell } from '../economy/merchant.js';
import { attemptTerminalUnlock as executeTerminalUnlock } from '../puzzle/terminal-unlock.js';

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

    case 'ENCOUNTER_DAMAGED': {
      const damage = Number(action.payload?.damage ?? 0);

      return {
        ...state,
        encounter: {
          ...state.encounter,
          hp: Math.max(0, state.encounter.hp - damage)
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

    case 'SET_PROGRESS_FLAG': {
      const key = action.payload?.key;
      if (!key) {
        return state;
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          [key]: action.payload?.value
        }
      };
    }

    case 'GRANT_LOOT': {
      const amount = Number(action.payload?.amount ?? 0);
      return {
        ...state,
        player: {
          ...state.player,
          loot: state.player.loot + amount
        }
      };
    }

    case 'ROUTE_VIEWED': {
      return {
        ...state,
        meta: {
          ...state.meta,
          lastSeenRoute: action.payload?.route ?? state.meta.lastSeenRoute
        }
      };
    }

    case 'BUY_ITEM': {
      const result = executeBuy({ state, item: action.payload?.item });
      return result.ok ? result.state : state;
    }

    case 'SELL_ITEM': {
      const result = executeSell({ state, item: action.payload?.item });
      return result.ok ? result.state : state;
    }

    case 'ATTEMPT_TERMINAL_UNLOCK': {
      const result = executeTerminalUnlock(state, action.payload?.input);
      return result.unlocked ? result.state : state;
    }

    default:
      return state;
  }
}
