import type { JsonBodyType, RequestHandler } from 'msw'
import type { VoidFunction } from '@common-utils'
import type { MockBuilderType } from './MockBuilder.types'

export enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export type RequestBuilderProps<T extends JsonBodyType> = {
    path: string
    method: HttpMethods
    response: MockBuilderType<T> | T
    status?: number
    once?: boolean
    hold?: boolean
}

export type RequestBuilderResult<T extends JsonBodyType> = {
    build: () => RequestHandler
    updateResponse: (
        modifier: (builder: MockBuilderType<T>) => MockBuilderType<T>,
    ) => RequestBuilderResult<T>
    release: VoidFunction
}

export type Buildable = Pick<RequestBuilderResult<JsonBodyType>, 'build'>
