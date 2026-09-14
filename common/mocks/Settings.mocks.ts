import { MockBuilder } from '@common-ux/Test'
import { DateTime } from '@common-utils'
import type { Settings } from '@common-types'

export const MockSettings = MockBuilder<Settings>({
    maxUsers: 10,
    enableMaintenanceMode: false,
    enableUserRegistration: true,
    enableAutomaticLogoff: false,
    enabledFeatures: [],
    registrationTokensExpireInMs: DateTime.Units.Ms.fromDay(),
    sessionTokensExpireInMs: DateTime.Units.Ms.fromDay(),
})
