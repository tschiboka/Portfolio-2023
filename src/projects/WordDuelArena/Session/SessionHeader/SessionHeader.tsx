/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { Avatar, Info, LastAttempts, MomentumBar } from './components'
import './SessionHeader.styles.css'

export const SessionHeader = () => (
    <header className="session-header">
        <div className="session-header-players">
            <Avatar slot="me" />
            <Info />
            <Avatar slot="opponent" />
        </div>
        <LastAttempts />
        <MomentumBar />
    </header>
)
