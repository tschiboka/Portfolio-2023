import type { Document } from 'mongoose'
import type {
    GetSettingsResponse,
    PostSettingsRequest,
    PostSettingsResponse,
    TypedRequest,
    TypedResponse,
} from '@common/types'

/** Mongoose document shape for application settings. */
export interface ISetting extends Document {
    maxUsers: number
    enableMaintenanceMode: boolean
    enableUserRegistration: boolean
    enableAutomaticLogoff: boolean
    enabledFeatures: string[]
    registrationTokensExpireInMs: number
    sessionTokensExpireInMs: number
}

/** The settings shape submitted for validation. */
export type SettingsInput = {
    maxUsers?: number
    enableMaintenanceMode?: boolean
    enableUserRegistration?: boolean
    enableAutomaticLogoff?: boolean
    enabledFeatures?: string[]
    registrationTokensExpireInMs?: number
    sessionTokensExpireInMs?: number
}

export type GetSettingsReq = TypedRequest
export type GetSettingsRes = TypedResponse<GetSettingsResponse>

export type PostSettingsReq = TypedRequest<{ body: PostSettingsRequest }>
export type PostSettingsRes = TypedResponse<PostSettingsResponse>
