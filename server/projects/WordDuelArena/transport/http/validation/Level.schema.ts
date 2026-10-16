import Joi from 'joi'

interface LevelInput {
    name: string
    targetWords: string[]
    difficulty: number
}

const schema = Joi.object({
    name: Joi.string().required().min(4).max(16),
    targetWords: Joi.array().items(Joi.string()).required(),
    difficulty: Joi.number().min(1).max(10).required(),
})

const validate = (level: LevelInput) => schema.validate(level)

export const LevelSchema = { schema, validate }
