import { Resend } from 'resend'
import type { Breakdown, PathBreakdownItem, SectionData } from './Schedule.types'

export const renderHeader = () => `
    <div style="background:#111; color:#eee; padding:24px 20px; border-bottom:1px solid #333;">
        <h2 style="margin:0; font-size:1.53rem; font-weight:700; font-variant:small-caps;">
            <img src="https://tschiboka.com/assets/icons/icon-chart.svg" alt="" width="20" height="20" style="vertical-align:middle; margin-right:8px;" />Daily Breakdown Report
        </h2>
        <p style="margin:6px 0 0; opacity:0.7; font-size:0.74rem; color:#bbb;">
            Automated analytics summary
        </p>
    </div>
`

export const renderFooter = () => `
    <p style="margin-top:24px; font-size:0.58rem; color:#888; text-align:center; font-weight:300; font-family:'Fira Code',monospace;">
        tschiboka.com &bull; automated report system
    </p>
`

const renderRows = (today: PathBreakdownItem[], total: PathBreakdownItem[]) => {
    if (!today.length) {
        return `<tr><td colspan="3" style="padding:8px 0; color:#888; font-style:italic; font-weight:300;">No data today</td></tr>`
    }

    return today
        .map(
            (item) => `
            <tr>
                <td style="padding:8px 0; border-bottom:1px solid #222; color:#d8d8d8; font-weight:300;">${item.path}</td>
                <td style="text-align:right; padding:8px 0; border-bottom:1px solid #222; font-weight:700; color:#eee;">${item.count}</td>
                <td style="text-align:right; padding:8px 0; border-bottom:1px solid #222; color:#a8a8a8; font-weight:300;">${(total.find((t) => t.path === item.path) || { count: 0 }).count}</td>
                </td>
            </tr>
        `,
        )
        .join('')
}

export const renderSection = (title: string, data: SectionData) => {
    const iconUrl =
        title === 'Visits'
            ? 'https://tschiboka.com/assets/icons/icon-eye.svg'
            : 'https://tschiboka.com/assets/icons/icon-heart.svg'

    return `
    <h3 style="margin:0 0 12px; font-size:1.2rem; font-weight:700; color:#d8d8d8; font-variant:small-caps;">
        <img src="${iconUrl}" alt="" width="16" height="16" style="vertical-align:middle; margin-right:6px;" />${title}
    </h3>

    <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
        <tr>
            <td style="width:50%; padding:6px;">
                <div style="background:#222; border-radius:8px; border:1px solid #333; padding:12px; text-align:center;">
                    <div style="font-size:0.58rem; color:#a8a8a8; margin-bottom:2px; font-weight:300;">Today</div>
                    <div style="font-size:1.94rem; font-weight:700; line-height:1.1; color:#00ffff;">${data.todayCount}</div>
                </div>
            </td>
            <td style="width:16px; text-align:center;">&nbsp;</td>
            <td style="width:50%; padding:6px;">
                <div style="background:#222; border-radius:8px; border:1px solid #333; padding:12px; text-align:center;">
                    <div style="font-size:0.58rem; color:#a8a8a8; margin-bottom:2px; font-weight:300;">Total</div>
                    <div style="font-size:1.94rem; font-weight:700; line-height:1.1; color:#00ffff;">${data.totalCount}</div>
                </div>
            </td>
        </tr>
    </table>

    <table style="width:100%; font-size:0.74rem; border-collapse:collapse; color:#d8d8d8;">
        <thead>
            <tr style="text-align:left; color:#a8a8a8; font-variant:small-caps;">
                <th style="padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Path</th>
                <th style="text-align:right; padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Today</th>
                <th style="text-align:right; padding:8px 0; border-bottom:1px solid #333; font-weight:700;">Total</th>
            </tr>
        </thead>
        <tbody>
            ${renderRows(data.today, data.total)}
        </tbody>
    </table>
`
}

