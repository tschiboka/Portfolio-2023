import { SessionStatuses } from './Session.types'
import type { WebSocketSessionState } from './Session.types'

type SessionDefault = { state: WebSocketSessionState }
export const SessionDefaults: SessionDefault = {
    state: {
        id: '',
        role: undefined,
        status: SessionStatuses.LOBBY,
        players: {
            player1: undefined,
            player2: undefined,
        },
        level: undefined,
        currentMatch: undefined,
        previousMatches: [],
    },
}
