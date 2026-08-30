/** Bounds for daily-breakdown bulk write batching — single source of truth for the backfill loop. */
export const BreakdownBatchLimits = {
    /** Ops per bulkWrite — bounds a single write request. */
    size: 500,
    /** Mongo's hard cap on ops in one bulkWrite. */
    max: 100_000,
} as const

/** Length constraints for daily-breakdown fields — single source of truth for schema + validation. */
export const BreakdownFieldLimits = {
    path: { min: 1, max: 100 },
} as const
