const Joi = require('joi');
const { SessionStatuses } = require('../../../../config/constants/session');
const { PlayerDerivedStatus } = require('../../../../config/constants/game');

const MatchPlayerStatusSchema = Joi.object({
  derivedStatus: Joi.string().valid(...Object.values(PlayerDerivedStatus)).required(),
  resigned: Joi.boolean().required(),
  paused: Joi.boolean().required(),
  points: Joi.number().required(),
});

const MatchSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().valid(...Object.values(SessionStatuses)).required(),
  perPlayerStatus: Joi.object({
    player1: MatchPlayerStatusSchema.required(),
    player2: MatchPlayerStatusSchema.required(),
  }).required(),
  moves: Joi.array().required(), // TODO
  winner: Joi.string().valid('player1', 'player2').allow(null).optional(),
});

module.exports = {
  MatchSchema,
};