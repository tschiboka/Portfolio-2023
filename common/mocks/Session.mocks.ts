import { MockBuilder } from '@common-ux/Test'
import { SettingsMocks } from './Settings.mocks'
import { UserMocks } from './User.mocks'
import { TestMocks } from './TestMocks'
import type { Session } from '@shared-context/SessionContext/SessionContext.types'

export const SessionMocks = MockBuilder<Session>({
    user: UserMocks.build(),
    settings: SettingsMocks.build(),
    token: TestMocks.token,
})
