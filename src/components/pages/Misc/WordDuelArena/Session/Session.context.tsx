import { createContext, ReactNode, useContext, useRef } from 'react'
import { SessionContextType } from './Session.types'
import { useParams } from 'react-router'
import { LocalStorage } from '../common/utils'

export const SessionContext = createContext<SessionContextType | undefined>(
    undefined,
)
type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const deviceId = useRef(LocalStorage.getLocalStorage().deviceId).current
    const { sessionId } = useParams()

    if (!sessionId) throw new Error('sessionId param is missing')

    return (
        <SessionContext.Provider value={{ sessionId, deviceId }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const context = useContext(SessionContext)

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider')
    }

    return context
}
