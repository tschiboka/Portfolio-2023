import { UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { Nullable } from '@common/utils'

type ErrorResponse = { message?: string }

type QueryStatus<TError = unknown> = Omit<UseQueryResult<unknown, TError>, 'data'>
type MutationStatus<TError = unknown> = Omit<
    UseMutationResult<unknown, TError, unknown>,
    'data' | 'mutate' | 'mutateAsync'
>
type ApiStatus<TError = unknown> = QueryStatus<TError> | MutationStatus<TError>

type MergedApiStatus<TError = unknown> = {
    isLoading: boolean
    isError: boolean
    isPending: boolean
    isSuccess: boolean
    error: Nullable<TError>
}

export const mergeApiStatuses = <TError = AxiosError<ErrorResponse>>(
    statuses: ApiStatus<TError>[],
): MergedApiStatus<TError> => {
    const isLoading = statuses.some((status) => 'isLoading' in status && status.isLoading)
    const isPending = statuses.some((status) => 'isPending' in status && status.isPending)
    const isError = statuses.some((status) => status.isError)
    const isSuccess = statuses.every((status) => status.isSuccess)
    const error = statuses.find((status) => status.error)?.error ?? null

    return {
        isLoading,
        isPending,
        isError,
        isSuccess,
        error,
    }
}
