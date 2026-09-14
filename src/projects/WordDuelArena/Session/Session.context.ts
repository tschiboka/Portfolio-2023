import { ContextBuilder, Functions } from '@common-utils'
import { SessionDefaults } from './Session.defaults'
import type { SessionContextType } from './Session.types'

export const SessionContext = ContextBuilder.CreateContext<SessionContextType>('Session', {
    sessionId: '',
    deviceId: '',
    allowKeyboardInput: true,
    sessionState: SessionDefaults.state,
    setSessionState: Functions.noop,
})
