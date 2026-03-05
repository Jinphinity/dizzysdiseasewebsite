/**
 * Cloud Profile Repository.
 * Implements the same load()/save() interface as LocalProfileRepository
 * but targets a remote backend (Supabase, Firebase, or custom API).
 *
 * For now this is a stub that falls back to localStorage if no endpoint
 * is configured, ensuring the app never breaks regardless of deployment state.
 */

import { createDefaultState } from '../../core/state/create-default-state.js';
import { migrateState } from '../../core/state/migrate-state.js';

const FALLBACK_KEY = 'dd_mvp_save_v1';

export class CloudProfileRepository {
    constructor({ apiEndpoint = '', sessionToken = '', storage = window.localStorage } = {}) {
        this.apiEndpoint = apiEndpoint;
        this.sessionToken = sessionToken;
        this.storage = storage;
    }

    async load() {
        // If we have a remote endpoint, try it first
        if (this.apiEndpoint) {
            try {
                const response = await fetch(`${this.apiEndpoint}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const parsed = await response.json();
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
                }
            } catch {
                // Fall through to local storage
            }
        }

        // Fallback: load from localStorage
        const raw = this.storage.getItem(FALLBACK_KEY);
        if (!raw) return null;

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
        // Always save locally first (instant, resilient)
        this.storage.setItem(FALLBACK_KEY, JSON.stringify(state));

        // Then attempt remote sync if configured
        if (this.apiEndpoint) {
            try {
                await fetch(`${this.apiEndpoint}/profile`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(state)
                });
            } catch {
                // Remote save failed silently — local save is the fallback
            }
        }

        return state;
    }
}
