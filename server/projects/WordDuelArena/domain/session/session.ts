import type { SessionState } from '../../types'

import { produce } from 'immer'
import { SessionStatuses } from '../../config/constants/session'

const initialiseSession = (state: SessionState, deviceId: string): SessionState =>
    produce(state, (draft: SessionState) => {
        const lastActive = Date.now()
        const isDeviceAlreadySeated =
            draft.players.player1?.deviceId === deviceId ||
            draft.players.player2?.deviceId === deviceId

        if (isDeviceAlreadySeated) markAliveByDevice(draft, deviceId)
        else if (!draft.players.player1) {
            draft.players.player1 = { deviceId, lastActive, connected: true }
        } else if (!draft.players.player2) {
            draft.players.player2 = { deviceId, lastActive, connected: true }
        }

        const hasTwoPlayers = draft.players.player1 && draft.players.player2
        if (hasTwoPlayers && draft.status) draft.status = SessionStatuses.ACTIVE
    })

function markAliveByDevice(draft: SessionState, deviceId: string): void {
    const now = Date.now()

    if (draft.players.player1?.deviceId === deviceId) {
        draft.players.player1.lastActive = now
        draft.players.player1.connected = true
    } else if (draft.players.player2?.deviceId === deviceId) {
        draft.players.player2.lastActive = now
        draft.players.player2.connected = true
    }
}

export { initialiseSession, markAliveByDevice }
