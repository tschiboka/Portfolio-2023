import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Query, QueryKey } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { PostTypistRoundResponse } from '@common-types'
import type { PostRoundRequest } from './Typist.types'

type UsePostProps = {
    onSuccess?: (response: PostTypistRoundResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}

/** Submits a completed round of keystrokes. */
const usePost = ({ onSuccess, onError }: UsePostProps = {}) => {
    const request = Query.FeatureQuery().path('Typist').group('Projects').subpath('/round').build()

    return useMutation<PostTypistRoundResponse, AxiosError<ErrorResponse>, PostRoundRequest>({
        mutationKey: QueryKey.TypistRound.build(),
        ...request.Post({ onSuccess, onError }),
    })
}

export const TypistQueries = {
    usePost,
}
