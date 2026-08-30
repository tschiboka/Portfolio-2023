import type { Document } from 'mongoose'
import type { PostBackfillResponse, TypedRequest, TypedResponse } from '../../../common/types'

/** Mongoose document shape for a daily visit/like breakdown (one per date+path). */
export interface IBreakdown extends Document {
    date: string
    path: string
    visits: number
    likes: number
}

/** One aggregation row: the (date, path) grouping key plus a count field. */
export type BreakdownCountRow<TCount extends string> = Record<TCount, number> & {
    _id: { date: string; path: string }
}

/** Configures a count-by-(date,path) aggregation: source collection, its date field, and the count field. */
export interface CountByDateAndPathProps<TCount extends string> {
    collection: string
    dateField: string
    countField: TCount
}

/** Per-(date,path) visit + like counts produced by the backfill merge. */
export interface BreakdownCounts {
    visits: number
    likes: number
}

/** One MongoDB bulk `updateOne` upsert operation in the backfill batch. */
export interface BreakdownBulkOperation {
    updateOne: {
        filter: { date: string; path: string }
        update: { $set: BreakdownCounts }
        upsert: true
    }
}

export type PostBackfillReq = TypedRequest
export type PostBackfillRes = TypedResponse<PostBackfillResponse>


