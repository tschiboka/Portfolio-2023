import { vi, type Mock } from 'vitest'
import { DefaultOptions } from '@tanstack/react-query'
import { SessionContextValues } from '../../../../src/context/SessionContext/SessionContext.types'

export const mockNavigate = (globalThis as Record<string, unknown>).mockNavigate as Mock

export const mockDefaultSessionContext: SessionContextValues = {
    session: undefined,
    isAuthLoading: false,
    isAuthenticated: false,
    setSession: vi.fn(),
}

export const mockDefaultQueryOptions: DefaultOptions = {
    queries: { retry: false },
    mutations: { retry: false },
}
