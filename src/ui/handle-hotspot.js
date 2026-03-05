import { getHotspotLockState } from '../application/hotspot-lock-state.js';
import { executeHotspotEffects } from '../application/execute-hotspot-effects.js';
import { getRoute } from '../content/routes.js';

/**
 * Handles hotspot button clicks — checks lock state, executes effects, and
 * returns the result for the main loop to act on.
 */
export function handleHotspotClick({
    hotspotId,
    routePath,
    engine,
    analytics,
    audio
}) {
    const route = getRoute(routePath);
    const hotspot = route.hotspots.find((item) => item.id === hotspotId);
    if (!hotspot) {
        return { handled: false, statusMessage: null, redirectTo: null, lockedHotspotId: null };
    }

    const lockState = getHotspotLockState({ state: engine.getState(), hotspot });
    if (lockState.locked) {
        audio.play('miss');
        return {
            handled: true,
            statusMessage: lockState.message,
            redirectTo: null,
            lockedHotspotId: hotspot.id,
            needsRender: true
        };
    }

    const effectResult = executeHotspotEffects({ engine, effects: hotspot.effects });
    analytics.track('hotspot_click', { route: routePath, hotspotId });

    return {
        handled: true,
        statusMessage: `Interaction complete: ${hotspot.label}.`,
        redirectTo: effectResult.redirectTo,
        lockedHotspotId: null,
        needsRender: true
    };
}
