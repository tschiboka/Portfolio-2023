/** The light canvas: the padding the border is walked on, its palette, and how it twinkles. */
export const XmasFormCanvasConstants = {
    /** How far the glows sit inside the container, so its edge does not clip them. */
    padding: { top: 20, side: 20, bottom: 10 },
    /** Radius of the outer glow and the highlight spot, as multiples of a light's size. */
    glowScale: 2,
    highlightOffsetScale: 0.3,
    highlightScale: 0.4,
    /** Each light twinkles a little faster than the one before, over a short cycle of speeds. */
    twinkle: { baseSpeed: 0.003, speedStep: 0.001, speedCycle: 3, amplitude: 0.3, floor: 0.7 },
    /** How hard the core and the highlight burn relative to the glowing light itself. */
    coreOpacity: 1.5,
    highlightOpacity: 0.8,
    /** Where a light's brightness starts — a band wide enough that no two pulse in step. */
    initialOpacity: { floor: 0.1, range: 0.9 },
    /** Red and green trade places this often. */
    colorCycleMs: 1000,
    palette: { red: '#ff0000', green: '#00ff00', highlight: '#ffffff' },
} as const
