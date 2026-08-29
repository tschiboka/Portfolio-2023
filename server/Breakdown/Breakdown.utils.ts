import type { BreakdownBulkOperation, BreakdownCountRow, BreakdownCounts } from './Breakdown.types'

/**
 * Merges the visit and like aggregation rows into one per-(date,path) counts map,
 * keyed by `"date|path"`. Pure — no side effects.
 */
export const mergeBreakdownCounts = (
    visitAggregation: BreakdownCountRow<'visits'>[],
    likeAggregation: BreakdownCountRow<'likes'>[],
): ReadonlyMap<string, BreakdownCounts> => {
    const counts = new Map<string, BreakdownCounts>()
    visitAggregation.forEach(({ _id, visits }) =>
        counts.set(`${_id.date}|${_id.path}`, { visits, likes: 0 }),
    )
    likeAggregation.forEach(({ _id, likes }) => {
        const key = `${_id.date}|${_id.path}`
        const existing = counts.get(key)
        counts.set(key, existing ? { ...existing, likes } : { visits: 0, likes })
    })
    return counts
}

/**
 * Builds the MongoDB bulk `updateOne`/upsert operations from per-(date,path) counts.
 * Pure — the returned operations are ready to pass to `DailyBreakdown.bulkWrite`.
 */
export const buildBreakdownOperations = (
    counts: ReadonlyMap<string, BreakdownCounts>,
): BreakdownBulkOperation[] =>
    Array.from(counts.entries()).map(([key, { visits, likes }]) => {
        const [date, path] = key.split('|')
        return {
            updateOne: {
                filter: { date, path },
                update: { $set: { visits, likes } },
                upsert: true,
            },
        }
    })
