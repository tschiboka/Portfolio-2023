import type { Server } from 'http'
import type WebSocket from 'ws'
import { WebSocketServer } from 'ws'
import url from 'url'
import { ClientMessage } from '@common-utils'
import { startPresenceLoop } from '../../infrastructure/presence/Loop.service'
import { validateDeviceConnection } from './validation/connection/ValidateDevice.schema'
import routeMessage from './handlers'
import {
    getSession,
    cleanupSessionIfEmpty,
} from '../../infrastructure/persistence/server/Session.repository'
import { loadWordResources } from '../../infrastructure/resources/Word.repository'

interface DeviceWebSocket extends WebSocket {
    sessionId: string
    deviceId: string
}

type DeviceWebSocketRequest = { type: string; payload?: unknown }

export default async function initWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })
    await loadWordResources()

    startPresenceLoop()

    wss.on('connection', (ws: DeviceWebSocket, req: { url?: string }) => {
        const { sessionId, deviceId } = url.parse(req.url || '', true).query

        if (!sessionId || !deviceId) {
            ws.close(1008, 'Missing sessionId or deviceId')
            return
        }

        const session = getSession(sessionId as string)
        const result = validateDeviceConnection(session, deviceId as string)

        if (!result.allowed) {
            ws.send(JSON.stringify({ type: 'error', message: result.message }))
            setTimeout(() => ws.close(4001, result.reason), 0)
            return
        }

        ws.sessionId = sessionId as string
        ws.deviceId = deviceId as string
        session.connections.add(ws)

        routeMessage('join', { session, deviceId: deviceId as string }).catch((err) => {
            console.error(ClientMessage.Failure.Join('session'), err)
        })

        ws.on('message', (message: string) => {
            const request = JSON.parse(message.toString()) as DeviceWebSocketRequest
            routeMessage(request.type, {
                session,
                deviceId: ws.deviceId,
                payload: request.payload,
            }).catch((err) => {
                console.error(ClientMessage.Failure.Handle('message'), err)
            })
        })

        ws.on('close', () => {
            session.connections.delete(ws)
            cleanupSessionIfEmpty(sessionId as string)
        })
    })
}
