/** Length/constraints for category fields — single source of truth for schema + validation. */
export const CategoryConstants = {
    fieldLimits: {
        name: { min: 1, max: 20 },
        description: { min: 10, max: 255 },
    },
} as const
