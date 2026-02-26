import type { Session } from '../../../types'

import { initialiseSession } from '../../../domain/session/session'
import { initialiseLevel } from '../../../domain/session/level'
import { commitSessionState } from '../broadcast'

async function joinHandler({ session, deviceId }: { session: Session; deviceId: string }) {
    const nextStateSessionInit = initialiseSession(session.state, deviceId)
    const nextStateLevelInit = await initialiseLevel(nextStateSessionInit, deviceId)
    commitSessionState(session, nextStateLevelInit, deviceId)
}

export { joinHandler }