/** Branded email signature footer used in automated email templates. */
export const renderSignature = () => `
    <table style="width:100%; margin-top:24px; border-top:1px solid #333; padding-top:16px;">
        <tr>
            <td style="width:84px; vertical-align:top; text-align:center; padding:0; white-space:nowrap;">
                <img
                    src="https://tschiboka.com/assets/headshot_placeholder_grayscale.png"
                    alt="Tivadar Debnar"
                    width="56"
                    height="56"
                    style="border-radius:50%; display:inline-block; border:2px solid #333; box-shadow:2px 2px 4px rgba(0,0,0,0.6), -2px -2px 4px rgba(255,255,255,0.04), inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.4);"
                />
            </td>
            <td style="vertical-align:top; padding-left:12px; font-size:0.74rem; color:#a8a8a8; font-weight:300; line-height:1.5;">
                <div style="color:#007676; font-weight:700; font-size:0.83rem;">Tivadar Debnar</div>
                <div style="font-size:0.58rem; color:#888; line-height:1.3;">Frontend Developer <span style="font-size:0.52rem;">(BSc)</span></div>
                <div style="font-size:0.58rem; color:#888; font-style:italic; line-height:1.3;">London, UK &mdash; ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' })}</div>
                <div style="font-family:'Fira Code',monospace; font-size:0.5rem; line-height:1.6; margin-top:8px;">
                    <a href="https://tschiboka.com" style="color:#888; text-decoration:none; white-space:nowrap;">
                        <img src="https://tschiboka.com/assets/icons/icon-globe.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />tschiboka.com</a><br />
                    <a href="tel:+447474999334" style="color:#888; text-decoration:none; white-space:nowrap;">
                        <img src="https://tschiboka.com/assets/icons/icon-phone.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />+44 7474 999 334</a><br />
                    <a href="mailto:tibi.aki.tivadar@gmail.com" style="color:#888; text-decoration:none; white-space:nowrap;">
                        <img src="https://tschiboka.com/assets/icons/icon-email.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />tibi.aki.tivadar@gmail.com</a><br />
                    <br />
                    <a href="https://github.com/tschiboka" style="color:#888; text-decoration:none; margin-right:4px; display:inline-block;">
                        <img src="https://tschiboka.com/assets/icons/icon-github.svg" alt="" width="12" height="12" style="display:block;" />
                    </a>
                    <a href="https://www.linkedin.com/in/tivadar-debnar/" style="color:#888; text-decoration:none; margin-right:4px; display:inline-block;">
                        <img src="https://tschiboka.com/assets/icons/icon-linkedin.svg" alt="" width="12" height="12" style="display:block;" />
                    </a>
                    <a href="https://www.facebook.com/tschiboka/" style="color:#888; text-decoration:none; display:inline-block;">
                        <img src="https://tschiboka.com/assets/icons/icon-facebook.svg" alt="" width="12" height="12" style="display:block;" />
                    </a>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top:12px; border-top:1px solid #333; font-size:0.58rem; color:#888;">
                This is an automated email sent from a no-reply address.
                If you received this in error, please ignore this message. No action is required on your part.
            </td>
        </tr>
    </table>
`

/** Composes the full daily-breakdown report email HTML. */
export const createMessage = (breakdown: Breakdown) => `
    <div style="font-family:Roboto, Arial, Helvetica, sans-serif; font-weight:300; background:#111; padding:24px 12px; color:#eee;">
        <div style="max-width:600px; margin:0 auto; background:#0a0a0a; border-radius:10px; overflow:hidden; border:2px solid #222; box-shadow:10px 10px 30px rgba(0,0,0,0.7), -5px -5px 5px rgba(255,255,255,0.02), inset 10px 10px 20px black;">

            ${renderHeader()}

            <div style="padding:20px; background:#0a0a0a; color:#d8d8d8;">
                ${renderSection('Visits', breakdown.visits)}
                <hr style="margin:24px 0; border:none; border-top:1px solid #333;" />
                ${renderSection('Likes', breakdown.likes)}
                ${renderSignature()}
            </div>
        </div>
    </div>
`

/** Sends an email via Resend; throws when the API key is missing or the send fails. */
export const sendEmail = async (message: string) => {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) throw new Error('RESEND_API_KEY environment variable is not set')

    const resend = new Resend(resendApiKey)

    const { data, error } = await resend.emails.send({
        from: 'Tschiboka <no-reply@tschiboka.com>',
        to: ['tibi.aki.tivadar@gmail.com'],
        subject: 'Breakdown Report | tschiboka.com',
        html: message,
    })

    if (error) throw error
    return data
}
