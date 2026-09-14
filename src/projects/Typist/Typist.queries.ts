import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Query, QueryKey } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { Keystroke, PostTypistRoundResponse } from '@common-types'

type PostRoundRequest = { keystrokes: Keystroke[] }

type UsePostOptions = {
    onSuccess?: (response: PostTypistRoundResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

/** Submits a completed round of keystrokes. */
const usePost = ({ onSuccess, onError }: UsePostOptions = {}) => {
    const request = Query.FeatureQuery().path('Typist').group('Projects').build()

    return useMutation<PostTypistRoundResponse, AxiosError<ErrorResponse>, PostRoundRequest>({
        mutationKey: QueryKey.TypistRound.build(),
        ...request.Post({ onSuccess, onError }),
    })
}

export const TypistQueries = {
    usePost,
}
