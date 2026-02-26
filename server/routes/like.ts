import express, { Request, Response } from 'express'
import { Like, validateLike } from '../models/like'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const path = req.query.path

    if (!path) {
        const likes = await Like.find()
        const groupedLikes: Record<string, number> = {}
        likes.forEach((like: any) => {
            if (!groupedLikes[like.path]) groupedLikes[like.path] = 1
            else groupedLikes[like.path] = groupedLikes[like.path] + 1
        })
        res.status(200).json({ success: true, likes: groupedLikes })
    } else {
        const likes = await Like.find({ path: path })
        res.status(200).json({ success: true, likes: likes.length })
    }
})

router.post('/', async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ success: false, error: 'Bad Content' })

    const { error } = validateLike(req.body)
    if (error) return res.status(422).json({ success: false, error: error.details[0].message })
    const like = new Like(req.body)

    await like.save()
    res.status(200).json({ success: true, like })
})

export default router
