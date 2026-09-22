import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Query } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { PostMessageResponse } from '@common-types'
import { ContactTransformers } from './Contact.transformers'
import type { ContactFormData } from './Contact.types'

type UsePostOptions = {
    onSuccess?: (response: PostMessageResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

/** Sends a contact message to the API. */
const usePost = ({ onSuccess, onError }: UsePostOptions = {}) => {
    const request = new Query.RequestBuilder('Message').build()

    return useMutation<PostMessageResponse, AxiosError<ErrorResponse>, ContactFormData>({
        mutationFn: (data) =>
            request
                .post<PostMessageResponse>(ContactTransformers.Post(data))
                .then((res) => res.data),
        onSuccess,
        onError,
    })
}

export const ContactQueries = {
    usePost,
}
