import { useMutation, useQuery } from '@tanstack/react-query'
import { GetCategoryResponse, PostCategoryRequest } from '@common/types'
import { useAPI } from '../../../../common/query'
import { AxiosError } from 'axios'
import { RequestError } from '../common/error'
import { ApiPaths } from '../../../../routing/apiPathBuilder'

type UsePostCategory = {
    onSuccess: () => void
}
export const usePostCategory = ({ onSuccess }: UsePostCategory) => {
    const { post } = useAPI()
    return useMutation<void, AxiosError<RequestError>, PostCategoryRequest>({
        mutationFn: async (payload: PostCategoryRequest) => {
            await post(ApiPaths.CATEGORIES, payload)
        },
        onSuccess,
    })
}

type CategoriesGetResponse = {
    data: GetCategoryResponse[]
}

export const useGetCategories = () => {
    const { get } = useAPI()
    return useQuery<CategoriesGetResponse, AxiosError<RequestError>>({
        queryKey: ['categories'],
        queryFn: async (): Promise<CategoriesGetResponse> => {
            const res = await get<CategoriesGetResponse>(ApiPaths.CATEGORIES)
            return res.data
        },
    })
}
