const Joi = require('joi');

const PlayerSchema = Joi.object({
  deviceId: Joi.string().required(),
  lastActive: Joi.number().required(),
  connected: Joi.boolean().required(),
});

module.exports = {
  PlayerSchema,
};