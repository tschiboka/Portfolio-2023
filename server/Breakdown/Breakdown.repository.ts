import mongoose from 'mongoose'
import { BreakdownModel } from './Breakdown.model'
import type { BreakdownCountRow, CountByDateAndPathProps } from './Breakdown.types'

/**
 * Aggregates row counts by (date, path) from the raw `collection`, using `dateField` for the date key.
 * The returned shape is derived from `countField` (`rows as` cast — the raw driver yields `Document[]`).
 */
const aggregateCountsByDateAndPath = async <TCount extends string>({
    collection,
    dateField,
    countField,
}: CountByDateAndPathProps<TCount>): Promise<BreakdownCountRow<TCount>[]> => {
    const rows = await mongoose.connection
        .collection(collection)
        .aggregate([
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: dateField } },
                        path: '$path',
                    },
                    [countField]: { $sum: 1 },
                },
            },
        ])
        .toArray()
    return rows as BreakdownCountRow<TCount>[]
}

/** Data-access layer for daily breakdowns — raw-collection aggregation + bulk upserts. */
export const BreakdownRepository = {
    /** Aggregates visit counts by (date, path) from the raw `visits` collection. */
    aggregateVisits: () =>
        aggregateCountsByDateAndPath({
            collection: 'visits',
            dateField: '$visitDate',
            countField: 'visits',
        }),
    /** Aggregates like counts by (date, path) from the raw `likes` collection. */
    aggregateLikes: () =>
        aggregateCountsByDateAndPath({
            collection: 'likes',
            dateField: '$likeDate',
            countField: 'likes',
        }),
    /** Bulk-upserts breakdown documents, returning the number upserted or modified. */
    bulkUpsert: async (operations: Parameters<typeof BreakdownModel.bulkWrite>[0]) => {
        const result = await BreakdownModel.bulkWrite(operations)
        return result.upsertedCount + result.modifiedCount
    },
}
