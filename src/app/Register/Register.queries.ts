import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Query } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { PostUserRequest, PostUserResponse } from '@common-types'

type UsePostOptions = {
    onSuccess?: (response: PostUserResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

/** Registers a new user account. */
const usePost = ({ onSuccess, onError }: UsePostOptions = {}) => {
    const request = Query.FeatureQuery().path('RegisterUser').build()

    return useMutation<PostUserResponse, AxiosError<ErrorResponse>, PostUserRequest>({
        ...request.Post({ onSuccess, onError }),
    })
}

export const RegisterQueries = {
    usePost,
}
