import { useMutation, useQuery } from '@tanstack/react-query'
import type { ErrorResponse, GetCategoryResponse, PostCategoryRequest } from '@common-types'
import { Query, QueryKey } from '@common-utils'
import { Session } from '@shared-context'
import type { AxiosError } from 'axios'

/** Every category, for the parent selector and the table. */
const useGet = () => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Categories').token(token).build()

    return useQuery<{ data: GetCategoryResponse[] }, AxiosError<ErrorResponse>>(
        request.Get(QueryKey.Categories.build()),
    )
}

type UsePost = { onSuccess: () => void }

/** Creates a category. */
const usePost = ({ onSuccess }: UsePost) => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Categories').token(token).build()

    return useMutation<void, AxiosError<ErrorResponse>, PostCategoryRequest>({
        mutationKey: QueryKey.Categories.build(),
        ...request.Post({ onSuccess }),
    })
}

export const CategoriesQueries = {
    useGet,
    usePost,
}
