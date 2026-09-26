import type { Session } from '../../../WordDuelArena.types'
import { initialiseSession } from '../../../domain/session/session'
import { initialiseLevel } from '../../../domain/session/Level.service'
import { commitSessionState } from '../Broadcast.service'

async function joinHandler({ session, deviceId }: { session: Session; deviceId: string }) {
    const nextStateSessionInit = initialiseSession(session.state, deviceId)
    const nextStateLevelInit = await initialiseLevel(nextStateSessionInit)
    commitSessionState(session, nextStateLevelInit, deviceId)
}

export { joinHandler }
