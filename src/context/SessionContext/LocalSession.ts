import { Storage } from '@common/utils'
import { Session } from './SessionContext.types'

const APP_KEY = 'tschiboka'

const readSession = (): Session | null => {
    const storage = Storage.get<{ session?: Session }>(APP_KEY)
    return storage?.session ?? null
}

const writeSession = (session: Session | null): void => {
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

export class LocalSession {
    private static instance: LocalSession | null
    private localSession: Session | null

    private constructor() {
        this.localSession = readSession()
    }

    static getInstance(): LocalSession {
        if (!LocalSession.instance) {
            LocalSession.instance = new LocalSession()
        }
        return LocalSession.instance
    }

    get(): Session | null {
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
