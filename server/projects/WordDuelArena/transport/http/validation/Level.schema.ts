import Joi from 'joi'
import { LevelConstants } from '../../../config/constants/Level.constants'

interface LevelInput {
    name: string
    targetWords: string[]
    difficulty: number
}

const schema = Joi.object({
    name: Joi.string()
        .required()
        .min(LevelConstants.name.min)
        .max(LevelConstants.name.max),
    targetWords: Joi.array().items(Joi.string()).required(),
    difficulty: Joi.number()
        .min(LevelConstants.difficulty.min)
        .max(LevelConstants.difficulty.max)
        .required(),
})

const validate = (level: LevelInput) => schema.validate(level)

export const LevelSchema = { schema, validate }
