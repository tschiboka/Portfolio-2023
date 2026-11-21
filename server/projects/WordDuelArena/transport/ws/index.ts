import url from 'url'
import { WebSocketServer } from 'ws'
import { ClientMessage } from '@common-utils'
import { ValidateDeviceSchema } from './validation'
import { routeMessage } from './handlers'
import { LoopService, SessionRepository, WordRepository } from '../../infrastructure'
import { SessionConstants } from '../../config'
import type { Server } from 'http'
import type { DeviceWebSocket, DeviceWebSocketRequest } from './WS.types'

export { BroadcastService } from './Broadcast.service'

export async function initWebSocket(server: Server) {
    const wss = new WebSocketServer({ server })
    await WordRepository.Load()

    LoopService.start()

    wss.on('connection', (ws: DeviceWebSocket, req: { url?: string }) => {
        const { sessionId, deviceId } = url.parse(req.url || '', true).query

        if (!sessionId || !deviceId) {
            ws.close(SessionConstants.closeCodes.missingIds, 'Missing sessionId or deviceId')
            return
        }

        const session = SessionRepository.Get(sessionId as string)
        const result = ValidateDeviceSchema.validate(session, deviceId as string)

        if (!result.allowed) {
            ws.send(JSON.stringify({ type: 'error', message: result.message }))
            setTimeout(() => ws.close(SessionConstants.closeCodes.invalidDevice, result.reason), 0)
            return
        }

        ws.sessionId = sessionId as string
        ws.deviceId = deviceId as string
        session.connections.add(ws)

        routeMessage('join', { session, deviceId: deviceId as string }).catch((err) =>
            console.error(ClientMessage.Failure.Join('session'), err),
        )

        ws.on('message', (message: string) => {
            const request = JSON.parse(message.toString()) as DeviceWebSocketRequest
            routeMessage(request.type, {
                session,
                deviceId: ws.deviceId,
                payload: request.payload,
            }).catch((err) => console.error(ClientMessage.Failure.Handle('message'), err))
        })

        ws.on('close', () => {
            session.connections.delete(ws)
            SessionRepository.CleanupIfEmpty(sessionId as string)
        })
    })
}
