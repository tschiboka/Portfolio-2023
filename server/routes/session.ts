import express, { Request, Response } from 'express'
import auth from '../middlewares/auth'
import { User } from '../models/user'
import { Settings } from '../models/setting'

const router = express.Router()

router.get('/', [auth], async (req: Request, res: Response) => {
    const userId = (req as any).user.id
    const user = await User.findById(userId).select('-password')

    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    const settings = await Settings.findOne()
    res.status(200).json({
        success: true,
        data: {
            user: {
                id: user._id,
                ...user.toObject(),
            },
            settings,
        },
    })
})

export default router
