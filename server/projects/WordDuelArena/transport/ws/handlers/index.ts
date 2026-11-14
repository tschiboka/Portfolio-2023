import { MoveHandlers } from './Move.handlers'
import { JoinHandlers } from './Join.handlers'
import type { HandlerContext } from '../WS.types'
import type { MoveHandlerParams } from '../../../WordDuelArena.types'

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
