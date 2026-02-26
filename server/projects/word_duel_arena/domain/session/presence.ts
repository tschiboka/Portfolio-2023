import type { SessionState, PlayerRole } from '../../types'

function applyPresenceRules(
    sessionState: SessionState,
    now: number,
    inactiveTimeout: number,
): boolean {
    let changed = false

    ;(['player1', 'player2'] as PlayerRole[]).forEach((seatKey) => {
        const player = sessionState.players[seatKey]
        if (!player || !player.connected) return

        if (now - player.lastActive > inactiveTimeout) {
            player.connected = false
            changed = true
        }
    })

    return changed
}

export { applyPresenceRules }
