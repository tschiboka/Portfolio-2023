import Joi, { ValidationResult } from 'joi'
import { ROUTINE_SOURCES } from '../../../../common/types'
import type { RoutineValidationInput } from './Routines.types'

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

export const RoutinesSchema = {
    schema,
    validate: (routine: RoutineValidationInput): ValidationResult<RoutineValidationInput> =>
        schema.validate(routine),
}
