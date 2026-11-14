import { useEffect, useState } from 'react'
import { isTruthy } from '@common-utils'
import { SessionContext } from './Session.context'
import { SessionStorage } from './Session.storage'
import { SessionQueries } from './Session.queries'
import type { ReactNode } from 'react'
import type { Session, SessionContextValues } from './SessionContext.types'

type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<Session>()
    const localSession = SessionStorage.getInstance().get() || {}

    const token = localSession?.token || session?.token
    const { data: sessionRehydrateData, ...sessionRehydrateResponse } = SessionQueries.useGet(token)

    const isAuthLoading =
        !!token &&
        (sessionRehydrateResponse.isLoading || !session) &&
        !sessionRehydrateResponse.isError
    const isAuthenticated = isTruthy(session?.user)

    const contextValues: SessionContextValues = {
        session,
        isAuthLoading,
        isAuthenticated,
        setSession,
    }

    useEffect(() => {
        if (session) SessionStorage.getInstance().set({ ...session })
    }, [session])

    useEffect(() => {
        const response = sessionRehydrateData

        if (token && sessionRehydrateResponse.isSuccess && response?.user) {
            const { user, settings } = response
            // eslint-disable-next-line react-hooks/set-state-in-effect -- adopts the session the rehydrate query returned
            setSession({ user, settings, token })
        }
    }, [token, sessionRehydrateResponse.isSuccess, sessionRehydrateData])

    return <SessionContext.Provider value={contextValues}>{children}</SessionContext.Provider>
}
