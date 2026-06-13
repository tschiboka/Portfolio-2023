import { useQuery, useMutation } from '@tanstack/react-query'
import {
    GetLikeResponse,
    GetLikeSummaryResponse,
    PostLikeRequest,
    PostLikeResponse,
} from '@common/types'
import { AxiosError } from 'axios'
import { Paths, Query, QueryKey } from '@common/utils'

export const useGetLikes = (path: string) => {
    const request = new Query.RequestBuilder(Paths.Api.Like).setQuery({ path }).build()

    return useQuery<GetLikeResponse, AxiosError>({
        queryKey: QueryKey.Likes.byFilters({ path }).build(),
        queryFn: async () => {
            const res = await request.get<GetLikeResponse>()
            return res.data
        },
        enabled: Boolean(path),
    })
}

export const useGetLikeSummary = () => {
    const request = new Query.RequestBuilder(Paths.Api.Like).build()

    return useQuery<GetLikeSummaryResponse, AxiosError>({
        queryKey: QueryKey.Likes.build(),
        queryFn: async () => {
            const res = await request.get<GetLikeSummaryResponse>()
            return res.data
        },
    })
}

export const usePostLike = () => {
    const request = new Query.RequestBuilder(Paths.Api.Like).build()

    return useMutation<
        PostLikeResponse,
        AxiosError<{ success: boolean; error: string }>,
        PostLikeRequest
    >({
        mutationFn: async (payload: PostLikeRequest) => {
            const res = await request.post<PostLikeResponse>(payload)
            return res.data
        },
    })
}
