// @ts-nocheck — skill example, outside the tsconfig include.

import express from 'express'
import { ApiResponder } from '@common-utils'
import { FeatureService } from './Feature.service'
import { FeatureAuth } from './Feature.auth'
import { auth, admin } from './Feature.middlewares'
import type {
    DeleteFeatureReq,
    DeleteFeatureRes,
    GetFeatureReq,
    GetFeatureRes,
    GetFeaturesReq,
    GetFeaturesRes,
    PatchFeatureReq,
    PatchFeatureRes,
    PostFeatureReq,
    PostFeatureRes,
} from './Feature.types'

const router = express.Router()

// GET /api/feature — list all (admin-facing).
router.get('/', [auth, admin], async (_req: GetFeaturesReq, res: GetFeaturesRes) => {
    const features = await FeatureService.list()
    ApiResponder.ok(res, { features })
})

// GET /api/feature/session — the current session's own record. A fixed path
// declared before `/:id`, or the id route swallows it.
router.get('/session', [auth], async (req: GetFeatureReq, res: GetFeatureRes) => {
    const current = await FeatureAuth.getCurrent(req)
    ApiResponder.ok(res, await FeatureService.get(current.id))
})

// GET /api/feature/:id — single by id.
router.get('/:id', [auth], async (req: GetFeatureReq, res: GetFeatureRes) => {
    const feature = await FeatureService.get(req.params.id)
    ApiResponder.ok(res, feature)
})

// POST /api/feature — create one.
router.post('/', [auth], async (req: PostFeatureReq, res: PostFeatureRes) => {
    const feature = await FeatureService.create(req.body)
    ApiResponder.created(res, feature)
})

// POST /api/feature/confirm — act on a token, no auth: the caller has no
// session yet, the token is the proof.
router.post('/confirm', async (req: PostFeatureReq, res: PostFeatureRes) => {
    const data = await FeatureService.confirm(req.body)
    ApiResponder.ok(res, data)
})

// PATCH /api/feature/:id — partial update.
router.patch('/:id', [auth], async (req: PatchFeatureReq, res: PatchFeatureRes) => {
    const feature = await FeatureService.update(req.params.id, req.body)
    ApiResponder.ok(res, feature)
})

// DELETE /api/feature/:id — remove one, then answer with no body.
router.delete('/:id', [auth], async (req: DeleteFeatureReq, res: DeleteFeatureRes) => {
    await FeatureService.remove(req.params.id)
    ApiResponder.created(res)
})

// GET /api/feature/export — a non-JSON body, for a caller that reads text.
router.get('/export', [auth], async (_req: GetFeaturesReq, res: GetFeaturesRes) => {
    ApiResponder.text(res, '<<<OK>>>')
})

export { router as FeatureRouter }
