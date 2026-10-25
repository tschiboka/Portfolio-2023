import Joi from 'joi'
import { SettingsConstants } from './Settings.constants'
import type { ValidationResult } from 'joi'
import type { SettingsInput } from './Settings.types'

const schema = Joi.object({
    maxUsers: Joi.number()
        .min(SettingsConstants.fieldLimits.maxUsers.min)
        .max(SettingsConstants.fieldLimits.maxUsers.max)
        .positive(),
    enableMaintenanceMode: Joi.boolean(),
    enableUserRegistration: Joi.boolean(),
    enableAutomaticLogoff: Joi.boolean(),
    enabledFeatures: Joi.array()
        .unique()
        .items(
            Joi.string()
                .min(SettingsConstants.fieldLimits.enabledFeatures.min)
                .max(SettingsConstants.fieldLimits.enabledFeatures.max),
        ),
    registrationTokensExpireInMs: Joi.number()
        .min(SettingsConstants.fieldLimits.registrationTokensExpireInMs.min)
        .max(SettingsConstants.fieldLimits.registrationTokensExpireInMs.max),
    sessionTokensExpireInMs: Joi.number()
        .min(SettingsConstants.fieldLimits.sessionTokensExpireInMs.min)
        .max(SettingsConstants.fieldLimits.sessionTokensExpireInMs.max),
})

export const SettingsSchema = {
    validate: (settings: SettingsInput): ValidationResult<SettingsInput> =>
        schema.validate(settings),
    schema,
}
