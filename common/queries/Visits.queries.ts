import { useQuery, useMutation } from '@tanstack/react-query'
import { GetVisitResponse, GetVisitSummaryResponse, PostVisitResponse } from '@types'
import { AxiosError } from 'axios'
import { Paths, Query, QueryKey } from '@utils'

export const postVisit = async (path: string): Promise<PostVisitResponse> => {
    const request = new Query.RequestBuilder(Paths.Api.Visit).build()
    const res = await request.post<PostVisitResponse>({ path })
    return res.data
}

export const usePostVisit = () =>
    useMutation<PostVisitResponse, AxiosError, { path: string }>({
        mutationFn: ({ path }) => postVisit(path),
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
