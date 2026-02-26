import type { Session, SessionState, Player, PlayerRole } from '../../types'
import WebSocket from 'ws'

import { validateSession } from './validation/session/session'

interface DeviceWebSocket extends WebSocket {
    deviceId: string
}

function broadcastSessionState(session: Session) {
    for (const ws of session.connections as Set<DeviceWebSocket>) {
        if (ws.readyState !== ws.OPEN) continue
        const payload = {
            type: 'state_update',
            payload: transformSessionForClient(session.state, ws.deviceId),
        }

        ws.send(JSON.stringify(payload))
    }
}

function sendErrorToDevice(session: Session, deviceId: string, message: string) {
    for (const ws of session.connections as Set<DeviceWebSocket>) {
        if (ws.deviceId === deviceId && ws.readyState === ws.OPEN) {
            ws.send(
                JSON.stringify({
                    type: 'error',
                    message,
                }),
            )
            return
        }
    }
}

function commitSessionState(session: Session, nextState: SessionState, deviceId?: string) {
    if (nextState === session.state) return
    const { error } = validateSession(nextState)

    if (error) {
        console.log('Session state validation failed:', error.details[0].message)

        if (deviceId) {
            sendErrorToDevice(session, deviceId, error.details[0].message)
        }

        return
    }

    session.state = nextState
    broadcastSessionState(session)
}

function toPublicPlayer(player: Player | null) {
    return player ? { connected: player.connected, lastActive: player.lastActive } : null
}

function transformSessionForClient(state: SessionState, requestingDeviceId: string) {
    const role = (Object.entries(state.players) as [PlayerRole, Player | null][]).find(
        ([_, player]) => player && player.deviceId === requestingDeviceId,
    )?.[0]

    return {
        id: state.id,
        status: state.status,
        level: {
            ...state.level,
            targetWords: state.level
                ? state.level.targetWords.map((word) => ({
                      ...word,
                      word: word.status === 'SOLVED' ? word.word : undefined,
                      mask: word.status === 'SOLVED' ? undefined : word.mask,
                  }))
                : [],
            extraWords: state.level
                ? state.level.extraWords.map((word) => ({
                      ...word,
                      word: word.status === 'SOLVED' ? word.word : undefined,
                      mask: word.status === 'SOLVED' ? undefined : word.mask,
                  }))
                : [],
        },
        players: {
            player1: toPublicPlayer(state.players.player1),
            player2: toPublicPlayer(state.players.player2),
        },
        currentMatch: state.currentMatch,
        role,
    }
}

export { commitSessionState }
