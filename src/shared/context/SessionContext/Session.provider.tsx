import { useEffect, useState } from 'react'
import { SessionContext } from './Session.context'
import type { Session, SessionContextValues } from './SessionContext.types'
import { SessionStorage } from './Session.storage'
import { SessionQueries } from './Session.queries'

type SessionProviderProps = {
    children: React.ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session>()
    const localSession = SessionStorage.getInstance().get() || {}

    const token = localSession?.token || session?.token
    const { data: sessionRehydrateData, ...sessionRehydrateResponse } = SessionQueries.useGet(token)

    const isAuthLoading =
        !!token &&
        (sessionRehydrateResponse.isLoading || !session) &&
        !sessionRehydrateResponse.isError
    const isAuthenticated = Boolean(session?.user)

    const contextValues: SessionContextValues = {
        session,
        isAuthLoading,
        isAuthenticated,
        setSession,
    }

    useEffect(() => {
        if (session) {
            SessionStorage.getInstance().set({ ...session })
        }
    }, [session])

    useEffect(() => {
        const response = sessionRehydrateData

        if (token && sessionRehydrateResponse.isSuccess && response?.user) {
            const { user, settings } = response
            setSession({ user, settings, token })
        }
    }, [token, sessionRehydrateResponse.isSuccess, sessionRehydrateData])

    return <SessionContext.Provider value={contextValues}>{children}</SessionContext.Provider>
}
