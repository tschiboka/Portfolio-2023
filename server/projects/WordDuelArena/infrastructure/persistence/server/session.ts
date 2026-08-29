import type { Session, Sessions, SessionState } from '../../../types'

import { SessionStatuses } from '../../../config/constants/session'
const sessions: Sessions = {}

function getDefaultSessionState(id: string): SessionState {
    return {
        id,
        players: {
            player1: null,
            player2: null,
        },
        status: SessionStatuses.LOBBY,
        level: null,
        currentMatch: null,
        previousMatches: [],
    }
}

function getSession(sessionId: string): Session {
    if (!sessions[sessionId]) {
        sessions[sessionId] = {
            id: sessionId,
            state: getDefaultSessionState(sessionId),
            connections: new Set(),
        }
    }
    return sessions[sessionId]
}

function cleanupSessionIfEmpty(sessionId: string): void {
    const session = sessions[sessionId]
    if (session && session.connections.size === 0) {
        delete sessions[sessionId]
    }
}

export { sessions, getSession, cleanupSessionIfEmpty }
