import { SessionProvider } from './Session.context'
import { SessionGame } from './SessionGame'
import { SessionHeader } from './SessionHeader'
import { SessionWebSocketProvider } from './SessionWebSocket'
import './Sessions.styles.css'

const SessionComponent = () => (
    <div className="session">
        <div className="app">
            <SessionHeader />
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
