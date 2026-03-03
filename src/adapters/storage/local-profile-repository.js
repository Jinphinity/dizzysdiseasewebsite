import { createDefaultState } from '../../core/state/create-default-state.js';

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
      return {
        ...createDefaultState(),
        ...parsed,
        progress: {
          ...createDefaultState().progress,
          ...parsed.progress
        },
        player: {
          ...createDefaultState().player,
          ...parsed.player
        },
        clues: {
          ...createDefaultState().clues,
          ...parsed.clues
        },
        encounter: {
          ...createDefaultState().encounter,
          ...parsed.encounter
        },
        meta: {
          ...createDefaultState().meta,
          ...parsed.meta
        }
      };
    } catch {
      return null;
    }
  }

  async save(state) {
    this.storage.setItem(this.storageKey, JSON.stringify(state));
    return state;
  }
}
