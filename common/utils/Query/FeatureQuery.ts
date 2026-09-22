import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { RequestBuilder } from './Query'
import { extractAxiosData } from './extractAxiosData'
import type { PathKey } from '../Paths/Path.types'
import type { ServerGroup } from '../Paths/Path.types'
import type { CacheKey } from './Key'
import type { ErrorResponse } from './mergeStatus'

type QueryOptions<TResponse> = Omit<
    UseQueryOptions<TResponse, AxiosError<ErrorResponse>>,
    'queryKey' | 'queryFn'
>

type MutationOptions<TRequest, TResponse> = Omit<
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

/**
 * Chainable builder for a feature's `.queries.ts` — configures the request and
 * hands back verb factories whose output feeds `useQuery` / `useMutation`.
 *
 * @example
 * const categories = FeatureQuery().path(Paths.Api.Categories).token(token).build()
 * const { data } = useQuery(categories.Get(QueryKey.Categories.build()))
 * const { mutate } = useMutation(categories.Post({ onSuccess }))
 */
export const FeatureQuery = () => {
    let path: PathKey | undefined
    let group: ServerGroup = 'Api'
    let subpath: string | undefined
    let token: string | undefined
    let query: Record<string, unknown> = {}

    const buildRequest = () =>
        new RequestBuilder(path!, group)
            .setSubpath(subpath ?? '')
            .withAuthToken(token)
            .setQuery(query)
            .build()

    const mutation =
        <TRequest extends object, TResponse>(verb: 'post' | 'put' | 'patch') =>
        (
            options?: MutationOptions<TRequest, TResponse>,
        ): UseMutationOptions<TResponse, AxiosError<ErrorResponse>, TRequest> => ({
            mutationFn: (payload) =>
                buildRequest()[verb]<TResponse>(payload).then(extractAxiosData),
            ...options,
        })

    const featureQuery = {
        path(value: PathKey) {
            path = value
            return featureQuery
        },
        group(value: ServerGroup) {
            group = value
            return featureQuery
        },
        subpath(value: string) {
            subpath = value
            return featureQuery
        },
        token(value?: string) {
            token = value
            return featureQuery
        },
        /**
         * Sets the query-string parameters the request is sent with.
         * These are not the cache key — pass filters to `Get`'s key as well.
         */
        query(value: Record<string, unknown>) {
            query = value
            return featureQuery
        },
        build(): FeatureQueryBuilt {
            if (path === undefined) {
                throw new Error('FeatureQuery: path is required')
            }

            const Get = <TResponse>(
                queryKey: CacheKey,
                options?: QueryOptions<TResponse>,
            ): UseQueryOptions<TResponse, AxiosError<ErrorResponse>> => ({
                queryKey,
                queryFn: () => buildRequest().get<TResponse>().then(extractAxiosData),
                ...options,
            })

            const Delete = <TResponse = void>(
                options?: MutationOptions<void, TResponse>,
            ): UseMutationOptions<TResponse, AxiosError<ErrorResponse>, void> => ({
                mutationFn: () => buildRequest().delete<TResponse>().then(extractAxiosData),
                ...options,
            })

            return {
                Get,
                Post: mutation('post'),
                Put: mutation('put'),
                Patch: mutation('patch'),
                Delete,
            }
        },
    }

    return featureQuery
}
