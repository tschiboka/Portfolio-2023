import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { GetActivityFeedQuery, GetActivityFeedResponse } from '@common-types'
import { Query, QueryKey } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import { Session } from '@shared-context'

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
    useGet: useGetActivityFeed,
}
