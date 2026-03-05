/**
 * DNA Splicing Puzzle System.
 * Simulates a lab equipment minigame where the player must align
 * DNA strand segments to synthesize an antivenom.
 *
 * The puzzle presents a target sequence and the player must select
 * the correct nucleotide fragments from a pool to match it.
 */

const NUCLEOTIDES = ['A', 'T', 'G', 'C'];

/**
 * Generate a random DNA sequence of a given length.
 */
function generateSequence(length) {
    return Array.from({ length }, () => NUCLEOTIDES[Math.floor(Math.random() * 4)]).join('');
}

/**
 * Generate fragment pool — includes the correct fragments plus decoys.
 */
function generateFragments(target, fragmentSize, decoyCount = 3) {
    const fragments = [];

    // Split target into correct fragments
    for (let i = 0; i < target.length; i += fragmentSize) {
        fragments.push({
            id: `frag_${i}`,
            sequence: target.slice(i, i + fragmentSize),
            isCorrect: true,
            position: i / fragmentSize
        });
    }

    // Add decoy fragments
    for (let i = 0; i < decoyCount; i++) {
        fragments.push({
            id: `decoy_${i}`,
            sequence: generateSequence(fragmentSize),
            isCorrect: false,
            position: -1
        });
    }

    // Shuffle
    for (let i = fragments.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fragments[i], fragments[j]] = [fragments[j], fragments[i]];
    }

    return fragments;
}

export function createDnaSplicingPuzzle(difficulty = 'normal') {
    const config = {
        easy: { sequenceLength: 8, fragmentSize: 4, decoys: 2, maxAttempts: 5 },
        normal: { sequenceLength: 12, fragmentSize: 4, decoys: 4, maxAttempts: 3 },
        hard: { sequenceLength: 16, fragmentSize: 4, decoys: 6, maxAttempts: 2 }
    };

    const { sequenceLength, fragmentSize, decoys, maxAttempts } = config[difficulty] ?? config.normal;

    const targetSequence = generateSequence(sequenceLength);
    const slotCount = Math.ceil(sequenceLength / fragmentSize);
    const fragments = generateFragments(targetSequence, fragmentSize, decoys);

    // Player's placed fragments (slot index → fragment id)
    const placed = new Array(slotCount).fill(null);
    let attempts = 0;
    let solved = false;

    return {
        getTargetSequence() { return targetSequence; },
        getFragments() { return fragments; },
        getSlotCount() { return slotCount; },
        getPlaced() { return [...placed]; },
        getAttemptsRemaining() { return maxAttempts - attempts; },
        isSolved() { return solved; },

        /**
         * Place a fragment into a slot.
         */
        placeFragment(slotIndex, fragmentId) {
            if (solved) return { ok: false, reason: 'ALREADY_SOLVED' };
            if (slotIndex < 0 || slotIndex >= slotCount) return { ok: false, reason: 'INVALID_SLOT' };

            // Remove fragment from any existing slot
            for (let i = 0; i < placed.length; i++) {
                if (placed[i] === fragmentId) placed[i] = null;
            }

            placed[slotIndex] = fragmentId;
            return { ok: true };
        },

        /**
         * Remove a fragment from a slot.
         */
        removeFragment(slotIndex) {
            if (slotIndex >= 0 && slotIndex < slotCount) {
                placed[slotIndex] = null;
            }
        },

        /**
         * Submit the current arrangement for validation.
         */
        submit() {
            if (solved) return { correct: true, reason: 'ALREADY_SOLVED' };

            attempts++;

            // Check if all slots are filled
            if (placed.some(slot => slot === null)) {
                return { correct: false, reason: 'INCOMPLETE', attemptsRemaining: maxAttempts - attempts };
            }

            // Check if the assembled sequence matches target
            const assembled = placed.map(fragId => {
                const frag = fragments.find(f => f.id === fragId);
                return frag ? frag.sequence : '';
            }).join('');

            if (assembled === targetSequence) {
                solved = true;
                return {
                    correct: true,
                    assembledSequence: assembled,
                    discoversClue: { clueKey: 'antivenomSynthesized', value: true }
                };
            }

            return {
                correct: false,
                reason: 'MISMATCH',
                assembledSequence: assembled,
                attemptsRemaining: maxAttempts - attempts,
                gameOver: attempts >= maxAttempts
            };
        },

        reset() {
            placed.fill(null);
            attempts = 0;
            solved = false;
        }
    };
}
