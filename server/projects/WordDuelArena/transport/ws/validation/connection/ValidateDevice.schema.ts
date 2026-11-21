/* eslint-disable standards/matching-spec -- TODO [0013] check the convention */
import type { ValidationResult } from './ValidateDevice.types'
import type { Session } from '../../../../WordDuelArena.types'

const validate = (session: Session, deviceId: string): ValidationResult => {
    const { player1, player2 } = session.state?.players ?? {}
    const isKnownDevice = player1?.deviceId === deviceId || player2?.deviceId === deviceId
    const hasFreeSeat = !player1 || !player2

    if (!isKnownDevice && !hasFreeSeat)
        return {
            allowed: false,
            reason: 'SESSION_FULL',
            message:
                'This session has reached the maximum number of players and cannot accept new connections.',
        }

    return { allowed: true }
}

export const ValidateDeviceSchema = { validate }
