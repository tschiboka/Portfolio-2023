const mongoose = require("mongoose")
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    token: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const Token = new mongoose.model("Token", schema)

const validateToken = (token) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    token: Joi.string().required(),
  })
  return schema.validate(token)
}

exports.validateToken = validateToken;
exports.Token = Token