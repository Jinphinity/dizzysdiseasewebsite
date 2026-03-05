import { createDefaultState } from '../../core/state/create-default-state.js';
import { migrateState } from '../../core/state/migrate-state.js';

const STORAGE_KEY = 'dd_mvp_save_v1';

export class LocalProfileRepository {
  constructor(storage = window.localStorage, storageKey = STORAGE_KEY) {
    this.storage = storage;
    this.storageKey = storageKey;
  }

  async load() {
    const raw = this.storage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw);
      const defaults = createDefaultState();
      const merged = {
        ...defaults,
        ...parsed,
        progress: { ...defaults.progress, ...parsed.progress },
        player: { ...defaults.player, ...parsed.player },
        clues: { ...defaults.clues, ...parsed.clues },
        encounter: { ...defaults.encounter, ...parsed.encounter },
        meta: { ...defaults.meta, ...parsed.meta }
      };
      return migrateState(merged);
    } catch {
      return null;
    }
  }

  async save(state) {
    this.storage.setItem(this.storageKey, JSON.stringify(state));
    return state;
  }
}
