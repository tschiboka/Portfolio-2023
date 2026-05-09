import { http, HttpResponse, RequestHandler, JsonBodyType } from 'msw'
import { MockBuilder, MockBuilderType } from './MockBuilder'
import { HttpStatus } from '@common/utils'

export enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

type RequestBuilderOptions<T extends JsonBodyType> = {
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

const BASE_URL = process.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const RequestBuilder = <T extends JsonBodyType>(
    options: RequestBuilderOptions<T>,
): RequestBuilderResult<T> => {
    const { path, method, response, status = HttpStatus.OK, once = false } = options

    const resolvedResponse =
        'build' in (response as object) ? (response as MockBuilderType<T>).build() : (response as T)

    return {
        build: () =>
            http[method](
                `${BASE_URL}${path}`,
                () => {
                    return HttpResponse.json(resolvedResponse, { status })
                },
                { once },
            ),
        updateResponse: (modifier) =>
            RequestBuilder({
                ...options,
                response: modifier(MockBuilder(resolvedResponse)),
            }),
    }
}
