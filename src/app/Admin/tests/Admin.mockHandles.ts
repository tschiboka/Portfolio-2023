import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { AdminMocks } from './Admin.mocks'

/** POST /api/breakdowns/backfill — succeeds with an upsert count. */
const postBackfill = RequestBuilder({
    path: '/api/breakdowns/backfill',
    method: HttpMethods.POST,
    response: AdminMocks.backfill,
})

export const AdminMockHandlers = {
    Backfill: {
        Post: postBackfill,
    },
    Defaults: [postBackfill],
}
