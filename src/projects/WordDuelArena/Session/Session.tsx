/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { BrowserHooks } from '@common-utils'
import { SessionProvider } from './Session.provider'
import { SessionGame } from './SessionGame'
import { SessionWebSocketProvider } from './SessionWebSocket.provider'
import './Sessions.styles.css'

const SessionComponent = () => {
    const { ref, enterFullScreen, isFullscreen } = BrowserHooks.useFullScreen<HTMLDivElement>()

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
