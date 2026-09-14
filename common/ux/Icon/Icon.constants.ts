export type IconName = 'chart' | 'eye' | 'heart'

/** Icon geometry + render defaults (each path string = one `<path>` `d`). */
export const IconConstants = {
    viewBox: '0 0 24 24',
    defaultSize: 16,
    strokeWidth: 2,
    fill: 'none',
    paths: {
        chart: ['M3 3v18h18', 'M7 16l4-8 4 4 4-6'],
        eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
        heart: [
            'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        ],
    },
} as const
