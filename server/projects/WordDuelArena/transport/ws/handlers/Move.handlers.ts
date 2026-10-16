import type { MoveHandlerParams, SessionState } from '../../../WordDuelArena.types'
import { produce } from 'immer'
import { BroadcastService } from '../Broadcast.service'
import { markAliveByDevice } from '../../../domain/session/session'
import { SessionConstants } from '../../../config/constants/Session.constants'
import { GameConstants } from '../../../config/constants/Game.constants'
import { MoveService } from '../../../domain/session/Move.service'
import { MovePayload } from '../../../../../../common/types'

const moveHandler = ({ session, deviceId, payload }: MoveHandlerParams) => {
    const nextState = produce(session.state, (draft: SessionState) => {
        markAliveByDevice(draft, deviceId)
        handleMove(draft, deviceId, payload)
    })

    BroadcastService.commit(session, nextState)
}

function handleMove(draft: SessionState, deviceId: string, payload: unknown) {
    if (draft.status !== SessionConstants.statuses.ACTIVE) return
    if (!draft.currentMatch || draft.currentMatch.status !== GameConstants.matchStatuses.ACTIVE)
        return

    MoveService.getSolutionState(draft, deviceId, payload as MovePayload)
}

export const MoveHandlers = {
    move: moveHandler,
}
