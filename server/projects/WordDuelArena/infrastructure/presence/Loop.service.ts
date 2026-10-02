import type { Session, SessionState } from '../../WordDuelArena.types'
import { SessionRepository } from '../persistence/server/Session.repository'
import { commitSessionState } from '../../transport/ws/Broadcast.service'
import {
    CHECK_INTERVAL,
    INACTIVE_TIMEOUT,
    SessionStatuses,
} from '../../config/constants/Session.constants'
import { applyPresenceRules } from '../../domain/session/Presence.service'
import { produce } from 'immer'

function startPresenceLoop() {
    setInterval(() => {
        const now = Date.now()

        Object.values(SessionRepository.All).forEach((session: Session) => {
            let changed = false

            const updatedState = produce(session.state, (draft: SessionState) => {
                if (draft.status !== SessionStatuses.ACTIVE) return
                if (applyPresenceRules(draft, now, INACTIVE_TIMEOUT)) changed = true
            })

            if (changed) commitSessionState(session, updatedState)
        })
    }, CHECK_INTERVAL)
}

export { startPresenceLoop }
