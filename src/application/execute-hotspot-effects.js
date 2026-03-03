export function executeHotspotEffects({ engine, effects = [] }) {
  let redirectTo = null;

  for (const effect of effects) {
    switch (effect.type) {
      case 'start_encounter':
        engine.pickupWeapon({ encounterId: effect.encounterId, encounterHp: effect.encounterHp });
        break;
      case 'discover_clue':
        engine.discoverClue({ clueKey: effect.clueKey, value: effect.value });
        break;
      case 'set_progress':
        engine.dispatch({
          type: 'SET_PROGRESS_FLAG',
          payload: { key: effect.key, value: effect.value }
        });
        break;
      case 'grant_loot':
        engine.dispatch({
          type: 'GRANT_LOOT',
          payload: { amount: effect.amount ?? 0 }
        });
        break;
      case 'navigate':
        redirectTo = effect.to;
        break;
      default:
        break;
    }
  }

  return {
    ok: true,
    redirectTo
  };
}
