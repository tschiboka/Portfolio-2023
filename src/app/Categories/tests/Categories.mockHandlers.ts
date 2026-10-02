import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { HttpStatus } from '@common-utils'
import { CategoriesMocks } from './Categories.mocks'

const getCategories = RequestBuilder({
    path: '/api/categories',
    method: HttpMethods.GET,
    response: MockBuilder({ data: CategoriesMocks.categories }),
})

const postCategory = RequestBuilder({
    path: '/api/categories',
    method: HttpMethods.POST,
    response: MockBuilder({}),
})

const postCategoryRejected = RequestBuilder({
    path: '/api/categories',
    method: HttpMethods.POST,
    status: HttpStatus.BAD_REQUEST,
    response: MockBuilder({ message: 'Nope' }),
})

export const CategoriesMockHandlers = {
    Get: getCategories,
    Post: postCategory,
    PostRejected: postCategoryRejected,
    Defaults: [getCategories, postCategory],
}
