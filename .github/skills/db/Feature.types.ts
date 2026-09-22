// @ts-nocheck — skill example, outside the tsconfig include.

import type { Document } from 'mongoose'
import type { Optional } from '@common-utils'
import type {
    GetFeatureResponse,
    PostFeatureRequest,
    TypedRequest,
    TypedResponse,
} from '@common/types'

// Four roles, each with its own job. They are not interchangeable, and the
// narrowing is deliberate.

/** What the store returns — a Mongoose document, `_id` and all. */
export interface IFeature extends Document {
    path: string
    label: string
    userId: string
    createdAt: Date
    parentId?: Optional<string>
}

/** What arrives for validation — the submitted fields only, never the document. */
export type FeatureInput = {
    path: string
    label: string
    parentId?: Optional<string>
}

/** What a route receives, and what it answers with — typed per route, in pairs. */
export type GetFeatureReq = TypedRequest<{ query: { path: string } }>
export type GetFeatureRes = TypedResponse<GetFeatureResponse>

export type PostFeatureReq = TypedRequest<{ body: PostFeatureRequest }>
export type PostFeatureRes = TypedResponse<GetFeatureResponse>
