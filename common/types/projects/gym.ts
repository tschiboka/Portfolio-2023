import type { SearchInputOption } from '@common/ux'

// Shared types for the Gym project.

export type GymRoutineEntry = {
    exerciseId: string
    order: number
    // TODO: [0003] - sets / reps / rest to be added here when routine composition lands
}

export const ROUTINE_SOURCES = ['user', 'system'] as const
export type GymRoutineSource = (typeof ROUTINE_SOURCES)[number]

export type GymRoutineBase = {
    _id: string
    name: string
    entries: GymRoutineEntry[]
}

/** User-owned routine referencing canonical exercises. */
export type GymUserRoutine = GymRoutineBase & { source: 'user'; ownerId: string }

/** Future system/default routine (app-generated or admin-defined) with no owner. */
export type GymSystemRoutine = GymRoutineBase & { source: 'system' }

export type GymRoutineResource = GymUserRoutine | GymSystemRoutine

/** User routine creation body (source forced to 'user' server-side). */
export type PostGymRoutineRequest = Omit<GymRoutineBase, '_id'>

/** User routine update body — all fields optional. */
export type PatchGymRoutineRequest = Partial<Omit<GymRoutineBase, '_id'>>

export type MuscleGroupResource =
    // Chest
    | 'upper_chest'
    | 'middle_chest'
    | 'lower_chest'

    // Back
    | 'lats'
    | 'traps'
    | 'rhomboids'
    | 'teres_major'
    | 'erector_spinae'

    // Shoulders
    | 'front_delts'
    | 'side_delts'
    | 'rear_delts'

    // Arms
    | 'biceps'
    | 'triceps'
    | 'brachialis'
    | 'brachioradialis'
    | 'forearms'

    // Core
    | 'abs'
    | 'obliques'
    | 'transverse_abdominis'

    // Glutes / hips
    | 'glutes'
    | 'hip_flexors'
    | 'adductors'
    | 'abductors'

    // Legs
    | 'quadriceps'
    | 'hamstrings'
    | 'calves'
    | 'tibialis_anterior'

    // Neck
    | 'neck'

export type MuscleRegion =
    | 'chest'
    | 'back'
    | 'shoulders'
    | 'arms'
    | 'core'
    | 'glutes'
    | 'legs'
    | 'neck'

export const EXERCISE_TYPES = ['strength', 'cardio', 'flexibility', 'balance', 'mobility'] as const
export type ExerciseType = (typeof EXERCISE_TYPES)[number]

export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number]

export const EQUIPMENT_OPTIONS = [
    { value: 'bodyweight', label: 'Bodyweight' },

    // Free weights
    { value: 'barbell', label: 'Barbell' },
    { value: 'ez_bar', label: 'EZ Bar' },
    { value: 'trap_bar', label: 'Trap Bar' },
    { value: 'dumbbell', label: 'Dumbbell' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'weight_plate', label: 'Weight Plate' },

    // Machines & cables
    { value: 'cable', label: 'Cable' },
    { value: 'smith_machine', label: 'Smith Machine' },
    { value: 'machine', label: 'Machine' },

    // Benches & racks
    { value: 'bench', label: 'Bench' },
    { value: 'power_rack', label: 'Power Rack' },
    { value: 'squat_rack', label: 'Squat Rack' },

    // Bands & suspension
    { value: 'resistance_band', label: 'Resistance Band' },
    { value: 'mini_band', label: 'Mini Band' },
    { value: 'trx', label: 'TRX' },

    // Pull-up equipment
    { value: 'pull_up_bar', label: 'Pull-Up Bar' },
    { value: 'dip_station', label: 'Dip Station' },

    // Cardio
    { value: 'treadmill', label: 'Treadmill' },
    { value: 'exercise_bike', label: 'Exercise Bike' },
    { value: 'rowing_machine', label: 'Rowing Machine' },
    { value: 'elliptical', label: 'Elliptical' },
    { value: 'stair_climber', label: 'Stair Climber' },
    { value: 'ski_erg', label: 'Ski Erg' },

    // Functional fitness
    { value: 'battle_rope', label: 'Battle Rope' },
    { value: 'medicine_ball', label: 'Medicine Ball' },
    { value: 'slam_ball', label: 'Slam Ball' },
    { value: 'sandbag', label: 'Sandbag' },
    { value: 'plyo_box', label: 'Plyo Box' },
    { value: 'sled', label: 'Sled' },
    { value: 'jump_rope', label: 'Jump Rope' },
    { value: 'stability_ball', label: 'Stability Ball' },

    // Mobility
    { value: 'foam_roller', label: 'Foam Roller' },

    // Steps / platforms
    { value: 'step', label: 'Step' },
] as const satisfies readonly SearchInputOption[]
export type EquipmentResource = (typeof EQUIPMENT_OPTIONS)[number]['value']

export const EXERCISE_SOURCES = ['canonical', 'user'] as const
export type GymExerciseSource = (typeof EXERCISE_SOURCES)[number]

export type GymExerciseBase = {
    _id: string
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
}

/** Admin-curated, project-wide exercise with no individual owner. */
export type GymCanonicalExercise = GymExerciseBase & { source: 'canonical' }

/** User-owned, private exercise scoped to its owner. */
export type GymUserExercise = GymExerciseBase & { source: 'user'; ownerId: string }

export type GymExerciseResource = GymCanonicalExercise | GymUserExercise

export type GetGymUserRoutinesResponse = { routines: GymRoutineResource[] }
export type GetGymExercisesResponse = { exercises: GymExerciseResource[] }

export type GetGymDifficultyOptionsResponse = SearchInputOption<DifficultyLevel>[]
export type GetGymEquipmentOptionsResponse = SearchInputOption<EquipmentResource>[]
export type GetGymMuscleGroupOptionsResponse = SearchInputOption<MuscleGroupResource>[]

/** Canonical exercise creation body (source is forced to 'canonical' server-side). */
export type PostGymExerciseRequest = Omit<GymExerciseBase, '_id'>

/** Canonical exercise update body — all fields optional. */
export type PatchGymExerciseRequest = Partial<Omit<GymExerciseBase, '_id'>>
