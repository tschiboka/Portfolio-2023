// Game state types for Word Duel Arena (server-side)

import type WebSocket from 'ws'
import type {
    PlayerRole,
    OptionalPlayerRole,
    LastWordAttempt,
    WdaSessionStatus,
    WdaMatchStatus,
    WdaPlayerDerivedStatus,
    WdaLevelWordStatus,
    WdaMatchPlayerStatus,
    WdaMatchEndReason,
} from '@common/types/projects/wda'

export type { PlayerRole, OptionalPlayerRole, LastWordAttempt }

// --- Session (server-level wrapper) ---

export type Session = {
    id: string
    state: SessionState
    connections: Set<WebSocket>
}

export type Sessions = Record<string, Session>

// --- Statuses (aliased from shared types) ---

export type SessionStatus = WdaSessionStatus
export type MatchStatus = WdaMatchStatus
export type PlayerDerivedStatus = WdaPlayerDerivedStatus
export type LevelWordStatus = WdaLevelWordStatus

// --- Player (server-side includes deviceId) ---

export type Player = {
    deviceId: string
    lastActive: number
    connected: boolean
}

// --- Match (server-side includes moves) ---

export type MatchPlayerStatus = WdaMatchPlayerStatus

export type Match = {
    id: string
    status: MatchStatus
    perPlayerStatus: {
        player1: MatchPlayerStatus
        player2: MatchPlayerStatus
    }
    moves: unknown[]
    winner: OptionalPlayerRole
    reason: WdaMatchEndReason
}

// --- Level (server-side always has both word and mask) ---

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

// --- Session State (top-level Immer draft) ---

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
