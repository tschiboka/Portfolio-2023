import express from 'express'
import auth from '../middlewares/auth'
import { User } from '../models/user'
import { Settings } from '../models/setting'
import { ErrorResponse, GetSessionResponse, TypedRequest, TypedResponse } from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetSessionReq = TypedRequest
type GetSessionRes = TypedResponse<GetSessionResponse | ErrorResponse>

router.get('/', [auth], async (req: GetSessionReq, res: GetSessionRes) => {
    const userId = (req as any).user.id
    const user = await User.findById(userId).select('-password')

    if (!user)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' })

    const settings = await Settings.findOne()
    if (!settings)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Settings not found' })

    res.status(HttpStatus.OK).json({
        success: true,
        data: {
            user: {
                ...user.toObject(),
                id: user._id,
            },
            settings,
        },
    })
})

export default router
