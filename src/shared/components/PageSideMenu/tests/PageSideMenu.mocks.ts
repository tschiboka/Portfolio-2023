import { TestMocks } from '@common-mocks'
import { GetLikeResponse, GetVisitResponse, PostLikeResponse } from '@common-types'

const likes: GetLikeResponse = { likes: 0 }
const likesWithCount: GetLikeResponse = { likes: 5 }
const visits: GetVisitResponse = { visits: 0 }
const visitsWithCount: GetVisitResponse = { visits: 42 }
const postLikeSuccess: PostLikeResponse = {
    like: { path: '/projects', likeDate: TestMocks.createdAt },
}

export const PageSideMenuMocks = {
    likes,
    likesWithCount,
    visits,
    visitsWithCount,
    postLikeSuccess,
}
