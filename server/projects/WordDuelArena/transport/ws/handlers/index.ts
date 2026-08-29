import type { Session } from '../../../types'

import { moveHandler, type MoveHandlerParams } from './move'
import { joinHandler } from './join'

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
            return moveHandler(ctx as MoveHandlerParams)

        default:
            console.warn('Unknown message type:', type)
            return false
    }
}

export default routeMessage
