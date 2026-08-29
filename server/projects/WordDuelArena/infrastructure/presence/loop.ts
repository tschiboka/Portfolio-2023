import type { Session, Sessions, SessionState } from '../../types'

import { sessions } from '../persistence/server/session'
import { commitSessionState } from '../../transport/ws/broadcast'
import { CHECK_INTERVAL, INACTIVE_TIMEOUT, SessionStatuses } from '../../config/constants/session'
import { applyPresenceRules } from '../../domain/session/presence'
import { produce } from 'immer'

function startPresenceLoop() {
    setInterval(() => {
        const now = Date.now()

        Object.values(sessions).forEach((session: Session) => {
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
