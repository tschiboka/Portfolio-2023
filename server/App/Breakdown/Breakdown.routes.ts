import express from 'express'
import { ApiResponder } from '@common-utils'
import { auth, admin } from '../Users/Users.middlewares'
import { BreakdownService } from './Breakdown.service'
import type { PostBackfillReq, PostBackfillRes } from './Breakdown.types'

const router = express.Router()

// POST /api/breakdowns/backfill â€” rebuild the daily breakdown from raw visit/like records.
router.post('/backfill', [auth, admin], async (_req: PostBackfillReq, res: PostBackfillRes) => {
    const data = await BreakdownService.backfill()
    ApiResponder.ok(res, data)
})

export { router as BreakdownRouter }
