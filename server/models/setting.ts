import mongoose, { Document } from 'mongoose'
import Joi from 'joi'

const HALF_AN_HOUR_IN_MS = 60 * 30 // TODO: Create a date utils file and store consts there

interface ISetting extends Document {
    maxUsers: number
    enableMaintenanceMode: boolean
    enableUserRegistration: boolean
    enableAutomaticLogoff: boolean
    enabledFeatures: string[]
    registrationTokensExpireInMs: number
    sessionTokensExpireInMs: number
}

const schema = new mongoose.Schema<ISetting>({
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
        default: false,
    },
    enableAutomaticLogoff: {
        type: Boolean,
        default: false,
    },
    enabledFeatures: {
        type: [String],
        default: [],
    },
    registrationTokensExpireInMs: {
        type: Number,
        default: HALF_AN_HOUR_IN_MS,
    },
    sessionTokensExpireInMs: {
        type: Number,
        default: HALF_AN_HOUR_IN_MS,
    },
})

const Settings = mongoose.model<ISetting>('Settings', schema)

interface SettingsInput {
    maxUsers?: number
    enableMaintenanceMode?: boolean
    enableUserRegistration?: boolean
    enableAutomaticLogoff?: boolean
    enabledFeatures?: string[]
    registrationTokensExpireInMs?: number
    sessionTokensExpireInMs?: number
}

const validateSettings = (settings: SettingsInput) => {
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

export { Settings, validateSettings, HALF_AN_HOUR_IN_MS }
