import { Units } from '../../common/utils/DateTime/Units'

/** Floor/constraint for settings fields — single source of truth for schema + model. */
export const SettingsFieldLimits = {
    maxUsers: { min: 1, max: 100 },
    enabledFeatures: { min: 5, max: 20 },
    registrationTokensExpireInMs: { min: Units.Ms.fromMin(30), max: Units.Ms.fromHour(24) },
    sessionTokensExpireInMs: { min: Units.Ms.fromMin(30), max: Units.Ms.fromHour(24) },
} as const
