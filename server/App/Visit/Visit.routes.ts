import express from 'express'
import { ApiResponder } from '@utils'
import { VisitService } from './Visit.service'
import type { GetVisitReq, GetVisitRes, PostVisitReq, PostVisitRes } from './Visit.types'

const router = express.Router()

// GET /api/visit?path= â€” per-path count when `path` is given, otherwise the grouped summary.
router.get('/', async (req: GetVisitReq, res: GetVisitRes) => {
    const data = req.query.path
        ? await VisitService.countByPath(req.query.path)
        : await VisitService.summary()
    ApiResponder.ok(res, data)
})

// POST /api/visit â€” record a visit.
router.post('/', async (req: PostVisitReq, res: PostVisitRes) => {
    const data = await VisitService.create(req.body)
    ApiResponder.created(res, data)
})

export { router as VisitRouter }
