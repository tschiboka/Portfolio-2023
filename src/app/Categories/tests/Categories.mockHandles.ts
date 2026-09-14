import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { CategoriesMocks } from './Categories.mocks'

const categoriesData = CategoriesMocks.categories

export const CategoriesMockHandlers = {
    /** GET /api/categories — returns the seed categories. */
    get: RequestBuilder({
        path: '/api/categories',
        method: HttpMethods.GET,
        response: MockBuilder({ data: categoriesData }),
    }),

    /** POST /api/categories — succeeds. */
    post: RequestBuilder({
        path: '/api/categories',
        method: HttpMethods.POST,
        response: MockBuilder({}),
    }),

    /** POST /api/categories — fails with the given message and status. */
    postError: (message: string, status = HttpStatus.BAD_REQUEST) =>
        RequestBuilder({
            path: '/api/categories',
            method: HttpMethods.POST,
            response: MockBuilder({ message }),
            status,
        }),
}

/** Default GET + POST handlers used by the feature spec. */
export const defaultHandlers = [CategoriesMockHandlers.get, CategoriesMockHandlers.post]
