/* eslint-disable standards/matching-spec -- TODO [0013] check the convention */
import Joi from 'joi'
import { LevelConstants } from '../../../config/constants'
import type { LevelInput } from '../../../model'

const schema = Joi.object({
    name: Joi.string().required().min(LevelConstants.name.min).max(LevelConstants.name.max),
    targetWords: Joi.array().items(Joi.string()).required(),
    difficulty: Joi.number()
        .min(LevelConstants.difficulty.min)
        .max(LevelConstants.difficulty.max)
        .required(),
})

const validate = (level: LevelInput) => schema.validate(level)

export const LevelSchema = { schema, validate }
