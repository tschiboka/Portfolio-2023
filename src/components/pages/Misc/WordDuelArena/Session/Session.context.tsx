import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import { produce } from 'immer'
import {
    DerivedSessionState,
    PlayerRole,
    SessionContextType,
    WebSocketSessionState,
} from './Session.types'
import { useParams } from 'react-router'
import { LocalStorage } from '../common/utils'

const defaultDerivedState: DerivedSessionState = {
    me: undefined,
    opponent: undefined,
    meData: undefined,
    opponentData: undefined,
    completeSessionState: undefined,
}

export const SessionContext = createContext<SessionContextType | undefined>(
    undefined,
)
type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [derivedState, setDerivedState] =
        useState<DerivedSessionState>(defaultDerivedState)

    const deviceId = useRef(LocalStorage.getLocalStorage().deviceId).current
    const { sessionId } = useParams()

    const setSessionState = (state: WebSocketSessionState) => {
        if (!state || !state.players) return

        let mePlayer = undefined
        if (deviceId === state.players.player1?.deviceId) mePlayer = 'player1'
        else if (deviceId === state.players.player2?.deviceId)
            mePlayer = 'player2'

        if (!mePlayer) return
        const me = mePlayer as PlayerRole
        const opponent: PlayerRole = me === 'player1' ? 'player2' : 'player1'

        setDerivedState((prev) =>
            produce(prev, (draft: DerivedSessionState) => {
                draft.me = me
                draft.opponent = opponent
                draft.meData = state.players[me as keyof typeof state.players]
                draft.opponentData =
                    state.players[opponent as keyof typeof state.players]
                draft.completeSessionState = state
            }),
        )
    }

    if (!sessionId) throw new Error('sessionId param is missing')

    return (
        <SessionContext.Provider
            value={{
                sessionId,
                deviceId,
                derivedState,
                allowKeyboardInput: true,
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
