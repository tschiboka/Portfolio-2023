import express from 'express'
import { ApiResponder } from '../../common/utils/Server'
import { ScheduleAuth } from './Schedule.auth'
import { ScheduleService } from './Schedule.service'
import type { PostDailyBreakdownReq, PostDailyBreakdownRes } from './Schedule.types'

const router = express.Router()

// POST /api/schedule/daily-breakdown — trigger the daily breakdown email (cron or admin).
router.post(
    '/daily-breakdown',
    [ScheduleAuth.cronOrAdmin],
    async (_req: PostDailyBreakdownReq, res: PostDailyBreakdownRes) => {
        const data = await ScheduleService.triggerDailyBreakdown()
        ApiResponder.created(res, data)
    },
)

export { router as ScheduleRouter }
