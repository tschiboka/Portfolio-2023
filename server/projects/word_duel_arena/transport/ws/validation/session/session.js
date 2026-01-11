const Joi = require('joi');
const { SessionStatuses } = require('../../../../config/constants/session');
const { MatchSchema } = require('./match');
const { PlayerSchema } = require('./player');
const { LevelSchema } = require('./level');

const SessionStateSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().valid(...Object.values(SessionStatuses)).required(),
  players: Joi.object({
    player1: PlayerSchema.allow(null).optional(),
    player2: PlayerSchema.allow(null).optional(),
  }).required(),
  level: LevelSchema.allow(null).optional(),
  currentMatch: MatchSchema.optional(),
  previousMatches: Joi.array().items(MatchSchema).optional(),
  connections: Joi.any(), // cannot validate Set<WebSocket> in Joi
});

const validateSession = (state) => SessionStateSchema.validate(state);

module.exports = {
  validateSession,
};
