/** Length/constraints for visit fields — single source of truth for schema + validation. */
export const VisitFieldLimits = {
    path: { min: 1, max: 100 },
} as const
