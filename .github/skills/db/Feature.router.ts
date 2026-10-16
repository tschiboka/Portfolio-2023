// @ts-nocheck — skill example, outside the tsconfig include.

// A lean reference only. `router` owns this file — mount, middleware order,
// guards, response shape. Shown here so a reader of `db` sees where the service
// is called from without loading that whole skill.
import express from 'express'
import { ApiResponder } from '@common-utils'
import { FeatureService } from './Feature.service'
import type { GetFeatureReq, GetFeatureRes, PostFeatureReq, PostFeatureRes } from './Feature.types'

const router = express.Router()

router.get('/', async (req: GetFeatureReq, res: GetFeatureRes) => {
    ApiResponder.ok(res, await FeatureService.list(req.user))
})

router.post('/', async (req: PostFeatureReq, res: PostFeatureRes) => {
    ApiResponder.created(res, await FeatureService.create(req.user, req.body))
})

export { router as FeatureRouter }
