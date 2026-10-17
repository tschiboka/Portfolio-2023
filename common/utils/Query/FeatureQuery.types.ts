import type { AxiosError } from 'axios'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { CacheKey } from './QueryKey'
import type { ErrorResponse } from './mergeStatus.types'

export type QueryOptions<TResponse> = Omit<
    UseQueryOptions<TResponse, AxiosError<ErrorResponse>>,
    'queryKey' | 'queryFn'
>

export type MutationOptions<TRequest, TResponse> = Omit<
    UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest>,
    'mutationFn'
>

/**
 * The built feature query. Each verb returns hook *options*, so the single
 * `useQuery` / `useMutation` call stays at the top of the component.
 */
export type FeatureQueryBuilt = {
    /** Query options for this request — pass to `useQuery`. */
    Get: <TResponse>(
        queryKey: CacheKey,
        options?: QueryOptions<TResponse>,
    ) => UseQueryOptions<TResponse, AxiosError<ErrorResponse>>
    Post: <TRequest extends object, TResponse = void>(
        options?: MutationOptions<TRequest, TResponse>,
    ) => UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest>
    Put: <TRequest extends object, TResponse = void>(
        options?: MutationOptions<TRequest, TResponse>,
    ) => UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest>
    Patch: <TRequest extends object, TResponse = void>(
        options?: MutationOptions<TRequest, TResponse>,
    ) => UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest>
    Delete: <TResponse = void>(
        options?: MutationOptions<void, TResponse>,
    ) => UseMutationOptions<TResponse, AxiosError<ErrorResponse>, void>
}
