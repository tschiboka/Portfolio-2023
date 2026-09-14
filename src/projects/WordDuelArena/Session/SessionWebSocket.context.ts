import { ContextBuilder, Functions } from '@common-utils'
import type { WebSocketContextType } from './Session.types'

export const SessionWebSocketContext = ContextBuilder.CreateContext<WebSocketContextType>(
    'SessionWebSocket',
    {
        readyState: 0,
        errorMessage: null,
        connect: Functions.noop,
        send: Functions.noop,
    },
)
