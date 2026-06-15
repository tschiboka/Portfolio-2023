import { PostBackfillResponse, PostDailyBreakdownResponse } from '@common/types'
import { Paths, Query } from '@common/utils'

export const useAdminApi = () => {
    const scheduleRequest = new Query.RequestBuilder(Paths.Api.Schedule)
        .setSubpath('daily-breakdown')
        .withAuthToken()
        .build()

    const breakdownsRequest = new Query.RequestBuilder(Paths.Api.Breakdowns)
        .setSubpath('backfill')
        .withAuthToken()
        .build()

    return {
        triggerDailyBreakdown: () => scheduleRequest.post<PostDailyBreakdownResponse>(),
        triggerBackfill: () => breakdownsRequest.post<PostBackfillResponse>(),
    }
}
