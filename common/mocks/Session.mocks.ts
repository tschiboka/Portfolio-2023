import { MockBuilder } from '@common-ux/Test'
import { MockSettings } from './Settings.mocks'
import { MockUser } from './User.mocks'
import { TestMocks } from './TestMocks'
import type { Session } from '@shared-context/SessionContext/SessionContext.types'

export const MockSession = MockBuilder<Session>({
    user: MockUser.build(),
    settings: MockSettings.build(),
    token: TestMocks.token,
})
