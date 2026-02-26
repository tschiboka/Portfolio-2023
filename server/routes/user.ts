import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import { User, validateUser, generateToken } from '../models/user'
import { Settings, HALF_AN_HOUR_IN_MS } from '../models/setting'
import { Token } from '../models/token'
import {
    ErrorResponse,
    GetUserResponse,
    GetUsersResponse,
    PostUserError,
    PostUserRequest,
    PostUserResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type GetUsersReq = TypedRequest
type GetUsersRes = TypedResponse<GetUsersResponse | ErrorResponse>

router.get('/', async (req: GetUsersReq, res: GetUsersRes) => {
    const users = await User.find()
    if (!users.length)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Content not Found' })
    res.status(HttpStatus.OK).json({ success: true, data: users.map((u) => u.toObject()) })
})

type GetUserReq = TypedRequest<{ params: { id: string } }>
type GetUserRes = TypedResponse<GetUserResponse | ErrorResponse>

router.get('/:id', async (req: GetUserReq, res: GetUserRes) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!valid)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid user id: ' + req.params.id,
        })

    const user = await User.findById(req.params.id)
    if (!user)
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ success: false, message: 'Content not Found' })
    res.status(HttpStatus.OK).json({ success: true, data: user.toObject() })
})

type PostUserReq = TypedRequest<{ body: PostUserRequest }>
type PostUserRes = TypedResponse<PostUserResponse | PostUserError | ErrorResponse>

router.post('/', async (req: PostUserReq, res: PostUserRes) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: error.details[0].message,
            error,
        })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    // Check for duplicate user names
    const duplicateUserName = await User.find({
        userName: req.body.userName,
    })
    if (duplicateUserName.length)
        return res
            .status(HttpStatus.CONFLICT)
            .json({ success: false, message: 'User name already in use' })

    // Check for duplicate email
    const duplicateEmail = await User.find({ email: req.body.email })
    if (duplicateEmail.length)
        return res
            .status(HttpStatus.CONFLICT)
            .json({ success: false, message: 'Email already in use' })

    // Get settings for session expiry duration and max users
    const settingErrorMsg = 'Could not find settings on database'
    const settings = await Settings.find()
    const setting = settings[0]
    if (!setting)
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: settingErrorMsg })

    // Add token expiration date
    const expiresErrorMsg = 'Invalid expiration time in settings'
    const { registrationTokensExpireInMs: expires, maxUsers } = setting
    const iat = Math.floor(Date.now() / 1000)
    if (expires === undefined || expires < HALF_AN_HOUR_IN_MS)
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: expiresErrorMsg })

    // Check app reached maximum number of users
    const users = await User.find()
    const maxUserMessage =
        'Registration failed: the application reached the maximum number of users'
    if (users.length >= maxUsers)
        return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: maxUserMessage })

    // Generate user token object
    const userToken = {
        expires: iat + expires,
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password,
        isAdmin: false,
        active: false,
        verified: false,
    }
    // Generate token string and persist
    const tokenString = generateToken(userToken)
    const token = new Token({ token: tokenString })
    await token.save()

    // Email configuration
    const emailContent = getEmailContent(tokenString)
    const from = 'noreply@tschiboka.com'
    const to = userToken.email
    const resendApiKey = process.env.RESEND_API_KEY

    try {
        // Initialize Resend
        const resend = new Resend(resendApiKey)
        const { data, error } = await resend.emails.send({
            from: from,
            to: [to],
            replyTo: 'tibi.aki.tivadar@gmail.com',
            subject: 'Confirm Registration | tschiboka.com',
            html: emailContent,
        })

        if (error) {
            console.error('Resend API error:', error)
            throw new Error(error.message || 'Email sending failed')
        }

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Confirmation email sent',
        })
    } catch (err: any) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Could not send verification email',
            error: err.message,
        })
    }
})

const getUrl = () =>
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://tschiboka.com'

const getEmailContent = (token: string) => `
    <h1>Confirm Registration</h1>
    <p>Please confirm your registration on Tschiboka App by clicking on the link below:</p>
    <p><a href="${getUrl()}/#/api/email-verification/${token}">
        <strong>Verify registration</strong>
    </a></p>`

export default router
