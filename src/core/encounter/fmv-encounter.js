/**
 * FMV (Full Motion Video) Encounter System.
 * Manages the lifecycle of video-based zombie encounters:
 *   1. APPROACH phase — attack video plays, player has a window to shoot
 *   2. KILL outcome — player shoots in time, cut to kill video
 *   3. DEATH outcome — video reaches the end, player dies
 */

export const FMV_PHASE = {
    IDLE: 'idle',
    APPROACH: 'approach',
    KILL: 'kill',
    DEATH: 'death'
};

export function createFmvEncounterManager() {
    let phase = FMV_PHASE.IDLE;
    let activeEncounterId = null;
    let shootWindowStart = 0;  // seconds into the attack video when shooting becomes valid
    let shootWindowEnd = 0;    // seconds when the window closes (bite happens)
    let onPhaseChange = null;

    return {
        getPhase() {
            return phase;
        },

        getActiveEncounterId() {
            return activeEncounterId;
        },

        /**
         * Start an FMV encounter.
         * @param {Object} config
         * @param {string} config.encounterId
         * @param {number} config.shootWindowStart - seconds into video when shooting opens
         * @param {number} config.shootWindowEnd   - seconds when video bites / death triggers
         * @param {Function} config.onPhaseChange  - callback(phase) for UI updates
         */
        start({ encounterId, shootWindowStart: start = 2, shootWindowEnd: end = 8, onPhaseChange: cb = null }) {
            activeEncounterId = encounterId;
            shootWindowStart = start;
            shootWindowEnd = end;
            onPhaseChange = cb;
            phase = FMV_PHASE.APPROACH;
            if (onPhaseChange) onPhaseChange(phase);
        },

        /**
         * Called by the UI when the attack video's timeupdate fires.
         * Checks if the video has reached the death threshold.
         */
        onVideoTimeUpdate(currentTime) {
            if (phase !== FMV_PHASE.APPROACH) return;

            if (currentTime >= shootWindowEnd) {
                phase = FMV_PHASE.DEATH;
                if (onPhaseChange) onPhaseChange(phase);
            }
        },

        /**
         * Called when the player clicks/shoots during the approach phase.
         * Returns { hit: true } if the shot lands within the shoot window.
         */
        attemptShot(currentVideoTime) {
            if (phase !== FMV_PHASE.APPROACH) {
                return { hit: false, reason: 'NOT_IN_APPROACH' };
            }

            if (currentVideoTime < shootWindowStart) {
                return { hit: false, reason: 'TOO_EARLY' };
            }

            if (currentVideoTime >= shootWindowEnd) {
                return { hit: false, reason: 'TOO_LATE' };
            }

            // Valid shot — transition to kill phase
            phase = FMV_PHASE.KILL;
            if (onPhaseChange) onPhaseChange(phase);
            return { hit: true };
        },

        /**
         * Reset the encounter back to idle.
         */
        reset() {
            phase = FMV_PHASE.IDLE;
            activeEncounterId = null;
            shootWindowStart = 0;
            shootWindowEnd = 0;
            onPhaseChange = null;
        }
    };
}
