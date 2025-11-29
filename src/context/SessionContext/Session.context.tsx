import { createContext, useContext, useEffect, useState } from 'react'
import { Session, SessionContextValues } from './SessionContext.types'
import { LocalSession } from './LocalSession'
import { useRehydrateSessionResources } from '../../components/pages/API/Login/Login.query'

type SessionContextProviderProps = {
    children: React.ReactNode
}

const SessionContext = createContext<SessionContextValues | undefined>(
    undefined,
)

export const useSessionContext = () => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error(
            'useSessionContext must be used within a SessionContextProvider',
        )
    }
    return context
}

export const SessionContextProvider: React.FC<SessionContextProviderProps> = ({
    children,
}) => {
    const [session, setSession] = useState<Session>()
    const localSession = LocalSession.getInstance().get() || {}

    const token = localSession?.token || session?.token
    const { data: sessionRehydrateData, ...sessionRehydrateResponse } =
        useRehydrateSessionResources(token)

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
            LocalSession.getInstance().set({ ...session })
        }
    }, [session])

    useEffect(() => {
        if (
            token &&
            sessionRehydrateResponse.isSuccess &&
            sessionRehydrateData?.data?.data?.user
        ) {
            const user = sessionRehydrateData.data.data.user
            const settings = sessionRehydrateData.data.data.settings
            setSession({ user, settings, token })
        }
    }, [token, sessionRehydrateResponse.isSuccess, sessionRehydrateData])

    return (
        <SessionContext.Provider value={contextValues}>
            {children}
        </SessionContext.Provider>
    )
}
