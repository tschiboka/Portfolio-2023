import type { PostBackfillResponse } from '../../../common/types'
import { chunk } from '@common-utils'
import { BreakdownRepository } from './Breakdown.repository'
import { BreakdownBatchLimits } from './Breakdown.constants'
import { BreakdownUtils } from './Breakdown.utils'

/**
 * Business logic for daily breakdowns - aggregates all existing visit and like records by
 * (date, path) and upserts them into the breakdown collection. Safe to call repeatedly.
 */
export const BreakdownService = {
    backfill: async (): Promise<PostBackfillResponse> => {
        const [visitAggregation, likeAggregation] = await Promise.all([
            BreakdownRepository.aggregateVisits(),
            BreakdownRepository.aggregateLikes(),
        ])

        const breakdownCounts = BreakdownUtils.MergeBreakdownCounts(
            visitAggregation,
            likeAggregation,
        )
        const operations = BreakdownUtils.BuildBreakdownOperations(breakdownCounts)

        const batches = chunk(operations, BreakdownBatchLimits.size)
        const totalUpserted = await batches.reduce(
            async (accumulator, batch) =>
                (await accumulator) + (await BreakdownRepository.bulkUpsert(batch)),
            Promise.resolve(0),
        )

        return { upserted: totalUpserted }
    },
}
