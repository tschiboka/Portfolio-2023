import type {
    PostTypistRoundRequest,
    PostTypistRoundResponse,
    TypedRequest,
    TypedResponse,
} from '@common-types'

export type PostRoundReq = TypedRequest<PostTypistRoundRequest>

export type PostRoundRes = TypedResponse<PostTypistRoundResponse>
