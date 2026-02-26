import Joi from 'joi'
import type { Level } from '../../../../types'

const PlayerRole = ['player1', 'player2', null]

const LevelWordSchema = Joi.object({
    status: Joi.string().valid('SOLVED', 'UNSOLVED').required(),
    word: Joi.string().required(),
    mask: Joi.string().required(),
    solvedBy: Joi.string()
        .valid(...PlayerRole)
        .allow(null),
})

const LevelSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    difficulty: Joi.number().required(),
    targetWords: Joi.array().items(LevelWordSchema).required(),
    extraWords: Joi.array().items(LevelWordSchema).required(),
})

function validateLevel(level: Level) {
    return LevelSchema.validate(level, { abortEarly: false })
}

export { LevelSchema, validateLevel }
