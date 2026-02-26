// Game state types for Word Duel Arena (server-side)
// Keep in sync with FE: src/components/pages/Misc/WordDuelArena/Session/Session.types.ts

import type WebSocket from 'ws'

// --- Session (server-level wrapper) ---

export type Session = {
    id: string
    state: SessionState
    connections: Set<WebSocket>
}

export type Sessions = Record<string, Session>

export type PlayerRole = 'player1' | 'player2'
export type OptionalPlayerRole = PlayerRole | null

// --- Statuses ---

export type SessionStatus = 'LOBBY' | 'ACTIVE'

export type MatchStatus = 'ACTIVE' | 'FINISHED'

export type PlayerDerivedStatus = 'ACTIVE' | 'IDLE' | 'OFFLINE' | 'RESIGNED' | 'PAUSED'

export type LevelWordStatus = 'SOLVED' | 'UNSOLVED'

// --- Player ---

export type Player = {
    deviceId: string
    lastActive: number
    connected: boolean
}

// --- Match ---

export type LastWordAttempt = {
    word: string
    isTarget: boolean
    isExtra: boolean
}

export type MatchPlayerStatus = {
    derivedStatus: PlayerDerivedStatus
    resigned: boolean
    paused: boolean
    points: number
    lastWordAttempt?: LastWordAttempt | null
}

export type Match = {
    id: string
    status: MatchStatus
    perPlayerStatus: {
        player1: MatchPlayerStatus
        player2: MatchPlayerStatus
    }
    moves: unknown[]
    winner: OptionalPlayerRole
}

// --- Level ---

export type LevelWord = {
    word: string
    mask: string
    status: LevelWordStatus
    solvedBy: OptionalPlayerRole
}

export type Level = {
    id: string
    name: string
    difficulty: number
    targetWords: LevelWord[]
    extraWords: LevelWord[]
}

// --- Session (top-level Immer draft) ---

export type SessionState = {
    id: string
    status: SessionStatus
    players: {
        player1: Player | null
        player2: Player | null
    }
    level: Level | null
    currentMatch: Match | null
    previousMatches: Match[]
}
