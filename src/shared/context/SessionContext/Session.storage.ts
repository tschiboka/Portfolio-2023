import { Storage } from '@common-utils'
import type { Nullable } from '@common-utils'
import { Session } from './SessionContext.types'

const APP_KEY = 'tschiboka'

const readSession = (): Nullable<Session> => {
    const storage = Storage.get<{ session?: Session }>(APP_KEY)
    return storage?.session ?? null
}

const writeSession = (session: Nullable<Session>): void => {
    Storage.update<{ session?: Session }>(APP_KEY, (prev) => ({
        ...prev,
        ...(session ? { session } : {}),
    }))
}

const removeSession = (): void => {
    Storage.update<{ session?: Session }>(APP_KEY, (prev) => {
        if (!prev) return {}
        const { session: _removed, ...rest } = prev
        void _removed
        return rest
    })
}

export class SessionStorage {
    private static instance: Nullable<SessionStorage>
    private localSession: Nullable<Session>

    private constructor() {
        this.localSession = readSession()
    }

    static getInstance(): SessionStorage {
        if (!SessionStorage.instance) {
            SessionStorage.instance = new SessionStorage()
        }
        return SessionStorage.instance
    }

    get(): Nullable<Session> {
        return this.localSession
    }

    set(session: Session): void {
        this.localSession = session
        writeSession(session)
    }

    drop(): void {
        this.localSession = null
        removeSession()
    }
}
