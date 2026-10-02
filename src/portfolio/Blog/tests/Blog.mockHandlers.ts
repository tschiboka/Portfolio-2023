import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { BlogMocks } from './Blog.mocks'
import { PageSideMenuMockHandlers } from '@shared-components/PageSideMenu/tests/PageSideMenu.mockHandlers'

const getVisits = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.GET,
    response: MockBuilder(BlogMocks.visits),
})

const getLikes = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: MockBuilder(BlogMocks.likes),
})

export const BlogMockHandlers = {
    Visits: { Get: getVisits },
    Likes: { Get: getLikes },
    Defaults: [
        ...PageSideMenuMockHandlers.Defaults,
        PageSideMenuMockHandlers.Likes.Post,
        getVisits,
        getLikes,
    ],
}
