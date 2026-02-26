import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { omit, assoc } from 'ramda'
import { Token } from '../models/token'
import { User } from '../models/user'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    // Find verification token
    const { token: verificationToken } = req.body
    const token = await Token.findOne({ token: verificationToken })
    if (!token)
        return res.status(404).json({
            success: false,
            message: 'Could not find verification token',
        })

    // Decode token
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    if (!JWT_PRIVATE_KEY) throw Error('Fatal error: JWT Private key is not defined!')
    const decoded = jwt.verify(token.token, JWT_PRIVATE_KEY)

    // Activate user
    const extractedUser = (omit as any)(['expires', 'iat'], decoded)
    const verifiedUser = assoc('verified', true)(extractedUser)
    const activeUser = assoc('active', true)(verifiedUser)

    // Check for duplicate user names and emails
    const userNameExists = await User.find({
        userName: (activeUser as any).userName,
    })
    if (userNameExists.length)
        return res.status(409).json({ success: false, message: 'User already registered' })
    const emalmailExists = await User.find({
        email: (activeUser as any).email,
    })
    if (emalmailExists.length)
        return res.status(409).json({ success: false, message: 'User already registered' })

    // Create user
    const user = await new User(activeUser)
    await user.save()
    res.status(200).json({ success: true, token })
})

export default router
