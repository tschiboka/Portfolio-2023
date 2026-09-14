import { vi, type Mock } from 'vitest'
import { DefaultOptions } from '@tanstack/react-query'
import type { Dictionary } from '@common-utils'
import type { SessionContextValues } from '@shared-context'

export const mockNavigate = (globalThis as Dictionary).mockNavigate as Mock

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
