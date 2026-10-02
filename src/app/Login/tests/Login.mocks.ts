import { vi } from 'vitest'
import { MockSettings, MockUser } from '@common-mocks'

const setSession = vi.fn()

const loginSuccess = {
    token: 'mock-jwt-token',
    user: MockUser.build(),
    settings: [MockSettings.build()],
}

export const LoginMocks = { setSession, loginSuccess }
