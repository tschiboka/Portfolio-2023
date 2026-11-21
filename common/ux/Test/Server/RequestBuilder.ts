import { http, HttpResponse, JsonBodyType } from 'msw'
import { HttpStatus } from '@common-utils'
import { MockBuilder } from './MockBuilder'
import type { VoidFunction } from '@common-utils'
import type { RequestBuilderProps, RequestBuilderResult } from './RequestBuilder.types'
import type { MockBuilderType } from './MockBuilder.types'

export { HttpMethods } from './RequestBuilder.types'

const BASE_URL = process.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const RequestBuilder = <T extends JsonBodyType>(
    options: RequestBuilderProps<T>,
): RequestBuilderResult<T> => {
    const { path, method, response, status = HttpStatus.OK, once = false, hold = false } = options
    /** Settled by `release`, so a held handler waits for the test rather than for a clock. */
    let release: VoidFunction = () => {}
    const held = new Promise<boolean>((resolve) => (release = () => resolve(true)))

    const resolvedResponse =
        'build' in (response as object) ? (response as MockBuilderType<T>).build() : (response as T)

    return {
        build: () =>
            http[method](
                `${BASE_URL}${path}`,
                async () => {
                    if (hold) await held

                    return HttpResponse.json(resolvedResponse, {
                        status,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                    })
                },
                { once },
            ),
        updateResponse: (modifier) =>
            RequestBuilder({
                ...options,
                response: modifier(MockBuilder(resolvedResponse)),
            }),
        release,
    }
}
