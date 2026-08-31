import express from 'express'
import { ApiResponder } from '@common-utils'
import { LikeService } from './Like.service'
import type { GetLikeReq, GetLikeRes, PostLikeReq, PostLikeRes } from './Like.types'

const router = express.Router()

// GET /api/like?path= â€” per-path count when `path` is given, otherwise the grouped summary.
router.get('/', async (req: GetLikeReq, res: GetLikeRes) => {
    const data = req.query.path
        ? await LikeService.countByPath(req.query.path)
        : await LikeService.summary()
    ApiResponder.ok(res, data)
})

// POST /api/like â€” record a like.
router.post('/', async (req: PostLikeReq, res: PostLikeRes) => {
    const data = await LikeService.create(req.body)
    ApiResponder.created(res, data)
})

export { router as LikeRouter }
