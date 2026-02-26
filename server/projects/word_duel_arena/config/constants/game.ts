const PlayerDerivedStatus = {
    ACTIVE: 'ACTIVE',
    IDLE: 'IDLE',
    OFFLINE: 'OFFLINE',
    RESIGNED: 'RESIGNED',
    PAUSED: 'PAUSED',
} as const

const MatchStatuses = {
    ACTIVE: 'ACTIVE',
    FINISHED: 'FINISHED',
} as const

const LevelWordStatuses = {
    SOLVED: 'SOLVED',
    UNSOLVED: 'UNSOLVED',
} as const

export { PlayerDerivedStatus, MatchStatuses, LevelWordStatuses }
