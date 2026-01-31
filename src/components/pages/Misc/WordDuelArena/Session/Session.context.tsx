import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import {
    SessionContextType,
    SessionStatuses,
    WebSocketSessionState,
} from './Session.types'
import { useParams } from 'react-router'
import { LocalStorage } from '../common/utils'

const defaultState: WebSocketSessionState = {
    id: '',
    role: undefined,
    status: SessionStatuses.LOBBY,
    players: {
        player1: undefined,
        player2: undefined,
    },
    level: undefined,
    currentMatch: undefined,
    previousMatches: [],
}

export const SessionContext = createContext<SessionContextType | undefined>(
    undefined,
)
type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [sessionState, setSessionState] =
        useState<WebSocketSessionState>(defaultState)

    console.log('SessionState:', sessionState)

    const deviceId = useRef(LocalStorage.getLocalStorage().deviceId).current
    const { sessionId } = useParams()

    if (!sessionId) throw new Error('sessionId param is missing')

    return (
        <SessionContext.Provider
            value={{
                sessionId,
                deviceId,
                allowKeyboardInput: true,
                sessionState,
                setSessionState,
            }}
        >
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
