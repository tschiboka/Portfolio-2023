import type mongoose from 'mongoose'
import type { Document } from 'mongoose'
import type { Request } from 'express'
import type {
    GetSessionResponse,
    GetUserResponse,
    GetUsersResponse,
    PostConfirmRequest,
    PostConfirmResponse,
    PostLoginRequest,
    PostLoginResponse,
    PostUserRequest,
    PostUserResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'

/** Mongoose document shape for a user. */
export interface IUser extends Document {
    fullName: string
    userName: string
    email: string
    password: string
    isAdmin: boolean
    capabilities: string[]
    avatarId?: mongoose.Types.ObjectId
    verified: boolean
    active: boolean
    created: Date
    updated: Date
    lastLogin?: Date
}

/** The user shape submitted for validation/creation. */
export type UserInput = {
    fullName: string
    userName: string
    email: string
    password: string
    isAdmin?: boolean
    capabilities?: string[]
    avatarId?: string
    created?: Date
    updated?: Date
    lastLogin?: Date
}

/** The login shape submitted for validation. */
export type LoginInput = {
    email: string
    password: string
}

/** The token shape submitted for verification/confirmation. */
export type TokenInput = {
    token: string
}

/** The JWT payload a signed auth token carries. */
export interface UserToken {
    id?: string
    isAdmin: boolean
    [key: string]: unknown
}

/** The registration fields embedded in a confirmation token. */
export type RegistrationPayload = {
    fullName: string
    userName: string
    email: string
    password: string
    isAdmin: boolean
    active: boolean
    verified: boolean
}

/** An Express request carrying the authenticated user payload attached by the `auth` guard. */
export type AuthedRequest = Request & { user?: UserToken }

// /api/user
export type GetUsersReq = TypedRequest
export type GetUsersRes = TypedResponse<GetUsersResponse>

export type GetUserReq = TypedRequest<{ params: { id: string } }>
export type GetUserRes = TypedResponse<GetUserResponse>

export type PostUserReq = TypedRequest<{ body: PostUserRequest }>
export type PostUserRes = TypedResponse<PostUserResponse>

// /api/login
export type PostLoginReq = TypedRequest<{ body: PostLoginRequest }>
export type PostLoginRes = TypedResponse<PostLoginResponse>

// /api/confirm
export type PostConfirmReq = TypedRequest<{ body: PostConfirmRequest }>
export type PostConfirmRes = TypedResponse<PostConfirmResponse>

// /api/session
export type SessionReq = TypedRequest
export type SessionRes = TypedResponse<GetSessionResponse>
