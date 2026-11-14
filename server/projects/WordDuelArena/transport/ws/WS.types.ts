import type WebSocket from 'ws'
import type { Session } from '../../WordDuelArena.types'

export type DeviceWebSocket = WebSocket & {
    sessionId: string
    deviceId: string
}

export type DeviceWebSocketRequest = { type: string; payload?: unknown }

export type HandlerContext = {
    session: Session
    deviceId: string
    payload?: unknown
}
