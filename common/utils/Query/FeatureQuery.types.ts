import type { AxiosError } from 'axios'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { Dictionary } from '@common-utils'
import type { CacheKey } from './QueryKey'
import type { ErrorResponse } from './MergeStatus.types'
import type { PathKey, ServerGroup } from '../Paths/Path.types'

export type QueryOptions<TResponse> = Omit<
    UseQueryOptions<TResponse, AxiosError<ErrorResponse>>,
    'queryKey' | 'queryFn'
>

export type MutationOptions<TRequest, TResponse> = Omit<
    UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest>,
    'mutationFn'
>

/**
 * The chainable builder `FeatureQuery()` returns — every configuration step hands the same object
 * back, so a `.queries.ts` reads as one sentence until `build()`.
 */
export type FeatureQueryChainer = {
    path: (value: PathKey) => FeatureQueryChainer
    group: (value: ServerGroup) => FeatureQueryChainer
    subpath: (value: string) => FeatureQueryChainer
    token: (value?: string) => FeatureQueryChainer
    query: (value: Dictionary) => FeatureQueryChainer
    build: () => FeatureQueryBuilt
}

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
