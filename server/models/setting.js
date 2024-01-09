const mongoose = require("mongoose");
const Joi = require("joi");
const HALF_AN_HOUR_IN_SEC = 60 * 30

const schema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
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
    automaticLogOffTimeInMins: {
        type: Number,
        default: -1,
    },
    enableUserTheme: { // EG: Seasonal (Xmas, Events...)
        type: String,
        default: "DEFAULT",
        minLength: 1,
        maxLength: 20,
        uppercase: true,
        trim: true,
    },
    enableFeature: {
        type: String,
        default: "NONE",
        minLength: 1,
        maxLength: 20,
        uppercase: true,
        trim: true,
    },
    registrationTokensExpireInMs: {
        type: Number,
        default: 3600,
    },
    sessionTokensExpireInMs: {
        type: Number,
        default: 3600,
    }
})

const Settings = mongoose.model("Settings", schema)

const validateSettings = (settings) => {
    const schema = Joi.object({
        isAdmin: Joi.boolean(),
        maxUsers: Joi.number().min(1),
        enableMaintenanceMode: Joi.boolean(),
        enableUserRegistration: Joi.boolean(),
        enableAutomaticLogoff: Joi.boolean(),
        automaticLogOffTimeInMins: Joi.number(),
        enableUserTheme: Joi.string(),
        enableFeature: Joi.string(),
        registrationTokensExpireInMs: Joi.number().min(HALF_AN_HOUR_IN_MS),
        sessionTokensExpireInMs: Joi.number().min(HALF_AN_HOUR_IN_MS),
    })
    
    return schema.validate(settings)
}

module.exports.Settings = Settings
module.exports.validateSettings = validateSettings
module.exports.HALF_AN_HOUR_IN_SEC = HALF_AN_HOUR_IN_SEC