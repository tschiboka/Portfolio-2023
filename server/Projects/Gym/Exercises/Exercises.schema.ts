import { DIFFICULTY_LEVELS, EXERCISE_SOURCES, EXERCISE_TYPES } from '../../../../common/types'
import { EQUIPMENT_VALUES, MUSCLE_GROUP_VALUES } from './Exercises.constants'
import type { ExerciseValidationInput } from './Exercises.types'
import Joi from 'joi'

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

const validate = (exercise: ExerciseValidationInput) => schema.validate(exercise)

export const ExerciseSchema = { schema, validate }
