import { produce } from 'immer'
import { SessionRepository } from '../persistence/server/Session.repository'
import { BroadcastService } from '../../transport/ws/Broadcast.service'
import { SessionConstants } from '../../config/constants/Session.constants'
import { PresenceService } from '../../domain/session/Presence.service'
import type { Session, SessionState } from '../../WordDuelArena.types'

function startPresenceLoop() {
    setInterval(() => {
        const now = Date.now()

        Object.values(SessionRepository.All).forEach((session: Session) => {
            let changed = false

            const updatedState = produce(session.state, (draft: SessionState) => {
                if (draft.status !== SessionConstants.statuses.ACTIVE) return
                if (PresenceService.applyRules(draft, now, SessionConstants.inactiveTimeoutMs))
                    changed = true
            })

            if (changed) BroadcastService.commit(session, updatedState)
        })
    }, SessionConstants.checkIntervalMs)
}

export const LoopService = { start: startPresenceLoop }
