import { RequestBuilder, HttpMethods } from '@common-ux/Test'
import { LikeQueriesMocks } from './Like.queries.mocks'

const postLike = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.POST,
    response: LikeQueriesMocks.postLike,
})

const getLikes = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: LikeQueriesMocks.getLikes,
})

const getLikeSummary = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: LikeQueriesMocks.getLikeSummary,
})

/** Path matching is all MSW sees, so a case passes the GET shape it expects. */
export const LikeQueriesMockHandlers = {
    Get: getLikes,
    GetSummary: getLikeSummary,
    Post: postLike,
    Defaults: [postLike],
}
