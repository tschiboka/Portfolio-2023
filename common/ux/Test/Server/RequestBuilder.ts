import { http, HttpResponse, JsonBodyType } from 'msw'
import { HttpStatus } from '@common-utils'
import { MockBuilder } from './MockBuilder'
import type { RequestBuilderProps, RequestBuilderResult } from './RequestBuilder.types'
import type { MockBuilderType } from './MockBuilder.types'

export { HttpMethods } from './RequestBuilder.types'

const BASE_URL = process.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const RequestBuilder = <T extends JsonBodyType>(
    options: RequestBuilderProps<T>,
): RequestBuilderResult<T> => {
    const { path, method, response, status = HttpStatus.OK, once = false } = options

    const resolvedResponse =
        'build' in (response as object) ? (response as MockBuilderType<T>).build() : (response as T)

    return {
        build: () =>
            http[method](
                `${BASE_URL}${path}`,
                () =>
                    HttpResponse.json(resolvedResponse, {
                        status,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                    }),
                { once },
            ),
        updateResponse: (modifier) =>
            RequestBuilder({
                ...options,
                response: modifier(MockBuilder(resolvedResponse)),
            }),
    }
}
