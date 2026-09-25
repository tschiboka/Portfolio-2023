import { Avatar } from './components/Avatar'
import { Info } from './components/Info'
import { LastAttempts } from './components/LastAttempts'
import { MomentumBar } from './components/MomentumBar'
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
