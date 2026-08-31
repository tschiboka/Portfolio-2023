import { PostBackfillResponse, PostDailyBreakdownResponse } from '@common-types'
import { Paths, Query } from '@common-utils'
import { Session } from '@shared-context/SessionContext'

export const useAdminApi = () => {
    const token = Session.useContext().session?.token

    const scheduleRequest = new Query.RequestBuilder(Paths.Api.Schedule)
        .setSubpath('daily-breakdown')
        .withAuthToken(token)
        .build()

    const breakdownsRequest = new Query.RequestBuilder(Paths.Api.Breakdowns)
        .setSubpath('backfill')
        .withAuthToken(token)
        .build()

    return {
        triggerDailyBreakdown: () => scheduleRequest.post<PostDailyBreakdownResponse>(),
        triggerBackfill: () => breakdownsRequest.post<PostBackfillResponse>(),
    }
}
