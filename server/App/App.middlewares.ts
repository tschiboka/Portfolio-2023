import helmet from 'helmet'
import compression from 'compression'
import type { Request, Response, NextFunction } from 'express'
import { Application } from 'express'
import { DateTime } from '../../common/utils/DateTime'
import { LogModel } from '../Log/Log.model'
import { ApiError, ApiMessage, HttpStatus } from '../../common/utils/Server'

// Register process-level fatal handlers at startup, not per-request inside the middleware.
process.on('uncaughtException', (ex) => {
    throw ex
})

process.on('unhandledRejection', (ex) => {
    throw ex
})

/** Express middlewares for the application. */
export const AppMiddleware = {
    /** Central error middleware — logs the error, then emits its ApiError status/message, else 500. */
    error: async (err: Error, req: Request, res: Response, next: NextFunction) => {
        const { message, name, stack } = err
        const timestamp = DateTime.Format.to('DisplayTimeStamp', new Date()) ?? ''
        const log = new LogModel({ timestamp, name, message, stack })
        await log.save()

        console.error(err)

        if (err instanceof ApiError) return res.status(err.status).send({ message: err.message })
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: ApiMessage.internalServerError(),
        })
    },

    /** Production hardening (helmet) and response compression. */
    prod: (app: Application) => {
        app.use(helmet())
        app.use(compression())
    },
}
