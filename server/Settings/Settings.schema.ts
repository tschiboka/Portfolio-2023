import Joi from 'joi'
import type { SettingsInput } from './Settings.types'
import { SettingsFieldLimits } from './Settings.constants'

const schema = Joi.object({
    maxUsers: Joi.number()
        .min(SettingsFieldLimits.maxUsers.min)
        .max(SettingsFieldLimits.maxUsers.max)
        .positive(),
    enableMaintenanceMode: Joi.boolean(),
    enableUserRegistration: Joi.boolean(),
    enableAutomaticLogoff: Joi.boolean(),
    enabledFeatures: Joi.array()
        .unique()
        .items(
            Joi.string()
                .min(SettingsFieldLimits.enabledFeatures.min)
                .max(SettingsFieldLimits.enabledFeatures.max),
        ),
    registrationTokensExpireInMs: Joi.number()
        .min(SettingsFieldLimits.registrationTokensExpireInMs.min)
        .max(SettingsFieldLimits.registrationTokensExpireInMs.max),
    sessionTokensExpireInMs: Joi.number()
        .min(SettingsFieldLimits.sessionTokensExpireInMs.min)
        .max(SettingsFieldLimits.sessionTokensExpireInMs.max),
})

export const SettingsSchema = {
    validate: (settings: SettingsInput) => schema.validate(settings),
    schema,
}
