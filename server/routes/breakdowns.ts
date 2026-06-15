import express from 'express'
import mongoose from 'mongoose'
import { DailyBreakdown } from '../models/dailyBreakdown'
import { PostBackfillResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../common/utils/Server/HttpStatus'
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'

const router = express.Router()

// ── Backfill ────────────────────────────────────────────────────────────
// Aggregates all existing Visit and Like records by (date, path) and
// upserts them into DailyBreakdown. Safe to call multiple times.

export async function backfillDailyBreakdown() {
    const visitAggregation = await mongoose.connection
        .collection('visits')
        .aggregate([
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$visitDate' } },
                        path: '$path',
                    },
                    visits: { $sum: 1 },
                },
            },
        ])
        .toArray()

    const likeAggregation = await mongoose.connection
        .collection('likes')
        .aggregate([
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$likeDate' } },
                        path: '$path',
                    },
                    likes: { $sum: 1 },
                },
            },
        ])
        .toArray()

    // Merge into a single map keyed by "date|path"
    const breakdownMap = new Map<string, { visits: number; likes: number }>()

    for (const item of visitAggregation) {
        const key = `${item._id.date}|${item._id.path}`
        breakdownMap.set(key, { visits: item.visits, likes: 0 })
    }

    for (const item of likeAggregation) {
        const key = `${item._id.date}|${item._id.path}`
        const existing = breakdownMap.get(key)
        if (existing) {
            existing.likes = item.likes
        } else {
            breakdownMap.set(key, { visits: 0, likes: item.likes })
        }
    }

    // Bulk upsert in batches of 500
    const BATCH_SIZE = 500
    let totalUpserted = 0
    const operations = Array.from(breakdownMap.entries()).map(([key, counts]) => {
        const [date, path] = key.split('|')
        return {
            updateOne: {
                filter: { date, path },
                update: { $set: { visits: counts.visits, likes: counts.likes } },
                upsert: true,
            },
        }
    })

    for (let i = 0; i < operations.length; i += BATCH_SIZE) {
        const result = await DailyBreakdown.bulkWrite(operations.slice(i, i + BATCH_SIZE))
        totalUpserted += result.upsertedCount + result.modifiedCount
    }

    return { upserted: totalUpserted }
}

type PostBackfillRes = TypedResponse<PostBackfillResponse>

router.post('/backfill', [auth, admin], async (_req: TypedRequest, res: PostBackfillRes) => {
    const result = await backfillDailyBreakdown()
    res.status(HttpStatus.OK).json({ success: true, upserted: result.upserted })
})

export default router
