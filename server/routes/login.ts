import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateLogin } from '../models/login'
import { User } from '../models/user'
import { Settings } from '../models/setting'
import {
    ErrorResponse,
    PostLoginError,
    PostLoginRequest,
    PostLoginResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type PostLoginReq = TypedRequest<{ body: PostLoginRequest }>
type PostLoginRes = TypedResponse<PostLoginResponse | PostLoginError | ErrorResponse>

router.post('/', async (req: PostLoginReq, res: PostLoginRes) => {
    const { error } = validateLogin(req.body)
    if (error)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: error.details[0].message,
            error,
        })

    const user = await User.findOne({ email: req.body.email }) // TO-DO: Log failed login attempts
    if (!user)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Incorrect email or password',
        })

    const auth = await bcrypt.compare(req.body.password, user.password)
    if (!auth)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Incorrect email or password',
        })

    if (!process.env.JWT_PRIVATE_KEY)
        res.status(HttpStatus.NOT_FOUND).json({
            success: false,
            message: 'JWT private key is not defined',
        })
    const { _id, isAdmin } = user

    ;(user as any).password = undefined

    const settings = await Settings.find()
    const token = jwt.sign({ id: _id, isAdmin }, process.env.JWT_PRIVATE_KEY as string)

    res.status(HttpStatus.OK)
        .header('x-auth-token', token)
        .json({
            success: true,
            token,
            user: { ...user.toObject(), id: _id },
            settings,
        })
})

export default router
