/* eslint-disable standards/matching-spec -- TODO [0013] check the convention */
import { produce } from 'immer'
import { MovePayload } from '@common-types'
import { BroadcastService } from '../Broadcast.service'
import { markAliveByDevice, MoveService } from '../../../domain/session'
import { GameConstants, SessionConstants } from '../../../config/constants'
import type { MoveHandlerParams, SessionState } from '../../../WordDuelArena.types'

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
