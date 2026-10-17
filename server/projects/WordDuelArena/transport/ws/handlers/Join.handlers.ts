import { BroadcastService } from '../Broadcast.service'
import { initialiseSession } from '../../../domain/session/session'
import { LevelService } from '../../../domain/session/Level.service'
import type { Session } from '../../../WordDuelArena.types'

async function joinHandler({ session, deviceId }: { session: Session; deviceId: string }) {
    const nextStateSessionInit = initialiseSession(session.state, deviceId)
    const nextStateLevelInit = await LevelService.initialise(nextStateSessionInit)
    BroadcastService.commit(session, nextStateLevelInit, deviceId)
}

export const JoinHandlers = {
    join: joinHandler,
}
