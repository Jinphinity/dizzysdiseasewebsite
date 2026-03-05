/**
 * Gun Arm Tracking System (Metroid Prime style).
 * Calculates the constrained position and rotation of a first-person
 * weapon arm overlay based on the mouse cursor position within the viewport.
 *
 * The arm is tethered to a fixed anchor point (bottom-right by default)
 * and cannot track past the screen midpoint to maintain the illusion
 * of a fixed camera with local aim movement.
 */

const DEFAULT_CONFIG = {
    // Anchor point as percentage of viewport (0-1). Bottom-right corner.
    anchorX: 0.8,
    anchorY: 0.9,
    // Maximum tracking distance from anchor (as fraction of viewport dimension)
    maxTrackX: 0.35,
    maxTrackY: 0.35,
    // Lerp speed (0 = instant, higher = smoother but laggier)
    lerpFactor: 0.12,
    // Maximum rotation in degrees
    maxRotationDeg: 12
};

export function createGunArmTracker(config = {}) {
    const cfg = { ...DEFAULT_CONFIG, ...config };

    // Current smoothed position
    let currentX = cfg.anchorX;
    let currentY = cfg.anchorY;

    // Target position (raw mouse)
    let targetX = cfg.anchorX;
    let targetY = cfg.anchorY;

    let isVisible = false;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    return {
        /**
         * Update the mouse target position.
         * @param {number} mouseXNorm - Mouse X as 0-1 fraction of viewport
         * @param {number} mouseYNorm - Mouse Y as 0-1 fraction of viewport
         */
        setMousePosition(mouseXNorm, mouseYNorm) {
            // Clamp to the allowed tracking range from anchor
            targetX = clamp(
                mouseXNorm,
                cfg.anchorX - cfg.maxTrackX,
                cfg.anchorX + cfg.maxTrackX
            );
            targetY = clamp(
                mouseYNorm,
                cfg.anchorY - cfg.maxTrackY,
                cfg.anchorY + cfg.maxTrackY
            );

            // Enforce midpoint constraint — arm cannot go past center of screen
            targetX = clamp(targetX, 0.3, 1.0);
            targetY = clamp(targetY, 0.3, 1.0);
        },

        /**
         * Advance the smoothed position by one frame.
         * Call this in requestAnimationFrame.
         */
        tick() {
            currentX = lerp(currentX, targetX, cfg.lerpFactor);
            currentY = lerp(currentY, targetY, cfg.lerpFactor);
        },

        /**
         * Get the current CSS transform properties for the gun arm element.
         * Returns { left, top, rotation } ready to apply.
         */
        getTransform() {
            // Calculate rotation based on horizontal offset from anchor
            const offsetX = currentX - cfg.anchorX;
            const rotation = (offsetX / cfg.maxTrackX) * cfg.maxRotationDeg;

            return {
                left: `${(currentX * 100).toFixed(1)}%`,
                top: `${(currentY * 100).toFixed(1)}%`,
                rotation: `${rotation.toFixed(1)}deg`,
                // Raw values for hit detection
                normX: currentX,
                normY: currentY
            };
        },

        show() { isVisible = true; },
        hide() { isVisible = false; },
        isVisible() { return isVisible; },

        /** Reset to anchor position. */
        reset() {
            currentX = cfg.anchorX;
            currentY = cfg.anchorY;
            targetX = cfg.anchorX;
            targetY = cfg.anchorY;
            isVisible = false;
        }
    };
}
