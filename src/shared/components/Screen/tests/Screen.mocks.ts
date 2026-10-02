import { vi, type Mock } from 'vitest'
import { DefaultOptions } from '@tanstack/react-query'
import type { Dictionary } from '@common-utils'
import type { SessionContextValues } from '@shared-context'

const navigate = (globalThis as Dictionary).mockNavigate as Mock

const defaultSessionContext: SessionContextValues = {
    session: undefined,
    isAuthLoading: false,
    isAuthenticated: false,
    setSession: vi.fn(),
}

const defaultQueryOptions: DefaultOptions = {
    queries: { retry: false },
    mutations: { retry: false },
}

export const ScreenMocks = { navigate, defaultSessionContext, defaultQueryOptions }
