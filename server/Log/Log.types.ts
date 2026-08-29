import type { Document } from 'mongoose'
import type {
    DeleteLogResponse,
    GetLogQuery,
    GetLogResponse,
    GetLogTableResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'

/** Mongoose document shape for an error log entry. */
export interface ILog extends Document {
    timestamp: string
    name: string
    message: string
    stack: string
}

export type GetLogReq = TypedRequest<{ query: GetLogQuery }>
export type GetLogRes = TypedResponse<GetLogTableResponse | GetLogResponse>

export type DeleteLogReq = TypedRequest<{ params: { ids: string } }>
export type DeleteLogRes = TypedResponse<DeleteLogResponse>
