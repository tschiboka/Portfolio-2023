import { SessionProvider } from './Session.context'
import { SessionGame } from './SessionGame'
import { SessionWebSocketProvider } from './SessionWebSocket'
import './Sessions.styles.css'

const SessionComponent = () => (
    <div className="session">
        <div className="app">
            <SessionGame />
        </div>
    </div>
)

export const Session = () => (
    <SessionProvider>
        <SessionWebSocketProvider>
            <SessionComponent />
        </SessionWebSocketProvider>
    </SessionProvider>
)
