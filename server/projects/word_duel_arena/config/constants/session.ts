const CHECK_INTERVAL = 5_000
const INACTIVE_TIMEOUT = 30_000

const SessionStatuses = {
    LOBBY: 'LOBBY',
    ACTIVE: 'ACTIVE',
} as const

export { SessionStatuses, CHECK_INTERVAL, INACTIVE_TIMEOUT }
