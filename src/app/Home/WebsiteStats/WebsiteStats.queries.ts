/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
import { useQuery } from '@tanstack/react-query'
import type { GetActivityFeedQuery, GetActivityFeedResponse } from '@common-types'
import { AxiosError } from 'axios'
import { Paths, Query, QueryKey } from '@common-utils'
import { Session } from '@shared-context/SessionContext'

type UseGetActivityFeedProps = {
    params: GetActivityFeedQuery
}

export const useGetActivityFeed = ({ params }: UseGetActivityFeedProps) => {
    const token = Session.useContext().session?.token

    const request = new Query.RequestBuilder(Paths.Api.Activity)
        .setSubpath('admin')
        .setQuery(params)
        .withAuthToken(token)
        .build()

    return useQuery<GetActivityFeedResponse, AxiosError>({
        queryKey: QueryKey.ActivityFeed.byFilters(params).build(),
        queryFn: () => request.get<GetActivityFeedResponse>().then(Query.extractAxiosData),
    })
}
