import type { Request, Response, NextFunction } from 'express'
import { auth, admin } from '../Users/Users.middlewares'

/** Auth helpers for the Schedule feature. */
export const ScheduleAuth = {
    /**
     * Auth gate for cron-or-admin endpoints: passes when the `x-cron-secret` header matches
     * `CRON_SECRET`, otherwise falls through to admin JWT auth. Lets both cron-job.org and the
     * Admin panel trigger the same endpoint.
     */
    cronOrAdmin: (req: Request, res: Response, next: NextFunction) => {
        const cronSecret = req.header('x-cron-secret')
        if (cronSecret && cronSecret === process.env.CRON_SECRET) {
            return next()
        }

        auth(req, res, () => admin(req, res, next))
    },
}
