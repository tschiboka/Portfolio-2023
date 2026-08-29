import type {
    DifficultyLevel,
    EquipmentResource,
    ExerciseType,
    GetGymExercisesResponse,
    GymExerciseResource,
    GymExerciseSource,
    MuscleGroupResource,
    PatchGymExerciseRequest,
    PostGymExerciseRequest,
    TypedRequest,
    TypedResponse,
} from '@common/types'
import type { Dictionary, WithoutId } from '@common/utils/Generics'
import type mongoose from 'mongoose'
import type { Document } from 'mongoose'

/** Mongoose document shape for a gym exercise. */
export interface IGymExercise extends Document {
    name: string
    type: ExerciseType
    difficulty?: DifficultyLevel
    description?: string
    primaryMuscleGroups: MuscleGroupResource[]
    secondaryMuscleGroups?: MuscleGroupResource[]
    unilateral?: boolean
    equipment?: EquipmentResource[]
    instructions?: string
    notes?: string
    image?: string
    video?: string
    url?: string
    source: GymExerciseSource
    ownerId?: mongoose.Types.ObjectId
}

/** The subset of an exercise a permission check relies on. */
export type ExerciseOwnership = {
    source: GymExerciseSource
    ownerId?: { toString: () => string } | null
}

/** The exercise shape submitted for validation: no `_id`, source/owner inferred server-side. */
export type ExerciseValidationInput = WithoutId<GymExerciseResource> & {
    source: GymExerciseSource
}

export type GetExercisesRes = TypedResponse<GetGymExercisesResponse>

export type GetExerciseReq = TypedRequest

export type PostExerciseReq = TypedRequest<{
    body: PostGymExerciseRequest
    params: Dictionary<string>
}>
export type PostExerciseRes = TypedResponse

export type PatchExerciseReq = TypedRequest<{
    body: PatchGymExerciseRequest
    params: { id: string }
}>
export type PatchExerciseRes = TypedResponse

export type DeleteExerciseReq = TypedRequest<{ params: { id: string } }>
export type DeleteExerciseRes = TypedResponse
