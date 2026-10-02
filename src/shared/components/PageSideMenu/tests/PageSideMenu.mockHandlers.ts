import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { PageSideMenuMocks } from './PageSideMenu.mocks'

const getLikes = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: MockBuilder(PageSideMenuMocks.likes),
})

const getVisits = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.GET,
    response: MockBuilder(PageSideMenuMocks.visits),
})

const postLike = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.POST,
    response: MockBuilder(PageSideMenuMocks.postLikeSuccess),
})

export const PageSideMenuMockHandlers = {
    Likes: { Get: getLikes, Post: postLike },
    Visits: { Get: getVisits },
    Defaults: [getLikes, getVisits],
}
