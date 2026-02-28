// Shared types for Word Duel Arena (identical on FE and BE)

export type PlayerRole = 'player1' | 'player2'
export type OptionalPlayerRole = PlayerRole | null

export type LastWordAttempt = {
    word: string
    isTarget: boolean
    isExtra: boolean
}

export type MovePayload = {
    attempt: string
}

// --- WebSocket Session Status Constants ---

export const WdaSessionStatuses = {
    LOBBY: 'LOBBY',
    ACTIVE: 'ACTIVE',
} as const
export type WdaSessionStatus = (typeof WdaSessionStatuses)[keyof typeof WdaSessionStatuses]

export const WdaMatchStatuses = {
    WAITING: 'WAITING',
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED',
} as const
export type WdaMatchStatus = (typeof WdaMatchStatuses)[keyof typeof WdaMatchStatuses]

export const WdaPlayerDerivedStatuses = {
    ACTIVE: 'ACTIVE',
    IDLE: 'IDLE',
    OFFLINE: 'OFFLINE',
    RESIGNED: 'RESIGNED',
    PAUSED: 'PAUSED',
} as const
export type WdaPlayerDerivedStatus =
    (typeof WdaPlayerDerivedStatuses)[keyof typeof WdaPlayerDerivedStatuses]

export const WdaLevelWordStatuses = {
    SOLVED: 'SOLVED',
    UNSOLVED: 'UNSOLVED',
} as const
export type WdaLevelWordStatus = (typeof WdaLevelWordStatuses)[keyof typeof WdaLevelWordStatuses]

// --- WebSocket Wire Protocol ---

export const WdaWsRequestTypes = {
    PING: 'ping',
    ATTEMPT_MOVE: 'attempt_move',
} as const
export type WdaWsRequestType = (typeof WdaWsRequestTypes)[keyof typeof WdaWsRequestTypes]

export const WdaWsResponseTypes = {
    STATE_UPDATE: 'state_update',
    ERROR: 'error',
} as const
export type WdaWsResponseType = (typeof WdaWsResponseTypes)[keyof typeof WdaWsResponseTypes]

export type WdaWsRequest =
    | { type: typeof WdaWsRequestTypes.PING }
    | { type: typeof WdaWsRequestTypes.ATTEMPT_MOVE; payload: MovePayload }

export type WdaWsResponse = {
    type: WdaWsResponseType
    payload?: WdaClientSessionState
    message?: string
}

// --- Public Game Entities (sent over the wire) ---

export type WdaPublicPlayer = {
    lastActive: number
    connected: boolean
}

export type WdaMatchPlayerStatus = {
    derivedStatus: WdaPlayerDerivedStatus
    resigned: boolean
    paused: boolean
    points: number
    lastWordAttempt?: LastWordAttempt
}

export type WdaMatchEndReason = 'RESIGN' | 'TIMEOUT' | 'DRAW' | null

export type WdaMatch = {
    id: string
    status: WdaMatchStatus
    perPlayerStatus: {
        player1: WdaMatchPlayerStatus
        player2: WdaMatchPlayerStatus
    }
    winner: OptionalPlayerRole
    reason: WdaMatchEndReason
}

export type WdaUnsolvedLevelWord = {
    status: 'UNSOLVED'
    mask: string
    hintIndices: number[]
    solvedBy: OptionalPlayerRole
}

export type WdaSolvedLevelWord = {
    status: 'SOLVED'
    word: string
    solvedBy: OptionalPlayerRole
}

export type WdaPlayableLevelWord = WdaSolvedLevelWord | WdaUnsolvedLevelWord

export type WdaPlayableLevel = {
    id: string
    name: string
    difficulty: number
    targetWords: WdaPlayableLevelWord[]
    extraWords: WdaPlayableLevelWord[]
}

export type WdaClientSessionState = {
    id: string
    role?: OptionalPlayerRole
    status: WdaSessionStatus
    players?: {
        player1?: WdaPublicPlayer | null
        player2?: WdaPublicPlayer | null
    }
    level?: WdaPlayableLevel
    currentMatch?: WdaMatch | null
    previousMatches?: WdaMatch[]
}

// --- Level HTTP Types ---

// WDA error shape (no success field, just message)
export type WdaErrorResponse = {
    message: string
}

// Entity: level list item
export type WdaLevelSummary = {
    name: string
    displayName: string
    difficulty: number
}

// Entity: full level from DB
export type WdaLevel = {
    name: string
    targetWords: string[]
    difficulty: number
}

// GET /level/name
export type GetWdaLevelsResponse = {
    levels: WdaLevelSummary[]
}

// GET /level/name/:name
export type GetWdaLevelParams = {
    name: string
}

// POST /level
export type PostWdaLevelRequest = {
    name: string
    targetWords: string[]
    difficulty: number
}

export type PostWdaLevelResponse = {
    data: { message: string; level: WdaLevel }
}

// --- Word HTTP Types ---

// GET /word/list
export type GetWdaWordListResponse = string[]

// GET /word/anagrams
export type GetWdaAnagramMapResponse = Record<string, string[]>

// GET /word/frequencies
export type GetWdaFrequenciesResponse = Record<string, number>
