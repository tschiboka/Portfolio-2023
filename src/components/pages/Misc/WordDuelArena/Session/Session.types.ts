import type { WdaClientSessionState, WdaWsRequest, WdaWsResponse } from '@common/types/projects/wda'

// Re-export shared types with local names
export type {
    PlayerRole,
    OptionalPlayerRole,
    LastWordAttempt,
    WdaPublicPlayer as Player,
    WdaMatchPlayerStatus as MatchPlayerStatus,
    WdaMatch as Match,
    WdaUnsolvedLevelWord as UnsolvedLevelWord,
    WdaSolvedLevelWord as SolvedLevelWord,
    WdaPlayableLevelWord as PlayableLevelWord,
    WdaPlayableLevel as Level,
    WdaLevelWordStatus as LevelWordStatus,
    WdaClientSessionState as WebSocketSessionState,
    WdaWsRequest as WebSocketRequest,
    WdaWsResponse as WebSocketResponse,
} from '@common/types/projects/wda'

// Re-export shared constants with local names
export {
    WdaSessionStatuses as SessionStatuses,
    WdaMatchStatuses as MatchStatuses,
    WdaPlayerDerivedStatuses as PlayerDerivedStatus,
    WdaWsRequestTypes as WebSocketRequestType,
    WdaWsResponseTypes as WebSocketResponseType,
} from '@common/types/projects/wda'

// --- FE-only types ---

export type SessionContextType = {
    sessionId: string
    deviceId: string
    allowKeyboardInput: boolean
    sessionState?: WdaClientSessionState
    setSessionState: (state: WdaClientSessionState) => void
}

export type WebSocketContextType = {
    lastState?: WdaWsResponse
    readyState: number
    errorMessage: string | null
    connect: () => void
    send: (msg: WdaWsRequest) => void
}
