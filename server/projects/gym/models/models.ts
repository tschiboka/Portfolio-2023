import {
    DIFFICULTY_LEVELS,
    EQUIPMENT_OPTIONS,
    EquipmentResource,
    EXERCISE_SOURCES,
    EXERCISE_TYPES,
    ExerciseType,
    GymExerciseResource,
    GymExerciseSource,
    GymRoutineResource,
    MuscleGroupResource,
    ROUTINE_SOURCES,
    type DifficultyLevel,
    type GymRoutineSource,
} from '@common/types'
import { muscleGroupOptions } from '../const/options/muscleGroup'
import Joi from 'joi'
import mongoose, { Document } from 'mongoose'

const MUSCLE_GROUP_VALUES = muscleGroupOptions.map((option) => option.value)
const EQUIPMENT_VALUES = EQUIPMENT_OPTIONS.map((option) => option.value)

interface IGymExercise extends Document {
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

interface IGymRoutine extends Document {
    name: string
    entries: {
        exerciseId: mongoose.Types.ObjectId
        order: number
    }[]
    source: 'user' | 'system'
    ownerId?: mongoose.Types.ObjectId
}

const gymExerciseSchema = new mongoose.Schema<IGymExercise>({
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

const gymRoutineSchema = new mongoose.Schema<IGymRoutine>({
    name: { type: String, required: true, trim: true },
    entries: {
        type: [
            {
                exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'GymExercise' },
                order: { type: Number, required: true },
            },
        ],
        default: [],
    },
    source: { type: String, enum: ROUTINE_SOURCES, required: true },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const GymExercise = mongoose.model<IGymExercise>('GymExercise', gymExerciseSchema)
const GymRoutine = mongoose.model<IGymRoutine>('GymRoutine', gymRoutineSchema)

const validateGymExercise = (
    exercise: Omit<GymExerciseResource, '_id'> & { source: GymExerciseSource },
) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        type: Joi.string()
            .valid(...EXERCISE_TYPES)
            .required(),
        difficulty: Joi.string().valid(...DIFFICULTY_LEVELS),
        description: Joi.string(),
        primaryMuscleGroups: Joi.array()
            .items(Joi.string().valid(...MUSCLE_GROUP_VALUES))
            .min(1)
            .required(),
        secondaryMuscleGroups: Joi.array().items(Joi.string().valid(...MUSCLE_GROUP_VALUES)),
        unilateral: Joi.boolean(),
        equipment: Joi.array().items(Joi.string().valid(...EQUIPMENT_VALUES)),
        instructions: Joi.string(),
        notes: Joi.string(),
        image: Joi.string(),
        video: Joi.string(),
        url: Joi.string(),
        source: Joi.string()
            .valid(...EXERCISE_SOURCES)
            .required(),
        ownerId: Joi.string().when('source', {
            is: 'user',
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    })
    return schema.validate(exercise)
}

const validateGymRoutine = (
    routine: Omit<GymRoutineResource, '_id'> & { source: GymRoutineSource },
) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        entries: Joi.array().items(
            Joi.object({
                exerciseId: Joi.string().required(),
                order: Joi.number().required(),
            }),
        ),
        source: Joi.string()
            .valid(...ROUTINE_SOURCES)
            .required(),
        ownerId: Joi.string().when('source', {
            is: 'user',
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
    })
    return schema.validate(routine)
}

export { GymExercise, GymRoutine, validateGymExercise, validateGymRoutine }
export type { GymExerciseResource, GymRoutineResource }
