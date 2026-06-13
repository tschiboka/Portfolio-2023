// Shared types for the Gym project.

export type GymUserRoutineResponse = {
    name: string
}

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

export type ExerciseType = 'strength' | 'cardio' | 'flexibility' | 'balance' | 'mobility'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type EquipmentResource =
    | 'bodyweight'

    // Free weights
    | 'barbell'
    | 'ez_bar'
    | 'trap_bar'
    | 'dumbbell'
    | 'kettlebell'
    | 'weight_plate'

    // Machines & cables
    | 'cable'
    | 'smith_machine'
    | 'machine'

    // Benches & racks
    | 'bench'
    | 'power_rack'
    | 'squat_rack'

    // Bands & suspension
    | 'resistance_band'
    | 'mini_band'
    | 'trx'

    // Pull-up equipment
    | 'pull_up_bar'
    | 'dip_station'

    // Cardio
    | 'treadmill'
    | 'exercise_bike'
    | 'rowing_machine'
    | 'elliptical'
    | 'stair_climber'
    | 'ski_erg'

    // Functional fitness
    | 'battle_rope'
    | 'medicine_ball'
    | 'slam_ball'
    | 'sandbag'
    | 'plyo_box'
    | 'sled'
    | 'jump_rope'

    // Mobility
    | 'foam_roller'

export type GymExerciseResource = {
    name: string
    type: ExerciseType
    difficulty?: DifficultyLevel
    description?: string
    primaryMuscleGroups: MuscleGroupResource[]
    secondaryMuscleGroups?: MuscleGroupResource[]
    unilateral?: boolean
    equipment?: string[] // make this an enum
    instructions?: string
    notes?: string
    image?: string
    video?: string
    url?: string
}

export type GetGymUserRoutinesResponse = { routines: GymUserRoutineResponse[] }
export type GetGymExercisesResponse = { exercises: GymExerciseResource[] }
