import { DateTime } from '@common-utils'

/** Floor/constraint for settings fields â€” single source of truth for schema + model. */
export const SettingsFieldLimits = {
    maxUsers: { min: 1, max: 100 },
    enabledFeatures: { min: 5, max: 20 },
    registrationTokensExpireInMs: {
        min: DateTime.Units.Ms.fromMin(30),
        max: DateTime.Units.Ms.fromHour(24),
    },
    sessionTokensExpireInMs: {
        min: DateTime.Units.Ms.fromMin(30),
        max: DateTime.Units.Ms.fromHour(24),
    },
} as const
