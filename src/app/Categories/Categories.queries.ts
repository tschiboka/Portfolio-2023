import { useMutation, useQuery } from '@tanstack/react-query'
import { ErrorResponse, GetCategoryResponse, PostCategoryRequest } from '@common-types'
import { AxiosError } from 'axios'
import { Paths, Query, QueryKey } from '@common-utils'
import { Session } from '@shared-context/SessionContext'

type UsePostCategory = {
    onSuccess: () => void
}
export const usePostCategory = ({ onSuccess }: UsePostCategory) => {
    const token = Session.useContext().session?.token

    const request = new Query.RequestBuilder(Paths.Api.Categories).withAuthToken(token).build()
    return useMutation<void, AxiosError<ErrorResponse>, PostCategoryRequest>({
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
    const token = Session.useContext().session?.token

    const request = new Query.RequestBuilder(Paths.Api.Categories).withAuthToken(token).build()
    return useQuery<CategoriesGetResponse, AxiosError<ErrorResponse>>({
        queryKey: QueryKey.Categories.build(),
        queryFn: async (): Promise<CategoriesGetResponse> => {
            const res = await request.get<CategoriesGetResponse>()
            return res.data
        },
    })
}
