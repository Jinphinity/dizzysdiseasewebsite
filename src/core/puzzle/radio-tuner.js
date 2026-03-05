/**
 * Radio Frequency Tuning System.
 * Simulates a diegetic radio where the player tunes a frequency dial
 * to intercept broadcasts, lore transmissions, and puzzle clues.
 *
 * Each "station" has a target frequency and a reception tolerance.
 * When the player's tuned frequency falls within tolerance, the
 * station is "locked" and its content plays/displays.
 */

const STATIONS = [
    {
        id: 'emergency_broadcast',
        frequency: 91.5,
        tolerance: 0.3,
        label: 'Emergency Broadcast',
        type: 'lore',
        content: 'This is an automated emergency broadcast. Facility lockdown remains in effect. All personnel are advised to shelter in designated safe zones. Do not approach subjects exhibiting neural degradation symptoms.',
        discoversClue: null
    },
    {
        id: 'lab_report_alpha',
        frequency: 104.7,
        tolerance: 0.2,
        label: 'Lab Report Frequency',
        type: 'clue',
        content: 'Dr. Vasquez, log entry 47. The compound designated NV-013 shows accelerated mutation rates in all test subjects. The keyphrase for the containment terminal is... silent host. Repeat: silent host.',
        discoversClue: { clueKey: 'archiveKeyphrase', value: 'silent host' }
    },
    {
        id: 'numbers_station',
        frequency: 77.3,
        tolerance: 0.15,
        label: 'Numbers Station',
        type: 'puzzle',
        content: '7... 14... 23... 8... 19... The sequence repeats every thirty seconds. What are they counting?',
        discoversClue: { clueKey: 'numbersSequence', value: '7-14-23-8-19' }
    },
    {
        id: 'survivor_channel',
        frequency: 118.0,
        tolerance: 0.4,
        label: 'Survivor Channel',
        type: 'lore',
        content: '...anyone out there? We barricaded the east wing. The things in the basement... they learned how to open doors. If you can hear this, bring weapons. Bring everything.',
        discoversClue: null
    }
];

export function createRadioTuner() {
    let currentFrequency = 88.0;  // FM range start
    let lockedStation = null;

    const MIN_FREQ = 76.0;
    const MAX_FREQ = 120.0;

    function findStation(freq) {
        return STATIONS.find(s => Math.abs(s.frequency - freq) <= s.tolerance) ?? null;
    }

    /**
     * Compute signal strength as 0.0–1.0 (used for static noise level).
     * When tuned near a station, strength approaches 1 and static drops.
     */
    function getSignalStrength(freq) {
        let best = 0;
        for (const station of STATIONS) {
            const distance = Math.abs(station.frequency - freq);
            if (distance <= station.tolerance) {
                const strength = 1 - (distance / station.tolerance);
                if (strength > best) best = strength;
            }
        }
        return best;
    }

    return {
        getFrequency() {
            return currentFrequency;
        },

        getLockedStation() {
            return lockedStation;
        },

        getSignalStrength() {
            return getSignalStrength(currentFrequency);
        },

        getMinFreq() { return MIN_FREQ; },
        getMaxFreq() { return MAX_FREQ; },

        /**
         * Set the dial to a specific frequency.
         */
        tune(frequency) {
            currentFrequency = Math.max(MIN_FREQ, Math.min(MAX_FREQ, frequency));
            lockedStation = findStation(currentFrequency);
            return {
                frequency: currentFrequency,
                station: lockedStation,
                signalStrength: getSignalStrength(currentFrequency)
            };
        },

        /**
         * Nudge the frequency by a delta (for scroll wheel or button clicks).
         */
        nudge(delta) {
            return this.tune(currentFrequency + delta);
        },

        /**
         * Get all known stations (for a debug/cheat view or after discovery).
         */
        getAllStations() {
            return [...STATIONS];
        },

        reset() {
            currentFrequency = 88.0;
            lockedStation = null;
        }
    };
}
