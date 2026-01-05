import { createContext, ReactNode, useContext, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useSession } from './Session.context'
import {
    WebSocketContextType,
    WebSocketRequest,
    WebSocketResponse,
} from './Session.types'
import { ApiPaths } from '../common/utils'

const WSContext = createContext<WebSocketContextType | undefined>(undefined)

export const useSessionWS = () => {
    const ctx = useContext(WSContext)
    const msg = 'useSessionWS must be used inside SessionWebSocketProvider'
    if (!ctx) throw new Error(msg)

    return ctx
}

type Props = { children: ReactNode }

export const SessionWebSocketProvider = ({ children }: Props) => {
    const { sessionId, deviceId, setSessionState } = useSession()
    const [wsUrl, setWsUrl] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const targetUrl =
        sessionId && deviceId
            ? ApiPaths.getWSPath({
                  path: ApiPaths.SESSION,
                  query: { sessionId, deviceId },
              })
            : null

    const connect = () => {
        if (targetUrl && !wsUrl) {
            setWsUrl(targetUrl)
            setErrorMessage(null) // clear old errors when reconnecting
        }
    }

    const { sendJsonMessage, lastJsonMessage, readyState } =
        useWebSocket<WebSocketResponse>(wsUrl, {
            shouldReconnect: () => false,
            share: false,
            onMessage: (event) => {
                const data = JSON.parse(event.data) as WebSocketResponse
                if (data.type === 'error') {
                    setErrorMessage(data.message ?? 'Unknown error')
                } else if (data.type === 'state_update' && data.payload) {
                    setSessionState?.(data.payload)
                    setErrorMessage(null)
                }
            },
        })

    const send = (msg: WebSocketRequest) => {
        sendJsonMessage(msg)
    }

    return (
        <WSContext.Provider
            value={{
                send,
                lastState: lastJsonMessage,
                readyState,
                connect,
                errorMessage,
            }}
        >
            {children}
        </WSContext.Provider>
    )
}
