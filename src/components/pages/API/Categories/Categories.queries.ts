import { useMutation, useQuery } from '@tanstack/react-query'
import { GetCategoryResponse, PostCategoryRequest } from '@common/types'
import { AxiosError } from 'axios'
import { RequestError } from '../common/error'
import { Paths, Query, QueryKey } from '@common/utils'

type UsePostCategory = {
    onSuccess: () => void
}
export const usePostCategory = ({ onSuccess }: UsePostCategory) => {
    const request = new Query.RequestBuilder(Paths.Api.Categories).withAuthToken().build()
    return useMutation<void, AxiosError<RequestError>, PostCategoryRequest>({
        mutationFn: async (payload: PostCategoryRequest) => {
            await request.post(payload)
        },
        onSuccess,
    })
}

type CategoriesGetResponse = {
    data: GetCategoryResponse[]
}

export const useGetCategories = () => {
    const request = new Query.RequestBuilder(Paths.Api.Categories).withAuthToken().build()
    return useQuery<CategoriesGetResponse, AxiosError<RequestError>>({
        queryKey: QueryKey.Categories.build(),
        queryFn: async (): Promise<CategoriesGetResponse> => {
            const res = await request.get<CategoriesGetResponse>()
            return res.data
        },
    })
}
