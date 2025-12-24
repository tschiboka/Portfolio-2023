import { SessionPlayerInfo } from './SessionPlayerInfo'

export const SessionHeader = () => {
    return (
        <header className="session-header">
            <div className="session-header-player">
                <SessionPlayerInfo playerNumber={1} />
            </div>
            <div className="session-header-player">
                <SessionPlayerInfo playerNumber={2} />
            </div>
        </header>
    )
}
