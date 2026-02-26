import express, { Request, Response } from 'express'
import dailyEmail from '../scheduled/dailyEmail'

const route = express.Router()

route.post('/daily-breakdown', async (req: Request, res: Response) => {
    console.log('Send Scheduled Daily Breakdown Email...')
    const result = await dailyEmail()
    res.status(200).json(result)
})

export default route
