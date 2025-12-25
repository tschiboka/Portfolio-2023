import { SessionPlayerInfo } from './SessionPlayerInfo'

export const SessionHeader = () => {
    return (
        <header className="session-header">
            <div className="session-header-player">
                <SessionPlayerInfo slot="me" />
            </div>
            <div className="session-header-player">
                <SessionPlayerInfo slot="opponent" />
            </div>
        </header>
    )
}
