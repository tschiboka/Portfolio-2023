import moment from 'moment'
import { Request, Response, NextFunction } from 'express'
import { Log } from '../models/log'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

export default async function (err: Error, req: Request, res: Response, next: NextFunction) {
    process.on('uncaughtException', (ex) => {
        throw ex
    })

    process.on('unhandledRejection', (ex) => {
        throw ex
    })

    const { message, name, stack } = err
    const timestamp = moment().format('ddd MMM DD YYYY HH:mm:ss')
    const error = {
        timestamp,
        name,
        message,
        stack,
    }

    const log = new Log(error)
    await log.save()

    console.log(err)

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Internal Server Error',
        error: err,
    })
}
