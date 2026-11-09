import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import type { Nullable } from '../Generics'

export type ErrorResponse = { message?: string }

type QueryStatus<TError = unknown> = Omit<UseQueryResult<unknown, TError>, 'data'>
type MutationStatus<TError = unknown> = Omit<
    UseMutationResult<unknown, TError, unknown>,
    'data' | 'mutate' | 'mutateAsync'
>

export type ApiStatus<TError = unknown> = QueryStatus<TError> | MutationStatus<TError>

export type MergedApiStatus<TError = unknown> = {
    isLoading: boolean
    isError: boolean
    isPending: boolean
    isSuccess: boolean
    error: Nullable<TError>
}
