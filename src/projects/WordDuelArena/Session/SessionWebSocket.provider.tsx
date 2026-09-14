import { useState } from 'react'
import type { ReactNode } from 'react'
import useWebSocket from 'react-use-websocket'
import { SessionHooks } from './Session.hooks'
import { SessionWebSocketContext } from './SessionWebSocket.context'
import { ApiPaths } from '../common/utils'
import { isString } from '@common-utils'
import type { Nullable } from '@common-utils'
import type { WebSocketRequest, WebSocketResponse } from './Session.types'

type Props = { children: ReactNode }

export const SessionWebSocketProvider = ({ children }: Props) => {
    const { sessionId, deviceId, setSessionState } = SessionHooks.useContext()
    const [wsUrl, setWsUrl] = useState<Nullable<string>>(null)
    const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null)

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

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<WebSocketResponse>(
        wsUrl,
        {
            shouldReconnect: () => false,
            share: false,
            onMessage: (event) => {
                if (!isString(event.data)) return

                const data = JSON.parse(event.data) as WebSocketResponse
                if (data.type === 'error') {
                    setErrorMessage(data.message ?? 'Unknown error')
                } else if (data.type === 'state_update' && data.payload) {
                    setSessionState?.(data.payload)
                    setErrorMessage(null)
                }
            },
        },
    )

    const send = (msg: WebSocketRequest) => {
        sendJsonMessage(msg)
    }

    return (
        <SessionWebSocketContext.Provider
            value={{
                send,
                lastState: lastJsonMessage,
                readyState,
                connect,
                errorMessage,
            }}
        >
            {children}
        </SessionWebSocketContext.Provider>
    )
}
