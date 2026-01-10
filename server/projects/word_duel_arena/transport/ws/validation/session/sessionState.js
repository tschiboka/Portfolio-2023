const Joi = require('joi');
const { SessionStatuses, PlayerDerivedStatus } = require('../../../../config/constants');

const PlayerSchema = Joi.object({
  deviceId: Joi.string().required(),
  lastActive: Joi.number().required(),
  connected: Joi.boolean().required(),
});

const MatchPlayerStatusSchema = Joi.object({
  derivedStatus: Joi.string().valid(...Object.values(PlayerDerivedStatus)).required(),
  resigned: Joi.boolean().required(),
  paused: Joi.boolean().required(),
});

const MatchSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().valid(...Object.values(SessionStatuses)).required(),
  perPlayerStatus: Joi.object({
    player1: MatchPlayerStatusSchema.required(),
    player2: MatchPlayerStatusSchema.required(),
  }).required(),
  moves: Joi.array().required(), // TODO
  winner: Joi.string().valid('player1', 'player2').optional(),
});

const SessionStateSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().valid(...Object.values(SessionStatuses)).required(),
  players: Joi.object({
    player1: PlayerSchema.allow(null).optional(),
    player2: PlayerSchema.allow(null).optional(),
  }).required(),
  currentMatch: MatchSchema.optional(),
  previousMatches: Joi.array().items(MatchSchema).optional(),
  connections: Joi.any(), // cannot validate Set<WebSocket> in Joi
});

const validateSessionState = (state) => SessionStateSchema.validate(state);

module.exports = {
  validateSessionState,
};
