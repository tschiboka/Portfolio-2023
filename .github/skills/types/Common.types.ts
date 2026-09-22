// @ts-nocheck — skill example, outside the tsconfig include.

// A domain type in `common/types/`. It lives here because a second feature
// consumed it — not because it looked reusable.
export type RoutineSource = 'user' | 'system'

export type RoutineExercise = {
    exerciseId: string
    order: number
}

/** Core entity — composed into the endpoint types below, never sent as-is. */
export type Routine = {
    name: string
    exercises: RoutineExercise[]
    source: RoutineSource
    ownerId?: string
}

// One type per endpoint and direction. Identical shapes still get separate
// names, so each can diverge without breaking the other.

export type GetRoutinesResponse = { routines: Routine[] }

export type PostRoutineRequest = Pick<Routine, 'name' | 'exercises'>
export type PostRoutineResponse = Routine

export type PutRoutineRequest = Pick<Routine, 'name' | 'exercises'> & { id: string }
export type PutRoutineResponse = Routine

export type PatchRoutineRequest = Partial<Pick<Routine, 'name' | 'exercises'>> & { id: string }

export type DeleteRoutineRequest = { id: string }
export type DeleteRoutineResponse = { deleted: boolean }
