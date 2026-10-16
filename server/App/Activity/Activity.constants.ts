/** Pagination bounds for the activity feed. */
export const ActivityConstants = {
    feedLimits: {
        pageNumber: { min: 1 },
        pageSize: { min: 1, max: 100 },
    },
} as const
