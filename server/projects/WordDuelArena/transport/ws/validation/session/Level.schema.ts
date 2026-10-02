import Joi from 'joi'
import type { Level } from '../../../../WordDuelArena.types'

const PlayerRole = ['player1', 'player2', null]

const levelWordSchema = Joi.object({
    status: Joi.string().valid('SOLVED', 'UNSOLVED').required(),
    word: Joi.string().required(),
    mask: Joi.string().required(),
    hintIndices: Joi.array().items(Joi.number().integer().min(0)).required(),
    solvedBy: Joi.string()
        .valid(...PlayerRole)
        .allow(null),
})

const levelSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    difficulty: Joi.number().required(),
    targetWords: Joi.array().items(levelWordSchema).required(),
    extraWords: Joi.array().items(levelWordSchema).required(),
})

export const LevelSchema = {
    schema: levelSchema,
    validate: (level: Level) => levelSchema.validate(level, { abortEarly: false }),
}
