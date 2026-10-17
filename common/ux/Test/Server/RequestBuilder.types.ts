import type { JsonBodyType, RequestHandler } from 'msw'
import type { MockBuilderType } from './MockBuilder'

export type RequestBuilderResult<T extends JsonBodyType> = {
    build: () => RequestHandler
    updateResponse: (
        modifier: (builder: MockBuilderType<T>) => MockBuilderType<T>,
    ) => RequestBuilderResult<T>
}

export type Buildable = Pick<RequestBuilderResult<JsonBodyType>, 'build'>
