// @ts-nocheck — skill example, outside the tsconfig include.

import { useMutation, useQuery } from '@tanstack/react-query'
import {
    ClientMessage,
    ErrorResponse,
    Query,
    QueryKey,
    errorMessage,
    isTruthy,
} from '@common-utils'
import { Session } from '@shared-context'
import { FeatureTransformers } from './Feature.transformers'
import type {
    GetFeatureResponse,
    GetFeatureSubfeatureResponse,
    PostFeatureRequest,
    PostFeatureResponse,
} from '@common-types'
import type { AxiosError } from 'axios'
import type { FeatureFormData } from './Feature.types'

/** Public read — no token. */
const useGet = (path: string) => {
    const request = Query.FeatureQuery().path('Feature').build()

    return useQuery<GetFeatureResponse, AxiosError<ErrorResponse>>({
        ...request.Get<GetFeatureResponse>(QueryKey.Feature.byFilters({ filter1: path }).build()),
        enabled: isTruthy(path),
    })
}

/** Authenticated read — token on the chain. */
const useGetSubfeature = () => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Feature').token(token).build()

    return useQuery<GetFeatureSubfeatureResponse, AxiosError<ErrorResponse>>(
        request.Get<GetFeatureSubfeatureResponse>(QueryKey.Feature.build()),
    )
}

type UsePost = { onSuccess?: VoidFunction; onError?: (error: AxiosError<ErrorResponse>) => void }

/** Authenticated write — callbacks spread, so a caller can override. */
const usePost = ({ onSuccess, onError }: UsePost) => {
    const token = Session.useContext().session?.token
    const request = Query.FeatureQuery().path('Feature').token(token).build()

    return useMutation<PostFeatureResponse, AxiosError<ErrorResponse>, PostFeatureRequest>({
        mutationKey: QueryKey.Feature.build(),
        ...request.Post({ onSuccess, onError }),
    })
}

type UsePostForm = {
    onSuccess?: VoidFunction
    onError?: (error: AxiosError<ErrorResponse>) => void
    setField?: (field: string) => void
}

/** Form-shaped body — RequestBuilder, because Post has no transform seam. */
const usePostForm = ({ onSuccess, onError, setField }: UsePostForm = {}) => {
    const token = Session.useContext().session?.token
    const request = new Query.RequestBuilder('Feature')
        .setSubpath('/subfeature1')
        .withAuthToken(token)
        .build()

    return useMutation<PostFeatureResponse, AxiosError<ErrorResponse>, FeatureFormData>({
        mutationFn: (data: FeatureFormData) =>
            request.post<PostFeatureResponse>(FeatureTransformers.Post(data)),
        onSuccess,
        onError: (error) => {
            setField?.(errorMessage(error, ClientMessage.Failure.Create('feature')))
            onError?.(error)
        },
    })
}

/** Payload-less POST — `void` variable, `() =>` fn. */
const usePostPing = () => {
    const token = Session.useContext().session?.token

    return useMutation<void, AxiosError<ErrorResponse>, void>({
        mutationFn: () =>
            new Query.RequestBuilder('Feature')
                .setSubpath('/subfeature2')
                .withAuthToken(token)
                .build()
                .post<void>(),
    })
}

export const FeatureQueries = {
    useGet,
    useGetSubfeature,
    usePost,
    usePostForm,
    usePostPing,
}
