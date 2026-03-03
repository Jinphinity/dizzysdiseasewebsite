import { buyItem as buyFromMerchant, sellItem as sellToMerchant } from '../core/economy/merchant.js';
import { attemptTerminalUnlock } from '../core/puzzle/terminal-unlock.js';
import { createDefaultState } from '../core/state/create-default-state.js';
import { gameReducer } from '../core/state/game-reducer.js';

function createNoopRepository() {
  return {
    async load() {
      return null;
    },
    async save() {
      return null;
    }
  };
}

export async function createGameEngine({ repository = createNoopRepository() } = {}) {
  let state = (await repository.load()) ?? createDefaultState();

  function persist() {
    // Fire-and-forget persistence keeps the core API synchronous for UI callers.
    void repository.save(state);
  }

  function dispatch(action) {
    state = gameReducer(state, action);
    persist();
    return state;
  }

  return {
    getState() {
      return state;
    },

    dispatch,

    viewRoute(route) {
      return dispatch({ type: 'ROUTE_VIEWED', payload: { route } });
    },

    pickupWeapon(payload) {
      return dispatch({ type: 'WEAPON_PICKED_UP', payload });
    },

    damageEncounter(payload) {
      return dispatch({ type: 'ENCOUNTER_DAMAGED', payload });
    },

    completeEncounter(payload) {
      return dispatch({ type: 'ENCOUNTER_COMPLETED', payload });
    },

    discoverClue(payload) {
      return dispatch({ type: 'CLUE_DISCOVERED', payload });
    },

    attemptTerminalUnlock(input) {
      const result = attemptTerminalUnlock(state, input);
      if (result.unlocked) {
        state = result.state;
        persist();
      }
      return result;
    },

    buyItem(item) {
      const result = buyFromMerchant({ state, item });
      if (result.ok) {
        state = result.state;
        persist();
      }
      return result;
    },

    sellItem(item) {
      const result = sellToMerchant({ state, item });
      if (result.ok) {
        state = result.state;
        persist();
      }
      return result;
    }
  };
}
