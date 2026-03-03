export function buyItem({ state, item }) {
  const cost = Number(item?.cost ?? 0);

  if (!item?.id) {
    return { ok: false, error: 'INVALID_ITEM', state };
  }

  if (state.player.loot < cost) {
    return { ok: false, error: 'INSUFFICIENT_LOOT', state };
  }

  return {
    ok: true,
    state: {
      ...state,
      player: {
        ...state.player,
        loot: state.player.loot - cost,
        inventory: [...state.player.inventory, item.id]
      }
    }
  };
}

export function sellItem({ state, item }) {
  if (!item?.id) {
    return { ok: false, error: 'INVALID_ITEM', state };
  }

  const index = state.player.inventory.indexOf(item.id);
  if (index === -1) {
    return { ok: false, error: 'ITEM_NOT_OWNED', state };
  }

  const nextInventory = [...state.player.inventory];
  nextInventory.splice(index, 1);

  return {
    ok: true,
    state: {
      ...state,
      player: {
        ...state.player,
        loot: state.player.loot + Number(item?.sell ?? 0),
        inventory: nextInventory
      }
    }
  };
}
