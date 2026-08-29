import type { PostDailyBreakdownResponse } from '@common/types'
import { DateTime } from '../../common/utils/DateTime'
import { BreakdownModel } from '../Breakdown/Breakdown.model'
import { createMessage, sendEmail } from './Schedule.utils'
import type { Breakdown } from './Schedule.types'

/** Business logic for the daily-breakdown schedule — builds and sends the report email. */
export const ScheduleService = {
    /** Sends the daily breakdown email (cron-triggered). */
    triggerDailyBreakdown: async (): Promise<PostDailyBreakdownResponse> => {
        const today = DateTime.Format.to('ApiDate', new Date()) ?? ''

        const todayBreakdowns = await BreakdownModel.find({ date: today })
        const totalAggregated = await BreakdownModel.aggregate([
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
    },
}
