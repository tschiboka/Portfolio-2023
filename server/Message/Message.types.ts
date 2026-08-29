import type { Document } from 'mongoose'
import type {
    PostMessageRequest,
    PostMessageResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'

/** Mongoose document shape for a contact message. */
export interface IMessage extends Document {
    name: string
    email: string
    phone?: string
    message: string
    date: Date
    isRead: boolean
}

/** The message shape submitted for validation/creation. */
export type MessageInput = {
    name: string
    email: string
    phone?: string
    message: string
    isRead?: boolean
    date?: Date
}

export type PostMessageReq = TypedRequest<{ body: PostMessageRequest }>
export type PostMessageRes = TypedResponse<PostMessageResponse>
