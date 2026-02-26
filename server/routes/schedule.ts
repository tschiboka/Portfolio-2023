import express from 'express'
import dailyEmail from '../scheduled/dailyEmail'
import { PostDailyBreakdownResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const route = express.Router()

type PostDailyBreakdownReq = TypedRequest
type PostDailyBreakdownRes = TypedResponse<PostDailyBreakdownResponse>

route.post('/daily-breakdown', async (req: PostDailyBreakdownReq, res: PostDailyBreakdownRes) => {
    console.log('Send Scheduled Daily Breakdown Email...')
    const result = await dailyEmail()
    res.status(HttpStatus.CREATED).json(result)
})

export default route
