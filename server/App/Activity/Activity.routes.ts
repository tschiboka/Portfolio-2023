import express from 'express'
import { ApiResponder } from '@utils'
import { auth, admin } from '../Users/Users.middlewares'
import { ActivityService } from './Activity.service'
import type { GetActivityFeedReq, GetActivityFeedRes } from './Activity.types'

const router = express.Router()

// GET /api/activity/admin â€” the paginated, filterable cross-collection activity feed.
router.get('/admin', [auth, admin], async (req: GetActivityFeedReq, res: GetActivityFeedRes) => {
    const data = await ActivityService.feed(req.query)
    ApiResponder.ok(res, data)
})

export { router as ActivityRouter }
