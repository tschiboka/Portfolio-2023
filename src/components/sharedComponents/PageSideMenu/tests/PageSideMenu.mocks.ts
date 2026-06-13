import { GetLikeResponse, GetVisitResponse, PostLikeResponse } from '@common/types'

export const mockLikes: GetLikeResponse = {
    success: true,
    likes: 0,
}

export const mockLikesWithCount: GetLikeResponse = {
    success: true,
    likes: 5,
}

export const mockVisits: GetVisitResponse = {
    success: true,
    visits: 0,
}

export const mockVisitsWithCount: GetVisitResponse = {
    success: true,
    visits: 42,
}

export const mockPostLikeSuccess: PostLikeResponse = {
    success: true,
    like: { path: '/projects', likeDate: new Date('2026-06-13') },
}
