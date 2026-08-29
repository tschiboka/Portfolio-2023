import type {
    GetGymUserRoutinesResponse,
    GymRoutineResource,
    PatchGymRoutineRequest,
    PostGymRoutineRequest,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import type { Dictionary, WithoutId } from '@common/utils/Generics'
import type { GymRoutineSource } from '@common/types'
import type mongoose from 'mongoose'
import type { Document } from 'mongoose'

/** Mongoose document shape for a gym routine. */
export interface IGymRoutine extends Document {
    name: string
    entries: {
        exerciseId: mongoose.Types.ObjectId
        order: number
    }[]
    source: 'user' | 'system'
    ownerId?: mongoose.Types.ObjectId
}

export type RoutineValidationInput = WithoutId<GymRoutineResource> & { source: GymRoutineSource }

/** The subset of a routine a permission check relies on. */
export type RoutineOwnership = {
    source: GymRoutineSource
    ownerId?: { toString: () => string } | null
}

export type GetRoutinesRes = TypedResponse<GetGymUserRoutinesResponse>

export type GetRoutineReq = TypedRequest

export type PostRoutineReq = TypedRequest<{
    body: PostGymRoutineRequest
    params: Dictionary<string>
}>
export type PostRoutineRes = TypedResponse

export type PatchRoutineReq = TypedRequest<{
    body: PatchGymRoutineRequest
    params: { id: string }
}>
export type PatchRoutineRes = TypedResponse

export type DeleteRoutineReq = TypedRequest<{ params: { id: string } }>
export type DeleteRoutineRes = TypedResponse
