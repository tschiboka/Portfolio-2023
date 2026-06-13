/**
 * Scheduled Daily Breakdown Email
 *
 * Hosted on Render: https://portfolio-2023-nf5z.onrender.com
 * Triggered by cron-job.org (job ID 6251881)
 *   - URL: https://portfolio-2023-nf5z.onrender.com/api/schedule/daily-breakdown
 *   - Method: POST
 *   - Schedule: 23:59 daily (Europe/London)
 */

import express from 'express'
import dailyEmail from '../scheduled/dailyEmail'
import { PostDailyBreakdownResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../../common/utils/Server/HttpStatus'

const route = express.Router()

type PostDailyBreakdownReq = TypedRequest
type PostDailyBreakdownRes = TypedResponse<PostDailyBreakdownResponse>

route.post('/daily-breakdown', async (req: PostDailyBreakdownReq, res: PostDailyBreakdownRes) => {
    const result = await dailyEmail()
    res.status(HttpStatus.CREATED).json(result)
})

export default route
