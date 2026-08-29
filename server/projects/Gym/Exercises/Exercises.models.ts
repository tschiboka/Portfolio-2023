import { DIFFICULTY_LEVELS, EXERCISE_SOURCES, EXERCISE_TYPES } from '@common/types'
import type { IGymExercise } from './Exercises.types'
import { EQUIPMENT_VALUES, MUSCLE_GROUP_VALUES } from './Exercises.constants'
import mongoose from 'mongoose'

const schema = new mongoose.Schema<IGymExercise>({
    name: { type: String, required: true, trim: true },
    type: {
        type: String,
        required: true,
        enum: EXERCISE_TYPES,
    },
    difficulty: { type: String, enum: DIFFICULTY_LEVELS },
    description: { type: String, trim: true },
    primaryMuscleGroups: {
        type: [{ type: String, enum: MUSCLE_GROUP_VALUES }],
        required: true,
    },
    secondaryMuscleGroups: {
        type: [{ type: String, enum: MUSCLE_GROUP_VALUES }],
    },
    unilateral: { type: Boolean, default: false },
    equipment: {
        type: [{ type: String, enum: EQUIPMENT_VALUES }],
    },
    instructions: { type: String },
    notes: { type: String },
    image: { type: String },
    video: { type: String },
    url: { type: String },
    source: { type: String, enum: EXERCISE_SOURCES, required: true },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export const ExerciseModel = mongoose.model<IGymExercise>('GymExercise', schema)
