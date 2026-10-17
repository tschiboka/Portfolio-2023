import Joi from 'joi'
import { MatchSchema } from './Match.schema'
import { PlayerSchema } from './Player.schema'
import { LevelSchema } from './Level.schema'
import { SessionConstants } from '../../../../config/constants/Session.constants'
import type { SessionState } from '../../../../WordDuelArena.types'

const SessionStateSchema = Joi.object({
    id: Joi.string().required(),
    status: Joi.string()
        .valid(...Object.values(SessionConstants.statuses))
        .required(),
    players: Joi.object({
        player1: PlayerSchema.allow(null).optional(),
        player2: PlayerSchema.allow(null).optional(),
    }).required(),
    level: LevelSchema.schema.allow(null).optional(),
    currentMatch: MatchSchema.allow(null).optional(),
    previousMatches: Joi.array().items(MatchSchema).optional(),
    connections: Joi.any(), // WARNING: cannot validate Set<WebSocket> in Joi
})

const validateSession = (state: SessionState) => SessionStateSchema.validate(state)

export { validateSession }
