/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { ModalProvider } from './common/components/Modal/Modal.provider'
import { Home } from './Home/Home'
import './WordDuelArena.styles.css'

export const WordDuelArena = () => (
    <div className="word-duel-arena">
        <div className="app">
            <ModalProvider>
                <Home />
            </ModalProvider>
        </div>
    </div>
)
