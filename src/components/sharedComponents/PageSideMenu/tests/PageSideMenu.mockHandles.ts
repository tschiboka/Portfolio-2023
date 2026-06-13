import { RequestBuilder, MockBuilder } from '@common/ux/Test/Server'
import { HttpMethods } from '@common/ux/Test/Server/RequestBuilder'
import { mockLikes, mockPostLikeSuccess, mockVisits } from './PageSideMenu.mocks'

export const handleGetLikes = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.GET,
    response: MockBuilder(mockLikes),
})

export const handleGetVisits = RequestBuilder({
    path: '/api/visit',
    method: HttpMethods.GET,
    response: MockBuilder(mockVisits),
})

export const handlePostLike = RequestBuilder({
    path: '/api/like',
    method: HttpMethods.POST,
    response: MockBuilder(mockPostLikeSuccess),
})

export const pageSideMenuHandlers = [handleGetLikes, handleGetVisits]
