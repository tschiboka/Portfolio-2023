// @ts-nocheck — skill example, outside the tsconfig include.

// The feature's own contract: what this feature sends and receives. Shared types
// come from `@common-types` and are never redeclared here.
import type {
    DeleteRoutineRequest,
    DeleteRoutineResponse,
    GetRoutineResponse,
    PostRoutineRequest,
    PostRoutineResponse,
} from '@common-types'

// The core entity — exported, because both the server and the app hold it.
export type RoutineExercise = {
    exerciseId: string
    order: number
}

export const ROUTINE_SOURCES = ['user', 'system'] as const
export type RoutineSource = (typeof ROUTINE_SOURCES)[number]

export type RoutineResource = {
    name: string
    exercises: RoutineExercise[]
    source: RoutineSource
    ownerId?: string
}

// What the four request/response types above look like, composed from the shared
// core. Declared in `common/types/`, imported here — this is the shape, not a
// second declaration of it:
//
//   export type PostRoutineRequest = Pick<Routine, 'name' | 'exercises'>
//   export type PostRoutineResponse = Routine
//   export type GetRoutineResponse = { routines: Routine[] }
//   export type DeleteRoutineRequest = { id: string }
//   export type DeleteRoutineResponse = { deleted: boolean }

// The FE-side form shape. It differs from the request — `confirmName` exists only
// on the form — so the transformer maps one onto the other, and nothing else in
// the feature sees this type.
export type RoutineFormData = PostRoutineRequest & {
    confirmName: string
}
