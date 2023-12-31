const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
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
    })
    
    return schema.validate(settings)
}

module.exports.Settings = Settings
module.exports.validateSettings = validateSettings