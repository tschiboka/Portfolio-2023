import express from 'express'
import { Like, validateLike } from '../models/like'
import {
    GetLikeQuery,
    GetLikeSummaryResponse,
    GetLikeResponse,
    PostLikeRequest,
    PostLikeResponse,
    PostLikeError,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetLikeReq = TypedRequest<{ query: GetLikeQuery }>
type GetLikeRes = TypedResponse<GetLikeSummaryResponse | GetLikeResponse>
router.get('/', async (req: GetLikeReq, res: GetLikeRes) => {
    const path = req.query.path

    if (!path) {
        const likes = await Like.find()
        const groupedLikes: Record<string, number> = {}
        likes.forEach((like: any) => {
            if (!groupedLikes[like.path]) groupedLikes[like.path] = 1
            else groupedLikes[like.path] = groupedLikes[like.path] + 1
        })
        res.status(HttpStatus.OK).json({ success: true, likes: groupedLikes })
    } else {
        const likes = await Like.find({ path: path })
        res.status(HttpStatus.OK).json({ success: true, likes: likes.length })
    }
})

type PostLikeReq = TypedRequest<{ body: PostLikeRequest }>
type PostLikeRes = TypedResponse<PostLikeResponse | PostLikeError>
router.post('/', async (req: PostLikeReq, res: PostLikeRes) => {
    if (!req.body)
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: 'Bad Content' })

    const { error } = validateLike(req.body)
    if (error)
        return res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .json({ success: false, error: error.details[0].message })
    const like = new Like(req.body)

    await like.save()
    res.status(HttpStatus.CREATED).json({ success: true, like })
})

export default router
