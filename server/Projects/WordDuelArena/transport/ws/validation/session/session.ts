import Joi from 'joi'
import type { SessionState } from '../../../../types'

import { SessionStatuses } from '../../../../config/constants/session'
import { MatchSchema } from './match'
import { PlayerSchema } from './player'
import { LevelSchema } from './level'

const SessionStateSchema = Joi.object({
    id: Joi.string().required(),
    status: Joi.string()
        .valid(...Object.values(SessionStatuses))
        .required(),
    players: Joi.object({
        player1: PlayerSchema.allow(null).optional(),
        player2: PlayerSchema.allow(null).optional(),
    }).required(),
    level: LevelSchema.allow(null).optional(),
    currentMatch: MatchSchema.allow(null).optional(),
    previousMatches: Joi.array().items(MatchSchema).optional(),
    connections: Joi.any(), // WARNING: cannot validate Set<WebSocket> in Joi
})

const validateSession = (state: SessionState) => SessionStateSchema.validate(state)

export { validateSession }
