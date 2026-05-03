import { DefaultOptions } from '@tanstack/react-query'
import { SessionContextValues } from '../../../../src/context/SessionContext/SessionContext.types'

export const mockDefaultSessionContext: SessionContextValues = {
    session: undefined,
    isAuthLoading: false,
    isAuthenticated: false,
    setSession: jest.fn(),
}

export const mockDefaultQueryOptions: DefaultOptions = {
    queries: { retry: false },
    mutations: { retry: false },
}
