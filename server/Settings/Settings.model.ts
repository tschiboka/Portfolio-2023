import mongoose from 'mongoose'
import type { ISetting } from './Settings.types'
import { SettingsFieldLimits } from './Settings.constants'

const schema = new mongoose.Schema<ISetting>({
    maxUsers: {
        type: Number,
        default: SettingsFieldLimits.maxUsers.min,
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
        default: SettingsFieldLimits.registrationTokensExpireInMs.min,
    },
    sessionTokensExpireInMs: {
        type: Number,
        default: SettingsFieldLimits.sessionTokensExpireInMs.min,
    },
})

export const SettingsModel = mongoose.model<ISetting>('Settings', schema)
