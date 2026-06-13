import { useQuery, useMutation } from '@tanstack/react-query'
import { GetVisitResponse, GetVisitSummaryResponse, PostVisitResponse } from '@common/types'
import { AxiosError } from 'axios'
import { Paths, Query, QueryKey, Browser } from '@common/utils'

export const postVisit = async (path: string) => {
    if (Browser.isLocalhost()) return

    const request = new Query.RequestBuilder(Paths.Api.Visit).build()
    await request.post<PostVisitResponse>({ path })
}

export const usePostVisit = () =>
    useMutation<PostVisitResponse, AxiosError, { path: string }>({
        mutationFn: async ({ path }) => {
            await postVisit(path)
            return { success: true } as PostVisitResponse
        },
    })

export const useGetVisits = (path: string) => {
    const request = new Query.RequestBuilder(Paths.Api.Visit).setQuery({ path }).build()

    return useQuery<GetVisitResponse, AxiosError>({
        queryKey: QueryKey.Visits.byFilters({ path }).build(),
        queryFn: async () => {
            const res = await request.get<GetVisitResponse>()
            return res.data
        },
        enabled: Boolean(path),
    })
}

export const useGetVisitSummary = () => {
    const request = new Query.RequestBuilder(Paths.Api.Visit).build()

    return useQuery<GetVisitSummaryResponse, AxiosError>({
        queryKey: QueryKey.Visits.build(),
        queryFn: async () => {
            const res = await request.get<GetVisitSummaryResponse>()
            return res.data
        },
    })
}
