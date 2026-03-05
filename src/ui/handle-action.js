import { getMerchantItem } from '../content/merchant-catalog.js';

/**
 * Handles UI action button clicks (toggle-inventory, toggle-terminal, buy, sell, etc.).
 * Returns { handled, statusMessage } — if handled is false, the click should
 * fall through to hotspot or viewport handling.
 */
export function handleAction({ action, target, engine, audio, analytics, routePath }) {
    switch (action) {
        case 'toggle-inventory': {
            const overlay = document.getElementById('inventory-overlay');
            const backdrop = document.getElementById('inventory-backdrop');
            if (overlay) overlay.classList.toggle('is-open');
            if (backdrop) backdrop.classList.toggle('is-open');
            return { handled: true, statusMessage: null, needsRender: false };
        }

        case 'toggle-terminal': {
            const terminal = document.getElementById('retro-os-screen');
            const viewport = document.querySelector('.viewport');
            if (terminal) terminal.classList.toggle('is-open');
            if (viewport) viewport.classList.toggle('is-terminal-mode');
            return { handled: true, statusMessage: null, needsRender: false };
        }

        case 'toggle-mute': {
            audio.toggleMute();
            return {
                handled: true,
                statusMessage: audio.isMuted() ? 'Audio muted.' : 'Audio enabled.',
                needsRender: true
            };
        }

        case 'reset-save': {
            window.localStorage.clear();
            window.location.reload();
            return { handled: true, statusMessage: null, needsRender: false };
        }

        case 'buy': {
            const item = getMerchantItem(target.dataset.itemId);
            if (!item) {
                return { handled: true, statusMessage: null, needsRender: false };
            }
            const result = engine.buyItem(item);
            if (result.ok) {
                analytics.track('merchant_buy', { itemId: item.id, cost: item.cost });
                return { handled: true, statusMessage: `Purchased ${item.name} for ${item.cost} loot.`, needsRender: true };
            }
            return { handled: true, statusMessage: 'Purchase failed: insufficient loot.', needsRender: true };
        }

        case 'sell': {
            const item = getMerchantItem(target.dataset.itemId);
            if (!item) {
                return { handled: true, statusMessage: null, needsRender: false };
            }
            const result = engine.sellItem(item);
            if (result.ok) {
                analytics.track('merchant_sell', { itemId: item.id, sell: item.sell });
                return { handled: true, statusMessage: `Sold ${item.name} for ${item.sell} loot.`, needsRender: true };
            }
            return { handled: true, statusMessage: 'Sell failed: item not in inventory.', needsRender: true };
        }

        case 'tune-radio': {
            const freq = parseFloat(target.dataset.frequency);
            if (isNaN(freq)) return { handled: true, statusMessage: null, needsRender: false };
            engine.dispatch({ type: 'RADIO_TUNED', payload: { frequency: freq } });
            return { handled: true, statusMessage: `Frequency set to ${freq.toFixed(1)} MHz`, needsRender: true };
        }

        case 'equip-part': {
            const partId = target.dataset.partId;
            engine.dispatch({ type: 'WORKBENCH_PART_EQUIPPED', payload: { partId } });
            return { handled: true, statusMessage: 'Weapon component updated.', needsRender: true };
        }

        case 'clean-weapon': {
            engine.dispatch({ type: 'WORKBENCH_CLEAN_WEAPON' });
            return { handled: true, statusMessage: 'Weapon maintained and cleaned.', needsRender: true };
        }

        case 'disassemble-weapon': {
            engine.dispatch({ type: 'WORKBENCH_DISASSEMBLE' });
            return { handled: true, statusMessage: 'Weapon stripped to base components.', needsRender: true };
        }

        default:
            return { handled: false, statusMessage: null, needsRender: false };
    }
}
