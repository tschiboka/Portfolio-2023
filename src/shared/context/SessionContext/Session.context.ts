import { ContextBuilder, Functions } from '@common-utils'
import type { SessionContextValues } from './SessionContext.types'

export const SessionContext = ContextBuilder.CreateContext<SessionContextValues>('Session', {
    session: undefined,
    isAuthLoading: false,
    isAuthenticated: false,
    setSession: Functions.noop,
})
