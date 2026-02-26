import express from 'express'
import { Resend } from 'resend'
import { Message, validateMessage } from '../models/message'
import {
    PostMessageError,
    PostMessageRequest,
    PostMessageResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

const router = express.Router()

type PostMessageReq = TypedRequest<{ body: PostMessageRequest }>
type PostMessageRes = TypedResponse<PostMessageResponse | PostMessageError>

router.post('/', async (req: PostMessageReq, res: PostMessageRes) => {
    const { name, email, phone, message } = req.body
    const { error } = validateMessage(req.body)

    if (error)
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            error: error.message,
        })

    // Save a New Message Entry in DB
    const messageEntry = new Message({
        name,
        email,
        phone: phone && phone.length > 0 ? phone : undefined,
        message,
    })

    await messageEntry.save()

    // Send Notification Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY

    try {
        const resend = new Resend(resendApiKey)
        const { error: emailError } = await resend.emails.send({
            from: 'noreply@tschiboka.com',
            to: ['tibi.aki.tivadar@gmail.com'],
            replyTo: email,
            subject: 'New Message | tschiboka.com',
            html: `
                <h1>You have a new message!</h1>
                <p>
                    From: ${name}
                    <br />
                    Email: ${email}
                    <br />
                    Phone: ${phone || 'N/A'}
                    <br />
                </p>
                <h2>Message</h2>
                <p>${message}</p>
                
                <a href="tschiboka.com">tschiboka.com</a>`,
        })

        if (emailError) {
            console.error('Failed to send notification email:', emailError)
        }
    } catch (err) {
        console.error('Failed to send notification email:', err)
    }

    return res.status(HttpStatus.CREATED).json({ success: true, message: 'Message Sent!' })
})

export default router
