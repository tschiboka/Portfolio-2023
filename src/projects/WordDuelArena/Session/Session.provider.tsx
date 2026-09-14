import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Storage } from '@common-utils'
import { SessionContext } from './Session.context'
import { SessionDefaults } from './Session.defaults'
import { SessionConstants } from './Session.constants'
import type { DeviceIdStorage, WebSocketSessionState } from './Session.types'

type SessionProviderProps = {
    children: ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [sessionState, setSessionState] = useState<WebSocketSessionState>(SessionDefaults.state)

    const deviceId = useRef(
        Storage.get<DeviceIdStorage>(SessionConstants.WDA_KEY)?.deviceId ?? '',
    ).current
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
