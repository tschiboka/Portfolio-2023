import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Query, QueryKey } from '@common-utils'
import { Session } from '@shared-context'
import type { GetActivityFeedQuery, GetActivityFeedResponse } from '@common-types'
import type { ErrorResponse } from '@common-utils'

type UseGetActivityFeedOptions = {
    params: GetActivityFeedQuery
}

/** Reads a page of the activity feed for the website stats table. */
const useGetActivityFeed = ({ params }: UseGetActivityFeedOptions) => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Activity').subpath('admin').token(token).build()

    return useQuery<GetActivityFeedResponse, AxiosError<ErrorResponse>>({
        ...request.Get<GetActivityFeedResponse>(QueryKey.ActivityFeed.byFilters(params).build()),
    })
}

export const WebsiteStatsQueries = {
    ActivityFeed: {
        useGet: useGetActivityFeed,
    },
}
