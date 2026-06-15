import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../../common/utils/Server/HttpStatus'
import auth from './auth'
import admin from './admin'

/**
 * Middleware that checks for a CRON_SECRET header (x-cron-secret)
 * OR a valid admin JWT (x-auth-token). This allows both cron-job.org
 * and the Admin panel to trigger the same endpoint.
 */
export default function cronOrAdminAuth(req: Request, res: Response, next: NextFunction) {
    // Allow access if the cron secret matches
    const cronSecret = req.header('x-cron-secret')
    if (cronSecret && cronSecret === process.env.CRON_SECRET) {
        return next()
    }

    // Fall through to JWT auth + admin check
    auth(req, res, () => admin(req, res, next))
}
