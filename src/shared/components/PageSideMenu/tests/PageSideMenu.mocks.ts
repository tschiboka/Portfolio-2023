import { GetLikeResponse, GetVisitResponse, PostLikeResponse } from '@common-types'

export const mockLikes: GetLikeResponse = { likes: 0 }
export const mockLikesWithCount: GetLikeResponse = { likes: 5 }
export const mockVisits: GetVisitResponse = { visits: 0 }
export const mockVisitsWithCount: GetVisitResponse = { visits: 42 }
export const mockPostLikeSuccess: PostLikeResponse = {
    like: { path: '/projects', likeDate: new Date('2026-06-13') },
}
