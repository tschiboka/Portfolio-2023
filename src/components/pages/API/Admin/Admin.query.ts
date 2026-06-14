import { PostDailyBreakdownResponse } from '@common/types'
import { Paths, Query } from '@common/utils'

export const useAdminApi = () => {
    const scheduleRequest = new Query.RequestBuilder(Paths.Api.Schedule)
        .setSubpath('daily-breakdown')
        .build()

    return {
        triggerDailyBreakdown: () => scheduleRequest.post<PostDailyBreakdownResponse>(),
    }
}
