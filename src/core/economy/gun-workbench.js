/**
 * Gun Workbench System.
 * Manages modular weapon customization — the player can swap parts,
 * add attachments, and maintain weapon condition.
 *
 * Each weapon is composed of modular "slots" (barrel, grip, sight, etc.)
 * that accept specific part types. Parts affect weapon stats.
 */

const WEAPON_SLOTS = ['barrel', 'grip', 'sight', 'magazine', 'muzzle'];

const PARTS_CATALOG = [
    // Barrels
    { id: 'barrel_standard', slot: 'barrel', name: 'Standard Barrel', stats: { accuracy: 0, damage: 0 } },
    { id: 'barrel_extended', slot: 'barrel', name: 'Extended Barrel', stats: { accuracy: 10, damage: 5 } },
    { id: 'barrel_short', slot: 'barrel', name: 'Short Barrel', stats: { accuracy: -5, damage: -2 } },
    // Grips
    { id: 'grip_standard', slot: 'grip', name: 'Standard Grip', stats: { stability: 0 } },
    { id: 'grip_ergonomic', slot: 'grip', name: 'Ergonomic Grip', stats: { stability: 15 } },
    // Sights
    { id: 'sight_iron', slot: 'sight', name: 'Iron Sights', stats: { accuracy: 0 } },
    { id: 'sight_red_dot', slot: 'sight', name: 'Red Dot Sight', stats: { accuracy: 12 } },
    { id: 'sight_scope', slot: 'sight', name: 'Tactical Scope', stats: { accuracy: 20, stability: -5 } },
    // Magazines
    { id: 'mag_standard', slot: 'magazine', name: 'Standard Magazine', stats: { capacity: 12 } },
    { id: 'mag_extended', slot: 'magazine', name: 'Extended Magazine', stats: { capacity: 20 } },
    // Muzzle
    { id: 'muzzle_none', slot: 'muzzle', name: 'No Muzzle Attachment', stats: {} },
    { id: 'muzzle_suppressor', slot: 'muzzle', name: 'Suppressor', stats: { noise: -30, damage: -3 } },
    { id: 'muzzle_brake', slot: 'muzzle', name: 'Muzzle Brake', stats: { stability: 10 } }
];

export function createGunWorkbench() {
    // Current weapon loadout: slot → partId
    const loadout = {
        barrel: 'barrel_standard',
        grip: 'grip_standard',
        sight: 'sight_iron',
        magazine: 'mag_standard',
        muzzle: 'muzzle_none'
    };

    // Weapon condition (0-100, degrades with use, improves with cleaning)
    let condition = 100;

    function getPartById(partId) {
        return PARTS_CATALOG.find(p => p.id === partId) ?? null;
    }

    return {
        getSlots() { return [...WEAPON_SLOTS]; },

        getLoadout() { return { ...loadout }; },

        getCondition() { return condition; },

        /**
         * Get the combined stats from all equipped parts.
         */
        getComputedStats() {
            const stats = { accuracy: 0, damage: 0, stability: 0, capacity: 12, noise: 0 };
            for (const slot of WEAPON_SLOTS) {
                const part = getPartById(loadout[slot]);
                if (part) {
                    for (const [key, value] of Object.entries(part.stats)) {
                        stats[key] = (stats[key] ?? 0) + value;
                    }
                }
            }
            // Apply condition penalty
            const conditionPenalty = (100 - condition) / 100;
            stats.accuracy = Math.round(stats.accuracy * (1 - conditionPenalty * 0.3));
            stats.stability = Math.round(stats.stability * (1 - conditionPenalty * 0.2));
            return stats;
        },

        /**
         * Get all parts available for a given slot.
         */
        getPartsForSlot(slot) {
            return PARTS_CATALOG.filter(p => p.slot === slot);
        },

        /**
         * Equip a part into its designated slot.
         */
        equipPart(partId) {
            const part = getPartById(partId);
            if (!part) return { ok: false, reason: 'PART_NOT_FOUND' };
            if (!WEAPON_SLOTS.includes(part.slot)) return { ok: false, reason: 'INVALID_SLOT' };

            const previousPart = loadout[part.slot];
            loadout[part.slot] = partId;

            return { ok: true, slot: part.slot, previousPart, newPart: partId };
        },

        /**
         * Clean the weapon, restoring condition.
         */
        clean() {
            const restored = Math.min(100, condition + 25);
            const delta = restored - condition;
            condition = restored;
            return { condition, restored: delta };
        },

        /**
         * Degrade condition (called after firing, encounters, etc.).
         */
        degrade(amount = 5) {
            condition = Math.max(0, condition - amount);
            return { condition };
        },

        /**
         * Full disassembly — resets all parts to defaults.
         */
        disassemble() {
            loadout.barrel = 'barrel_standard';
            loadout.grip = 'grip_standard';
            loadout.sight = 'sight_iron';
            loadout.magazine = 'mag_standard';
            loadout.muzzle = 'muzzle_none';
            return { ok: true, loadout: { ...loadout } };
        },

        getPartsCatalog() { return [...PARTS_CATALOG]; },

        reset() {
            this.disassemble();
            condition = 100;
        }
    };
}
