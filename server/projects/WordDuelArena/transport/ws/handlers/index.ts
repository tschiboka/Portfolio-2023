import type { MoveHandlerParams, Session } from '../../../WordDuelArena.types'
import { MoveHandlers } from './Move.handlers'
import { joinHandler } from './Join.handlers'

interface HandlerContext {
    session: Session
    deviceId: string
    payload?: unknown
}

async function routeMessage(type: string, ctx: HandlerContext) {
    switch (type) {
        case 'join':
            return await joinHandler(ctx)

        case 'attempt_move':
            return MoveHandlers.move(ctx as MoveHandlerParams)

        default:
            console.warn('Unknown message type:', type)
            return false
    }
}

export default routeMessage
