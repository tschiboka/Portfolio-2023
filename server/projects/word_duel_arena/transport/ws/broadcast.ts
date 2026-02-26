import type { Session, SessionState, Player, PlayerRole, Match, LevelWord } from '../../types'
import type {
    WdaClientSessionState,
    WdaPublicPlayer,
    WdaMatch,
    WdaPlayableLevelWord,
    WdaWsResponse,
} from '@common/types/projects/wda'
import { WdaWsResponseTypes } from '@common/types/projects/wda'
import WebSocket from 'ws'

import { validateSession } from './validation/session/session'

interface DeviceWebSocket extends WebSocket {
    deviceId: string
}

function broadcastSessionState(session: Session) {
    for (const ws of session.connections as Set<DeviceWebSocket>) {
        if (ws.readyState !== ws.OPEN) continue
        const payload: WdaWsResponse = {
            type: WdaWsResponseTypes.STATE_UPDATE,
            payload: transformSessionForClient(session.state, ws.deviceId),
        }

        ws.send(JSON.stringify(payload))
    }
}

function sendErrorToDevice(session: Session, deviceId: string, message: string) {
    for (const ws of session.connections as Set<DeviceWebSocket>) {
        if (ws.deviceId === deviceId && ws.readyState === ws.OPEN) {
            const response: WdaWsResponse = {
                type: WdaWsResponseTypes.ERROR,
                message,
            }
            ws.send(JSON.stringify(response))
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

function toPublicPlayer(player: Player | null): WdaPublicPlayer | null {
    return player ? { connected: player.connected, lastActive: player.lastActive } : null
}

function toPublicMatch(match: Match): WdaMatch {
    const { moves, ...publicMatch } = match
    return publicMatch
}

function toPlayableLevelWord(word: LevelWord): WdaPlayableLevelWord {
    if (word.status === 'SOLVED') {
        return { status: 'SOLVED', word: word.word, solvedBy: word.solvedBy }
    }
    return { status: 'UNSOLVED', mask: word.mask, solvedBy: word.solvedBy }
}

function transformSessionForClient(
    state: SessionState,
    requestingDeviceId: string,
): WdaClientSessionState {
    const role = (Object.entries(state.players) as [PlayerRole, Player | null][]).find(
        ([_, player]) => player && player.deviceId === requestingDeviceId,
    )?.[0]

    return {
        id: state.id,
        status: state.status,
        level: state.level
            ? {
                  ...state.level,
                  targetWords: state.level.targetWords.map(toPlayableLevelWord),
                  extraWords: state.level.extraWords.map(toPlayableLevelWord),
              }
            : undefined,
        players: {
            player1: toPublicPlayer(state.players.player1),
            player2: toPublicPlayer(state.players.player2),
        },
        currentMatch: state.currentMatch ? toPublicMatch(state.currentMatch) : null,
        previousMatches: state.previousMatches.map(toPublicMatch),
        role,
    }
}

export { commitSessionState }
