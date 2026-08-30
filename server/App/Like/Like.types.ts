import type { Document } from 'mongoose'
import type {
    GetLikeQuery,
    GetLikeResponse,
    GetLikeSummaryResponse,
    PostLikeRequest,
    PostLikeResponse,
    TypedRequest,
    TypedResponse,
} from '../../../common/types'

/** Mongoose document shape for a like. */
export interface ILike extends Document {
    path: string
    likeDate: Date
}

/** The like shape submitted for validation/creation. */
export type LikeInput = {
    path: string
}

export type GetLikeReq = TypedRequest<{ query: GetLikeQuery }>
export type GetLikeRes = TypedResponse<GetLikeSummaryResponse | GetLikeResponse>

export type PostLikeReq = TypedRequest<{ body: PostLikeRequest }>
export type PostLikeRes = TypedResponse<PostLikeResponse>


