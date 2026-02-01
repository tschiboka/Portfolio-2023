import { SessionPlayerInfo } from './SessionPlayerInfo'
import { MomentumBar } from './MomentumBar'
import './SessionHeader.styles.css'

export const SessionHeader = () => (
    <header className="session-header">
        <div className="session-header-players">
            <div className="session-header-player">
                <SessionPlayerInfo slot="me" />
            </div>
            <div className="session-header-player">
                <SessionPlayerInfo slot="opponent" />
            </div>
        </div>
        <MomentumBar />
    </header>
)
