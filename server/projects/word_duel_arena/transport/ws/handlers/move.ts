import type { Session, SessionState } from '../../../types'

import { produce } from 'immer'
import { commitSessionState } from '../broadcast'
import { markAliveByDevice } from '../../../domain/session/session'
import { SessionStatuses } from '../../../config/constants/session'
import { MatchStatuses } from '../../../config/constants/game'
import { getSolutionState, type MovePayload } from '../../../domain/session/move'

export type MoveHandlerParams = {
    session: Session
    deviceId: string
    payload: unknown
}

const moveHandler = ({ session, deviceId, payload }: MoveHandlerParams) => {
    const nextState = produce(session.state, (draft: SessionState) => {
        markAliveByDevice(draft, deviceId)
        handleMove(draft, deviceId, payload)
    })

    commitSessionState(session, nextState)
}

function handleMove(draft: SessionState, deviceId: string, payload: unknown) {
    if (draft.status !== SessionStatuses.ACTIVE) return
    if (!draft.currentMatch || draft.currentMatch.status !== MatchStatuses.ACTIVE) return

    getSolutionState(draft, deviceId, payload as MovePayload)
}

export { moveHandler }
