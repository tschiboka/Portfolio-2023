const mongoose = require("mongoose")
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = mongoose.Schema({
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
    token: Joi.string().required(),
  })
  return schema.validate(token)
}

exports.validateToken = validateToken;
exports.Token = Token