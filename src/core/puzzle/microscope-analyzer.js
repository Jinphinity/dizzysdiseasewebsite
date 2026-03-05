/**
 * Microscope Sample Analysis System.
 * Simulates a lab microscope where the player examines mutant blood samples
 * to discover clues and unlock narrative progression.
 *
 * Each sample has visual "markers" the player must identify by clicking
 * on anomalous regions. Finding all markers in a sample completes the analysis.
 */

const SAMPLES = [
    {
        id: 'blood_sample_alpha',
        label: 'Blood Sample Alpha — Subject 7',
        description: 'A sample taken from the first breached containment subject.',
        // Marker regions as percentage coordinates within the microscope viewport
        markers: [
            { id: 'marker_1', x: 25, y: 40, radius: 8, label: 'Abnormal cell cluster', found: false },
            { id: 'marker_2', x: 65, y: 30, radius: 6, label: 'Neural virus particle', found: false },
            { id: 'marker_3', x: 45, y: 70, radius: 7, label: 'Mutated hemoglobin', found: false }
        ],
        discoversClue: { clueKey: 'bloodSampleAnalyzed', value: 'alpha' },
        zoomLevels: 3
    },
    {
        id: 'tissue_sample_beta',
        label: 'Tissue Sample Beta — Wing C Floor',
        description: 'Organic residue scraped from the floor of containment wing C.',
        markers: [
            { id: 'marker_4', x: 35, y: 55, radius: 10, label: 'Fungal growth pattern', found: false },
            { id: 'marker_5', x: 70, y: 45, radius: 5, label: 'Spore formation', found: false }
        ],
        discoversClue: { clueKey: 'tissueSampleAnalyzed', value: 'beta' },
        zoomLevels: 2
    }
];

export function createMicroscopeAnalyzer() {
    // Deep clone samples so each session is fresh
    let activeSamples = JSON.parse(JSON.stringify(SAMPLES));
    let currentSampleIndex = 0;
    let currentZoom = 1;
    let completedSamples = new Set();

    return {
        getCurrentSample() {
            return activeSamples[currentSampleIndex] ?? null;
        },

        getAllSamples() {
            return activeSamples.map(s => ({
                id: s.id,
                label: s.label,
                completed: completedSamples.has(s.id)
            }));
        },

        selectSample(sampleId) {
            const index = activeSamples.findIndex(s => s.id === sampleId);
            if (index >= 0) {
                currentSampleIndex = index;
                currentZoom = 1;
                return { ok: true, sample: activeSamples[index] };
            }
            return { ok: false, reason: 'SAMPLE_NOT_FOUND' };
        },

        getZoom() { return currentZoom; },

        zoomIn() {
            const sample = activeSamples[currentSampleIndex];
            if (sample && currentZoom < sample.zoomLevels) {
                currentZoom++;
            }
            return currentZoom;
        },

        zoomOut() {
            if (currentZoom > 1) currentZoom--;
            return currentZoom;
        },

        /**
         * Attempt to identify a marker at the given position.
         * @param {number} clickX - Click X as percentage (0-100) of the microscope viewport
         * @param {number} clickY - Click Y as percentage (0-100) of the microscope viewport
         */
        identifyMarker(clickX, clickY) {
            const sample = activeSamples[currentSampleIndex];
            if (!sample) return { found: false, reason: 'NO_SAMPLE' };

            for (const marker of sample.markers) {
                if (marker.found) continue;

                const dx = clickX - marker.x;
                const dy = clickY - marker.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Scale the effective radius by zoom level for easier identification
                const effectiveRadius = marker.radius * (1 + (currentZoom - 1) * 0.5);

                if (distance <= effectiveRadius) {
                    marker.found = true;

                    // Check if all markers in sample are found
                    const allFound = sample.markers.every(m => m.found);
                    if (allFound) {
                        completedSamples.add(sample.id);
                    }

                    return {
                        found: true,
                        marker: { id: marker.id, label: marker.label },
                        sampleComplete: allFound,
                        discoversClue: allFound ? sample.discoversClue : null
                    };
                }
            }

            return { found: false, reason: 'NO_MARKER_AT_POSITION' };
        },

        isSampleComplete(sampleId) {
            return completedSamples.has(sampleId);
        },

        reset() {
            activeSamples = JSON.parse(JSON.stringify(SAMPLES));
            currentSampleIndex = 0;
            currentZoom = 1;
            completedSamples = new Set();
        }
    };
}
