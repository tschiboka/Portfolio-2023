import type { Document } from 'mongoose'
import type {
    GetVisitQuery,
    GetVisitResponse,
    GetVisitSummaryResponse,
    PostVisitRequest,
    PostVisitResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'

/** Mongoose document shape for a visit. */
export interface IVisit extends Document {
    path: string
    visitDate: Date
}

/** The visit shape submitted for validation/creation. */
export type VisitInput = {
    path: string
}

export type GetVisitReq = TypedRequest<{ query: GetVisitQuery }>
export type GetVisitRes = TypedResponse<GetVisitSummaryResponse | GetVisitResponse>

export type PostVisitReq = TypedRequest<{ body: PostVisitRequest }>
export type PostVisitRes = TypedResponse<PostVisitResponse>
