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
    const prev = state;
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
      const prev = state;
      dispatch({ type: 'ATTEMPT_TERMINAL_UNLOCK', payload: { input } });
      const unlocked = state.progress.terminalUnlocked && !prev.progress.terminalUnlocked;
      return {
        unlocked,
        reason: unlocked ? undefined : (state.clues?.archiveKeyphrase ? 'INCORRECT' : 'MISSING_CLUE'),
        state
      };
    },

    buyItem(item) {
      const prevLoot = state.player.loot;
      dispatch({ type: 'BUY_ITEM', payload: { item } });
      const ok = state.player.loot < prevLoot;
      return { ok, error: ok ? undefined : 'INSUFFICIENT_LOOT', state };
    },

    sellItem(item) {
      const prevLoot = state.player.loot;
      dispatch({ type: 'SELL_ITEM', payload: { item } });
      const ok = state.player.loot > prevLoot;
      return { ok, error: ok ? undefined : 'ITEM_NOT_OWNED', state };
    }
  };
}
