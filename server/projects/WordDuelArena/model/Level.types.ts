import type { Document } from 'mongoose'
import type {
    GetWdaLevelParams,
    GetWdaLevelsResponse,
    PostWdaLevelRequest,
    PostWdaLevelResponse,
    TypedRequest,
    TypedResponse,
    WdaErrorResponse,
    WdaLevel,
} from '@common-types'

export type ILevel = Document & {
    name: string
    targetWords: string[]
    difficulty: number
    createdAt: Date
    updatedAt: Date
}

/** What an upsert writes: the level's own fields, without the document's timestamps. */
export type DbLevel = {
    name: string
    targetWords: string[]
    difficulty: number
}

/** A level as the database hands it back, id included. */
export type DbLevelRecord = {
    _id: { toString(): string }
    name: string
    difficulty: number
    targetWords: string[]
}

export type LevelInput = {
    name: string
    targetWords: string[]
    difficulty: number
}

export type GetLevelsRes = TypedResponse<GetWdaLevelsResponse | WdaErrorResponse>
export type GetLevelReq = TypedRequest<{ params: GetWdaLevelParams }>
export type GetLevelRes = TypedResponse<WdaLevel | WdaErrorResponse>
export type PostLevelReq = TypedRequest<{ body: PostWdaLevelRequest }>
export type PostLevelRes = TypedResponse<PostWdaLevelResponse | WdaErrorResponse>
