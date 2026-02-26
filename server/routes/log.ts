import express, { Request, Response } from 'express'
import auth from '../middlewares/auth'
import admin from '../middlewares/admin'
import { Log } from '../models/log'

const router = express.Router()

router.get('/', [auth, admin], async (req: Request, res: Response) => {
    if (Object.keys(req.query).length === 0) {
        const logs = await Log.find()
        return res.json({ table: logs, success: true })
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

    res.json({ log, total: await Log.count() })
})

router.delete('/:ids', [auth, admin], async (req: Request<{ ids: string }>, res: Response) => {
    const ids = req.params.ids.split(',')
    const result = await Log.deleteMany({ _id: { $in: ids } })
    res.send(result)
})

export default router
