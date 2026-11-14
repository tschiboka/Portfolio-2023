import { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Query, QueryKey } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { GetSettingsResponse, PostLoginRequest, PostLoginResponse } from '@common-types'

/** Reads the app settings that gate the login screen. */
const useGet = () =>
    useQuery<GetSettingsResponse, AxiosError<ErrorResponse>>({
        ...Query.FeatureQuery()
            .path('Settings')
            .build()
            .Get<GetSettingsResponse>(QueryKey.AppSettings.build()),
    })

type UsePostProps = {
    onSuccess?: (response: PostLoginResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
}
/** Logs a user in, reporting the outcome through the caller's handlers. */
const usePost = ({ onSuccess, onError }: UsePostProps = {}) => {
    const request = Query.FeatureQuery().path('Login').build()

    return useMutation<PostLoginResponse, AxiosError<ErrorResponse>, PostLoginRequest>({
        ...request.Post({ onSuccess, onError }),
    })
}

export const LoginQueries = {
    usePost,
    Settings: {
        useGet,
    },
}
