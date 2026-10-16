import { vi } from 'vitest'
import { SettingsMocks, UserMocks } from '@common-mocks'

const setSession = vi.fn()

const loginSuccess = {
    token: 'mock-jwt-token',
    user: UserMocks.build(),
    settings: [SettingsMocks.build()],
}

export const LoginMocks = { setSession, loginSuccess }
