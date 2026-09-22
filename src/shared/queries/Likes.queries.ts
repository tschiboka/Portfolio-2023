import { useMutation, useQuery } from '@tanstack/react-query'
import {
    GetLikeResponse,
    GetLikeSummaryResponse,
    PostLikeRequest,
    PostLikeResponse,
} from '@common-types'
import { ErrorResponse, Query, QueryKey } from '@common-utils'
import { Session } from '@shared-context'
import type { AxiosError } from 'axios'

/** Registers a like against a page path. */
const usePostLike = () => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Like').token(token).build()

    return useMutation<PostLikeResponse, AxiosError<ErrorResponse>, PostLikeRequest>({
        mutationKey: QueryKey.Likes.build(),
        ...request.Post(),
    })
}

/** Reads the like count for one page path. */
const useGetLikes = (path: string) => {
    const request = Query.FeatureQuery().path('Like').query({ path }).build()

    return useQuery<GetLikeResponse, AxiosError<ErrorResponse>>({
        ...request.Get<GetLikeResponse>(QueryKey.Likes.byFilters({ path }).build()),
        enabled: Boolean(path),
    })
}

/** Reads like counts for every page, keyed by path. */
const useGetLikeSummary = () => {
    const request = Query.FeatureQuery().path('Like').build()

    return useQuery<GetLikeSummaryResponse, AxiosError<ErrorResponse>>(
        request.Get<GetLikeSummaryResponse>(QueryKey.Likes.build()),
    )
}

export const LikesQueries = {
    usePost: usePostLike,
    useGet: useGetLikes,
    Summary: {
        useGet: useGetLikeSummary,
    },
}
