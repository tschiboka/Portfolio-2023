import { MoveHandlers } from './Move.handlers'
import { JoinHandlers } from './Join.handlers'
import type { MoveHandlerParams, Session } from '../../../WordDuelArena.types'

interface HandlerContext {
    session: Session
    deviceId: string
    payload?: unknown
}

export async function routeMessage(type: string, ctx: HandlerContext) {
    switch (type) {
        case 'join':
            return await JoinHandlers.join(ctx)

        case 'attempt_move':
            return MoveHandlers.move(ctx as MoveHandlerParams)

        default:
            console.warn('Unknown message type:', type)
            return false
    }
}
