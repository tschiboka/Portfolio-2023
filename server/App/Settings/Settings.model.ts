import mongoose from 'mongoose'
import { SettingsConstants } from './Settings.constants'
import type { ISetting } from './Settings.types'

const schema = new mongoose.Schema<ISetting>({
    maxUsers: {
        type: Number,
        default: SettingsConstants.fieldLimits.maxUsers.min,
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
        default: SettingsConstants.fieldLimits.registrationTokensExpireInMs.min,
    },
    sessionTokensExpireInMs: {
        type: Number,
        default: SettingsConstants.fieldLimits.sessionTokensExpireInMs.min,
    },
})

export const SettingsModel = mongoose.model<ISetting>('Settings', schema)
