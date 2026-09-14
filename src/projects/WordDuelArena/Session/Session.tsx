import { SessionProvider } from './Session.provider'
import { SessionGame } from './SessionGame/SessionGame'
import { SessionWebSocketProvider } from './SessionWebSocket.provider'
import { Browser } from '@common-utils'
import './Sessions.styles.css'

const SessionComponent = () => {
    const { ref, enterFullScreen, isFullscreen } = Browser.useFullScreen<HTMLDivElement>()

    return (
        <div className="session" ref={ref}>
            <div className="app">
                <SessionGame enterFullScreen={enterFullScreen} isFullscreen={isFullscreen} />
            </div>
        </div>
    )
}

export const Session = () => (
    <SessionProvider>
        <SessionWebSocketProvider>
            <SessionComponent />
        </SessionWebSocketProvider>
    </SessionProvider>
)
