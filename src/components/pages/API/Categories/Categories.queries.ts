import { useMutation, useQuery } from '@tanstack/react-query'
import { GetCategoryResponse, PostCategoryRequest } from '@common/types'
import { AxiosError } from 'axios'
import { RequestError } from '../common/error'
import { useApi } from '@common/utils/Query/Query'
import { Paths, QueryKey } from '@common/utils'

type UsePostCategory = {
    onSuccess: () => void
}
export const usePostCategory = ({ onSuccess }: UsePostCategory) => {
    const api = useApi(Paths.Api.Categories).setToken().build()
    return useMutation<void, AxiosError<RequestError>, PostCategoryRequest>({
        mutationFn: async (payload: PostCategoryRequest) => {
            await api.post(payload)
        },
        onSuccess,
    })
}

type CategoriesGetResponse = {
    data: GetCategoryResponse[]
}

export const useGetCategories = () => {
    const api = useApi(Paths.Api.Categories).setToken().build()
    return useQuery<CategoriesGetResponse, AxiosError<RequestError>>({
        queryKey: QueryKey.Categories.build(),
        queryFn: async (): Promise<CategoriesGetResponse> => {
            const res = await api.get<CategoriesGetResponse>()
            return res.data
        },
    })
}
