import type { ObjectId } from 'mongodb'
import type { Document } from 'mongoose'
import type {
    GetXmasCandlesResponse,
    GetXmasMessagesQuery,
    GetXmasMessagesResponse,
    GetXmasPingResponse,
    PostXmasMessageRequest,
    PostXmasMessageResponse,
    PutXmasCandlesRequest,
    PutXmasCandlesResponse,
    TypedRequest,
    TypedResponse,
} from '../../../common/types'

export type GetPingRes = TypedResponse<GetXmasPingResponse>
export type PostMessageReq = TypedRequest<{ body: PostXmasMessageRequest }>
export type PostMessageRes = TypedResponse<PostXmasMessageResponse>
export type GetMessagesReq = TypedRequest<{ query: GetXmasMessagesQuery }>
export type GetMessagesRes = TypedResponse<GetXmasMessagesResponse>
export type GetCandlesRes = TypedResponse<GetXmasCandlesResponse>
export type PutCandlesReq = TypedRequest<{ body: PutXmasCandlesRequest }>
export type PutCandlesRes = TypedResponse<PutXmasCandlesResponse>

/** A single Xmas message document. */
export type IXmasMessage = Document & {
    name: string
    message: string
    isRead: boolean
    userId: ObjectId
    createdAt: Date
}

export type XmasMessageInput = {
    name: string
    message: string
    isRead?: boolean
    userId: string
}

export type XmasCandleInput = {
    candle1: boolean
    candle2: boolean
    candle3: boolean
    candle4: boolean
}
