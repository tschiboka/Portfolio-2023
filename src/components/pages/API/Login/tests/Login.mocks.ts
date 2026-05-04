import { vi } from 'vitest'

export const mockSetSession = vi.fn()

export const defaultSettings = {
    maxUsers: 10,
    enableMaintenanceMode: false,
    enableUserRegistration: true,
    enableAutomaticLogoff: false,
    enabledFeatures: [] as string[],
    registrationTokensExpireInMs: 86400000,
    sessionTokensExpireInMs: 86400000,
}

export const mockUser = {
    id: '123',
    userName: 'testuser',
    email: 'test@example.com',
    password: '',
    fullName: 'Test User',
    isAdmin: false,
}

export const mockLoginSuccess = {
    success: true,
    token: 'mock-jwt-token',
    user: mockUser,
    settings: [defaultSettings],
}
