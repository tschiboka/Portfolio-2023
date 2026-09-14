import { useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { detectIncognito } from 'detectincognitojs'
import { GetVisitResponse, GetVisitSummaryResponse, PostVisitResponse } from '@common-types'
import { AxiosError } from 'axios'
import { Browser, Query, QueryKey } from '@common-utils'

const postVisit = async (path: string): Promise<PostVisitResponse> => {
    const request = new Query.RequestBuilder('Visit').build()
    const res = await request.post<PostVisitResponse>({ path })
    return res.data
}

const usePostVisit = () =>
    useMutation<PostVisitResponse, AxiosError, { path: string }>({
        mutationFn: ({ path }) => postVisit(path),
    })

/**
 * Records a visit for the given path, once per change. Skips local development
 * and private browsing so local traffic and incognito sessions stay out of the stats.
 *
 * @example
 * useRecordVisit(location.pathname)
 */
const useRecordVisit = (path: string) => {
    const { mutate } = usePostVisit()

    useEffect(() => {
        if (!path || Browser.isLocalhost()) return

        void detectIncognito().then((result) => {
            if (!result.isPrivate) mutate({ path })
        })
    }, [path, mutate])
}

const useGetVisits = (path: string) => {
    const request = new Query.RequestBuilder('Visit').setQuery({ path }).build()

    return useQuery<GetVisitResponse, AxiosError>({
        queryKey: QueryKey.Visits.byFilters({ path }).build(),
        queryFn: async () => {
            const res = await request.get<GetVisitResponse>()
            return res.data
        },
        enabled: Boolean(path),
    })
}

const useGetVisitSummary = () => {
    const request = new Query.RequestBuilder('Visit').build()

    return useQuery<GetVisitSummaryResponse, AxiosError>({
        queryKey: QueryKey.Visits.build(),
        queryFn: async () => {
            const res = await request.get<GetVisitSummaryResponse>()
            return res.data
        },
    })
}

export const VisitsQueries = {
    usePost: usePostVisit,
    useGet: useGetVisits,
    useRecord: useRecordVisit,
    Summary: {
        useGet: useGetVisitSummary,
    },
}
