import Joi from 'joi'

interface LevelInput {
    name: string
    targetWords: string[]
    difficulty: number
}

function validateLevel(level: LevelInput) {
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(16),
        targetWords: Joi.array().items(Joi.string()).required(),
        difficulty: Joi.number().min(1).max(10).required(),
    })

    return schema.validate(level)
}

export { validateLevel }
