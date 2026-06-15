import { Resend } from 'resend'
import { DailyBreakdown } from '../../../models/dailyBreakdown'
import { renderHeader, renderSection } from './breakdown.utils'
import { renderSignature } from '../signature'
import { Breakdown } from './breakdown.type'

export async function sendDailyBreakdown() {
    const today = getDateString()

    const todayBreakdowns = await DailyBreakdown.find({ date: today })
    const totalAggregated = await DailyBreakdown.aggregate([
        {
            $group: {
                _id: '$path',
                visits: { $sum: '$visits' },
                likes: { $sum: '$likes' },
            },
        },
    ])

    const breakdown: Breakdown = {
        visits: {
            today: todayBreakdowns.map((b) => ({ path: b.path, count: b.visits })),
            total: totalAggregated.map((b) => ({ path: b._id, count: b.visits })),
            todayCount: todayBreakdowns.reduce((sum, b) => sum + b.visits, 0),
            totalCount: totalAggregated.reduce(
                (sum: number, b: { visits: number }) => sum + b.visits,
                0,
            ),
        },
        likes: {
            today: todayBreakdowns.map((b) => ({ path: b.path, count: b.likes })),
            total: totalAggregated.map((b) => ({ path: b._id, count: b.likes })),
            todayCount: todayBreakdowns.reduce((sum, b) => sum + b.likes, 0),
            totalCount: totalAggregated.reduce(
                (sum: number, b: { likes: number }) => sum + b.likes,
                0,
            ),
        },
    }

    const message = createMessage(breakdown)
    await sendEmail(message)
    return { success: true }
}

const getDateString = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const zeroPad = (num: number) => (num < 10 ? '0' + num : num)
    return `${year}-${zeroPad(month)}-${zeroPad(day)}`
}

const createMessage = (breakdown: Breakdown) => `
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

const sendEmail = async (message: string) => {
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
