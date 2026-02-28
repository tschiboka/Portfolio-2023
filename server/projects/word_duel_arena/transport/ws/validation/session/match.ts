import Joi from 'joi'
import { PlayerDerivedStatus, MatchStatuses } from '../../../../config/constants/game'

const LastWordAttemptSchema = Joi.object({
    word: Joi.string().required(),
    isTarget: Joi.boolean().required(),
    isExtra: Joi.boolean().required(),
}).allow(null)

const MatchPlayerStatusSchema = Joi.object({
    derivedStatus: Joi.string()
        .valid(...Object.values(PlayerDerivedStatus))
        .required(),
    resigned: Joi.boolean().required(),
    paused: Joi.boolean().required(),
    points: Joi.number().required(),
    lastWordAttempt: LastWordAttemptSchema.optional(),
})

const MoveSchema = Joi.object({
    player: Joi.string().valid('player1', 'player2').required(),
    word: Joi.string().required(),
    isTarget: Joi.boolean().required(),
    isExtra: Joi.boolean().required(),
    timestamp: Joi.number().required(),
})

const MatchSchema = Joi.object({
    id: Joi.string().required(),
    status: Joi.string()
        .valid(...Object.values(MatchStatuses))
        .required(),
    perPlayerStatus: Joi.object({
        player1: MatchPlayerStatusSchema.required(),
        player2: MatchPlayerStatusSchema.required(),
    }).required(),
    moves: Joi.array().items(MoveSchema).required(),
    winner: Joi.string().valid('player1', 'player2').allow(null).optional(),
    reason: Joi.string().valid('RESIGN', 'TIMEOUT', 'DRAW').allow(null).optional(),
})

export { MatchSchema }
