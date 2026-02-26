import express from 'express'
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'
import { Log } from '../models/log'
import {
    DeleteLogResponse,
    ErrorResponse,
    GetLogQuery,
    GetLogResponse,
    GetLogTableResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetLogReq = TypedRequest<{ query: GetLogQuery }>
type GetLogRes = TypedResponse<GetLogTableResponse | GetLogResponse>

router.get('/', [auth, admin], async (req: GetLogReq, res: GetLogRes) => {
    if (Object.keys(req.query).length === 0) {
        const logs = await Log.find()
        return res.status(HttpStatus.OK).json({ table: logs, success: true })
    }

    const { sortBy, page, select } = req.query
    const desc = req.query.desc === 'true'
    const limit = Number(req.query.limit)
    const sortString = `${desc ? '-' : ''}${sortBy === 'timestamp' ? '_id' : sortBy}`

    const log = await Log.find()
        .collation({ locale: 'en' })
        .sort(sortString)
        .skip(Number(page) * limit)
        .select(select as string)
        .limit(limit)

    res.status(HttpStatus.OK).json({ log, total: await Log.count() })
})

type DeleteLogReq = TypedRequest<{ params: { ids: string } }>
type DeleteLogRes = TypedResponse<DeleteLogResponse | ErrorResponse>

router.delete('/:ids', [auth, admin], async (req: DeleteLogReq, res: DeleteLogRes) => {
    const ids = req.params.ids.split(',')
    const result = await Log.deleteMany({ _id: { $in: ids } })
    res.status(HttpStatus.OK).send(result)
})

export default router
