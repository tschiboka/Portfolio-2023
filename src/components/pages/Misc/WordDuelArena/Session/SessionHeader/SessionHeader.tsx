import { Avatar } from './Avatar'
import { Info } from './Info'
import { LastAttempt } from './LastAttempt'
import { MomentumBar } from './MomentumBar'
import './SessionHeader.styles.css'

export const SessionHeader = () => (
    <header className="session-header">
        <div className="session-header-players">
            <Avatar slot="me" />
            <Info />
            <Avatar slot="opponent" />
        </div>
        <LastAttempt />
        <MomentumBar />
    </header>
)
