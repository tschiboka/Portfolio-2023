import type mongoose from 'mongoose'
import type { Document } from 'mongoose'
import type { Nullable } from '@common-utils'
import type {
    GetCategoryResponse,
    PostCategoryRequest,
    TypedRequest,
    TypedResponse,
} from '../../../common/types'

/** Mongoose document shape for a category. */
export interface ICategory extends Document {
    name: string
    userId: mongoose.Types.ObjectId
    description: string
    icon?: string
    color?: string
    status: string
    created_at: Date
    isParent: boolean
    parentId: Nullable<mongoose.Types.ObjectId>
}

/** The category shape submitted for validation/creation. */
export type CategoryInput = {
    name: string
    description: string
    icon: string
    color?: string
    status?: string
    parentId?: string
}

export type GetCategoriesReq = TypedRequest<{ query: { isParent?: string } }>
export type GetCategoriesRes = TypedResponse<{ data: GetCategoryResponse[] }>

export type PostCategoryReq = TypedRequest<{ body: PostCategoryRequest }>
export type PostCategoryRes = TypedResponse
