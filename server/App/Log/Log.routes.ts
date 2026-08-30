import express from 'express'
import { ApiResponder } from '@utils'
import { isEmpty } from '@utils'
import { auth, admin } from '../Users/Users.middlewares'
import { LogService } from './Log.service'
import type { DeleteLogReq, DeleteLogRes, GetLogReq, GetLogRes } from './Log.types'

const router = express.Router()

// GET /api/log â€” full table when no query, else a paginated/sorted page.
router.get('/', [auth, admin], async (req: GetLogReq, res: GetLogRes) => {
    const data = isEmpty(req.query) ? await LogService.table() : await LogService.paged(req.query)
    ApiResponder.ok(res, data)
})

// DELETE /api/log/:ids â€” delete a comma-separated batch of logs.
router.delete('/:ids', [auth, admin], async (req: DeleteLogReq, res: DeleteLogRes) => {
    const ids = req.params.ids.split(',')
    const data = await LogService.remove(ids)
    ApiResponder.ok(res, data)
})

export { router as LogRouter }
