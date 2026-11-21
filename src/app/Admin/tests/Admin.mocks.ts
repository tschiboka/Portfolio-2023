import { MockBuilder } from '@common-ux/Test'
import { TestMocks } from '@common-mocks'
import type { ErrorResponse } from '@common-utils'
import type { PostBackfillResponse, PostDailyBreakdownResponse } from '@common-types'

const backfill = MockBuilder<PostBackfillResponse>({ upserted: 3 })
const dailyBreakdown = MockBuilder<PostDailyBreakdownResponse>({ success: true, error: undefined })

export const AdminMocks = {
    backfill,
    dailyBreakdown,
    dailyBreakdownRejected: MockBuilder<ErrorResponse>({ message: TestMocks.message }),
    dailyBreakdownRejectedNoMessage: MockBuilder<ErrorResponse>({ message: undefined }),
    /** The response as the page prints it — the fragment a spec asserts on, beside its mock. */
    expected: {
        backfill: `"upserted": ${String(backfill.build().upserted)}`,
        dailyBreakdown: `"success": ${String(dailyBreakdown.build().success)}`,
    },
}
