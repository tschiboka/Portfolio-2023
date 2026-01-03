import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
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
    const [wsUrl, setWsUrl] = useState<string>('')

    const targetUrl =
        sessionId && deviceId
            ? ApiPaths.getWSPath({
                  path: ApiPaths.SESSION,
                  query: { sessionId, deviceId },
              })
            : ''

    const connect = () => {
        if (targetUrl && !wsUrl) {
            setWsUrl(targetUrl)
        }
    }

    const { sendJsonMessage, lastJsonMessage, readyState } =
        useWebSocket<WebSocketResponse>(wsUrl, {
            shouldReconnect: () => false,
            share: false,
        })

    const send = (msg: WebSocketRequest) => {
        sendJsonMessage(msg)
    }

    useEffect(() => {
        if (lastJsonMessage?.payload) setSessionState?.(lastJsonMessage.payload)
    }, [lastJsonMessage])

    return (
        <WSContext.Provider
            value={{
                send,
                lastState: lastJsonMessage,
                readyState,
                connect,
            }}
        >
            {children}
        </WSContext.Provider>
    )
}
