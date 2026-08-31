import { RequestBuilder, MockBuilder, HttpMethods } from '@common-ux/Test'
import { mockBlogVisits, mockBlogLikes } from './Blog.mocks'
import {
    pageSideMenuHandlers,
    handlePostLike,
} from '@shared-components/PageSideMenu/tests/PageSideMenu.mockHandles'

const handleGetVisitSummary = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.GET,
    response: MockBuilder(mockBlogVisits),
})

const handleGetLikeSummary = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: MockBuilder(mockBlogLikes),
})

export const handlers = [
    ...pageSideMenuHandlers,
    handlePostLike,
    handleGetVisitSummary,
    handleGetLikeSummary,
]
