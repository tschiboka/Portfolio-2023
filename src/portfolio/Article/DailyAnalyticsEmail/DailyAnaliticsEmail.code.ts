const codeSnippets = {
    cronAuthValidation: `if (req.header('X-Cron-Secret') !== process.env.CRON_SECRET) {
    return res.status(401).json({ success: false })
}`,

    routeEndpoint: `route.post(
    '/daily-breakdown',
    [cronOrAdminAuth],
    async (_req, res) => {
        const result = await sendDailyBreakdown()
        res.status(HttpStatus.CREATED).json(result)
    },
)`,

    sendWithResend: `import { Resend } from 'resend'

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
}`,

    silentFail: `// ❌ Bad: helper returns error instead of throwing
try {
    ...
} catch (error) {
    return error  // caller never sees the failure
}

// Caller always thinks it succeeded
try {
    await sendEmail()          // never throws
    return { success: true }   // always reached
} catch {
    // never executed
}`,

    throwInstead: `// ✅ Good: throw on failure, let caller decide
if (error) throw error
return data`,

    breakdownFunction: `export async function sendDailyBreakdown() {
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
            totalCount: totalAggregated.reduce((sum, b) => sum + b.visits, 0),
        },
        likes: {
            today: todayBreakdowns.map((b) => ({ path: b.path, count: b.likes })),
            total: totalAggregated.map((b) => ({ path: b._id, count: b.likes })),
            todayCount: todayBreakdowns.reduce((sum, b) => sum + b.likes, 0),
            totalCount: totalAggregated.reduce((sum, b) => sum + b.likes, 0),
        },
    }

    const message = createMessage(breakdown)
    await sendEmail(message)
    return { success: true }
}`,

    inefficientQuery: `// ❌ Loads everything — fine for portfolios, bad at scale
const visits = await Visit.find()

// ✅ Push aggregation to the database
Visit.aggregate([...])
Visit.countDocuments(...)`,

    warmUpStrategy: `// 23:50 — Wake the service
GET /health

// 23:55 — Perform the work
POST /api/schedule/daily-breakdown`,
}

export default codeSnippets
