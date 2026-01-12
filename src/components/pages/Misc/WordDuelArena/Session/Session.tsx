import { SessionProvider } from './Session.context'
import { SessionGame } from './SessionGame'
import { SessionWebSocketProvider } from './SessionWebSocket'
import { useFullScreen } from '../common/utils'
import './Sessions.styles.css'

const SessionComponent = () => {
    const { ref, enterFullScreen, isFullscreen } =
        useFullScreen<HTMLDivElement>()

    return (
        <div className="session" ref={ref}>
            <div className="app">
                <SessionGame
                    enterFullScreen={enterFullScreen}
                    isFullscreen={isFullscreen}
                />
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
