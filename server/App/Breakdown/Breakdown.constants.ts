export const BreakdownConstants = {
    /** Bounds for bulk write batching — single source of truth for the backfill loop. */
    batchLimits: {
        /** Ops per bulkWrite — bounds a single write request. */
        size: 500,
        /** Mongo's hard cap on ops in one bulkWrite. */
        max: 100_000,
    },
    /** Length constraints for daily-breakdown fields — single source of truth for schema. */
    fieldLimits: {
        path: { min: 1, max: 100 },
    },
} as const
