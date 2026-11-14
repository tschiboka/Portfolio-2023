import type { JsonBodyType, RequestHandler } from 'msw'
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
}

export type RequestBuilderResult<T extends JsonBodyType> = {
    build: () => RequestHandler
    updateResponse: (
        modifier: (builder: MockBuilderType<T>) => MockBuilderType<T>,
    ) => RequestBuilderResult<T>
}

export type Buildable = Pick<RequestBuilderResult<JsonBodyType>, 'build'>
