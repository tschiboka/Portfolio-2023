import { Resend } from 'resend'
import { ApiResponder } from '@utils'

const appUrl = (): string =>
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://tschiboka.com'

/** Registration-email HTML prompting the user to confirm their account. */
const confirmationEmail = (token: string): string => `
    <h1>Confirm Registration</h1>
    <p>Please confirm your registration on Tschiboka App by clicking on the link below:</p>
    <p><a href="${appUrl()}/#/api/email-verification/${token}">
        <strong>Verify registration</strong>
    </a></p>`

/** Sends the registration confirmation email to `to`. */
export const sendConfirmationEmail = async (to: string, token: string): Promise<void> => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
        from: 'noreply@tschiboka.com',
        to: [to],
        replyTo: 'tibi.aki.tivadar@gmail.com',
        subject: 'Confirm Registration | tschiboka.com',
        html: confirmationEmail(token),
    })
    if (error) throw ApiResponder.internalServerError('Could not send verification email')
}
