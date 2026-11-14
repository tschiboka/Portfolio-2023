import { SessionStatuses } from './Session.types'
import type { SessionDefault } from './Session.types'

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
