/**
 * State migration system.
 * When the state schema changes (new fields, renamed keys, etc.),
 * add a migration function from the old version to the new one.
 * LocalProfileRepository.load() calls migrateState() after parsing.
 */

const CURRENT_VERSION = 2;

const migrations = {
    // v1 → v2: No schema changes, just bumping version to enable the migration pipeline.
    // Future migrations go here, e.g.:
    // 2: (state) => ({ ...state, version: 3, someNewField: defaultValue })
};

export function migrateState(state) {
    if (!state || typeof state !== 'object') {
        return state;
    }

    let current = { ...state };
    let version = current.version ?? 1;

    while (version < CURRENT_VERSION) {
        const migrator = migrations[version];
        if (migrator) {
            current = migrator(current);
        }
        version++;
        current.version = version;
    }

    return current;
}

export { CURRENT_VERSION };
