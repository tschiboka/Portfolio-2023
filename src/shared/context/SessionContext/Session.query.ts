import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Query, QueryKey } from '@common-utils'
import type { ErrorResponse } from '@common-utils'
import type { GetSessionResponse } from '@common-types'

/** Rehydrates the current session's user and settings from a stored token. */
const useGet = (token?: string) =>
    useQuery<GetSessionResponse, AxiosError<ErrorResponse>>({
        ...Query.FeatureQuery()
            .path('RehydrateSession')
            .token(token)
            .build()
            .Get<GetSessionResponse>(QueryKey.RehydrateSession.build()),
        enabled: Boolean(token),
    })

export const SessionQueries = {
    useGet,
}
