import type { Server } from 'http'
import type WebSocket from 'ws'

import { WebSocketServer } from 'ws'
import url from 'url'
import { startPresenceLoop } from '../../infrastructure/presence/loop'
import { validateDeviceConnection } from './validation/connection/validateDevice'
import routeMessage from './handlers'
import { getSession, cleanupSessionIfEmpty } from '../../infrastructure/persistence/server/session'
import { loadWordResources } from '../../infrastructure/resources/word'

interface DeviceWebSocket extends WebSocket {
    sessionId: string
    deviceId: string
}

export default async function initWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })
    await loadWordResources()

    startPresenceLoop()

    wss.on('connection', async (ws: DeviceWebSocket, req: { url?: string }) => {
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

        await routeMessage('join', { session, deviceId: deviceId as string })

        ws.on('message', async (msg: string) => {
            const parsed = JSON.parse(msg.toString())
            await routeMessage(parsed.type, {
                session,
                deviceId: ws.deviceId,
                payload: parsed.payload,
            })
        })

        ws.on('close', () => {
            session.connections.delete(ws)
            cleanupSessionIfEmpty(sessionId as string)
        })
    })
}
