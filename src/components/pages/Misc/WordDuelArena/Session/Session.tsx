import { SessionProvider, useSession } from './Session.context'
import { WebSocketRequestType } from './Session.types'
import { SessionWebSocketProvider, useSessionWS } from './SessionWebSocket'

const SessionComponent = () => {
    const { send, lastMessage } = useSessionWS()
    const { sessionId, deviceId } = useSession()
    const sessionResponse = lastMessage?.payload
    const player1 = sessionResponse?.players.player1
    const player2 = sessionResponse?.players.player2
    const status = sessionResponse?.status
    const matchStatus = sessionResponse?.currentMatch?.status

    return (
        <>
            <h1>Word Duel Arena - Session</h1>
            <p>Session ID: {sessionId}</p>
            <p>Device ID: {deviceId}</p>
            <p>
                Player 1:{' '}
                {player1
                    ? player1.deviceId === deviceId
                        ? 'You'
                        : 'Opponent'
                    : 'None'}
                /
                {player1
                    ? player1.connected
                        ? 'Connected'
                        : 'Disconnected'
                    : 'N/A'}
            </p>
            <p>
                Player 2:{' '}
                {player2
                    ? player2.deviceId === deviceId
                        ? 'You'
                        : 'Opponent'
                    : 'None'}
                /
                {player2
                    ? player2.connected
                        ? 'Connected'
                        : 'Disconnected'
                    : 'N/A'}
            </p>
            <p>SessionStatus: {status}</p>
            <p>MatchStatus: {matchStatus}</p>
            {status === 'ACTIVE' && (
                <button
                    onClick={() =>
                        send({
                            type: WebSocketRequestType.MOVE,
                            payload: { move: 'test' },
                        })
                    }
                >
                    Move
                </button>
            )}
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
