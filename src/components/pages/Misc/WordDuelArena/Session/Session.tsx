import { SessionProvider, useSession } from './Session.context'
import { WebSocketRequestType } from './Session.types'
import { SessionWebSocketProvider, useSessionWS } from './SessionWebSocket'

const SessionComponent = () => {
    const { send, lastMessage } = useSessionWS()
    const { sessionId } = useSession()
    const counter = lastMessage?.payload?.counter ?? 0

    return (
        <>
            <h1>Word Duel Arena - Session</h1>
            <p>Pinged {counter} times</p>
            <p>Session ID: {sessionId}</p>
            <button onClick={() => send({ type: WebSocketRequestType.PING })}>
                Send Ping
            </button>
        </>
    )
}

export const Session = () => (
    <SessionProvider>
        <SessionWebSocketProvider>
            <SessionComponent />
        </SessionWebSocketProvider>
    </SessionProvider>
)
