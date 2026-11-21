import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { AdminMocks } from './Admin.mocks'

/** POST /api/schedule/daily-breakdown — succeeds with a success flag. */
const postDailyBreakdown = RequestBuilder({
    path: '/api/schedule/daily-breakdown',
    method: HttpMethods.POST,
    response: AdminMocks.dailyBreakdown,
})

/** POST /api/schedule/daily-breakdown — rejected with a server message. */
const postDailyBreakdownRejected = RequestBuilder({
    path: '/api/schedule/daily-breakdown',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: AdminMocks.dailyBreakdownRejected,
})

/** POST /api/schedule/daily-breakdown — rejected without a message of its own. */
const postDailyBreakdownRejectedNoMessage = RequestBuilder({
    path: '/api/schedule/daily-breakdown',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: AdminMocks.dailyBreakdownRejectedNoMessage,
})

/** POST /api/schedule/daily-breakdown — held open until the test releases it. */
const holdDailyBreakdown = () =>
    RequestBuilder({
        path: '/api/schedule/daily-breakdown',
        method: HttpMethods.POST,
        response: AdminMocks.dailyBreakdown,
        hold: true,
    })

/** POST /api/breakdowns/backfill — succeeds with an upsert count. */
const postBackfill = RequestBuilder({
    path: '/api/breakdowns/backfill',
    method: HttpMethods.POST,
    response: AdminMocks.backfill,
})

/** POST /api/breakdowns/backfill — held open until the test releases it. */
const holdBackfill = () =>
    RequestBuilder({
        path: '/api/breakdowns/backfill',
        method: HttpMethods.POST,
        response: AdminMocks.backfill,
        hold: true,
    })

export const AdminMockHandlers = {
    Backfill: {
        Hold: holdBackfill,
        Post: postBackfill,
    },
    DailyBreakdown: {
        Hold: holdDailyBreakdown,
        Post: postDailyBreakdown,
        PostRejected: postDailyBreakdownRejected,
        PostRejectedNoMessage: postDailyBreakdownRejectedNoMessage,
    },
    Defaults: [postDailyBreakdown, postBackfill],
}
