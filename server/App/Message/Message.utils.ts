import { Resend } from 'resend'
import { ApiMessage } from '@utils'
import type { PostMessageRequest } from '../../../common/types'

/** Builds the owner-notification email HTML for a contact message. */
const notificationEmail = (
    input: Pick<PostMessageRequest, 'name' | 'email' | 'phone' | 'message'>,
): string => {
    const { name, email, phone, message } = input
    return `
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

        <a href="tschiboka.com">tschiboka.com</a>`
}

/** Sends a notification email to the site owner via Resend (best-effort, non-fatal on failure). */
export const sendNotificationEmail = async (
    input: Pick<PostMessageRequest, 'name' | 'email' | 'phone' | 'message'>,
): Promise<void> => {
    const { email } = input
    const resendApiKey = process.env.RESEND_API_KEY

    try {
        const resend = new Resend(resendApiKey)
        const { error } = await resend.emails.send({
            from: 'noreply@tschiboka.com',
            to: ['tibi.aki.tivadar@gmail.com'],
            replyTo: email,
            subject: 'New Message | tschiboka.com',
            html: notificationEmail(input),
        })
        if (error) {
            // TODO: [0004] - surface a mailbox/notification for failed notification emails.
            console.error(ApiMessage.failed('send notification email'), error)
        }
    } catch (err) {
        console.error(ApiMessage.failed('send notification email'), err)
    }
}
