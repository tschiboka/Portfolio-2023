const mongoose = require("mongoose");
const Joi = require("joi");
const HALF_AN_HOUR_IN_MS = 60 * 30 // TODO: Create a date utils file and store consts there

const schema = new mongoose.Schema({
    // Maximum number of users allowed to register to the app
    maxUsers: {
        type: Number,
        default: 1,
    },
    enableMaintenanceMode: {
        type: Boolean,
        default: false,
    },
    enableUserRegistration: {
        type: Boolean,
        default: false
    },
    enableAutomaticLogoff: {
        type: Boolean,
        default: false,
    },
    enabledFeatures: { // EG: ALLOW_TOPICS,
        type: Array,
        default: [],
    },
    registrationTokensExpireInMs: {
        type: Number,
        default: HALF_AN_HOUR_IN_MS,
    },
    sessionTokensExpireInMs: {
        type: Number,
        default: HALF_AN_HOUR_IN_MS,
    }
})

const Settings = mongoose.model("Settings", schema)

const validateSettings = (settings) => {
    const schema = Joi.object({
        maxUsers: Joi.number().min(1).positive(),
        enableMaintenanceMode: Joi.boolean(),
        enableUserRegistration: Joi.boolean(),
        enableAutomaticLogoff: Joi.boolean(),
        enabledFeatures: Joi.array().items(Joi.string().min(5).max(20)),
        registrationTokensExpireInMs: Joi.number().min(HALF_AN_HOUR_IN_MS),
        sessionTokensExpireInMs: Joi.number().min(HALF_AN_HOUR_IN_MS),
    })
    
    return schema.validate(settings)
}

module.exports.Settings = Settings
module.exports.validateSettings = validateSettings
module.exports.HALF_AN_HOUR_IN_MS = HALF_AN_HOUR_IN_MS