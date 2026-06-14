import { Resend } from 'resend'
import { Like } from '../../../models/like'
import { Visit } from '../../../models/visit'
import { renderHeader, renderSection } from './breakdown.utils'
import { renderSignature } from '../signature'
import { Breakdown, PathBreakdownItem } from './breakdown.type'

export async function sendDailyBreakdown() {
    const todaysDate = new Date(getDateString())

    // Get Visit Statistics
    const totalVisits = await Visit.find()
    const todayVisits = await Visit.find({
        visitDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)),
        },
    })

    // Get Like Statistics
    const totalLikes = await Like.find()
    const todayLikes = await Like.find({
        likeDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)),
        },
    })

    // Build breakdown
    const breakdown: Breakdown = {
        visits: {
            today: getPathBreakdown(todayVisits),
            total: getPathBreakdown(totalVisits),
            todayCount: todayVisits.length,
            totalCount: totalVisits.length,
        },
        likes: {
            today: getPathBreakdown(todayLikes),
            total: getPathBreakdown(totalLikes),
            todayCount: todayLikes.length,
            totalCount: totalLikes.length,
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

const getPathBreakdown = (records: any[]): PathBreakdownItem[] => {
    if (!records) throw Error('Parameter missing')

    const breakdown: PathBreakdownItem[] = []
    const paths: string[] = []
    records.forEach((record: any) => {
        if (!record.path) return
        const path = record.path
        if (paths.indexOf(path) === -1) {
            paths.push(path)
            breakdown.push({ path, count: 0 })
        }
    })

    records.forEach((record: any) => {
        breakdown.forEach((breakdownItem: PathBreakdownItem) => {
            if (breakdownItem.path === record.path) breakdownItem.count++
        })
    })
    return breakdown.sort((a: PathBreakdownItem, b: PathBreakdownItem) => b.count - a.count)
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
