import { ModalProvider } from './common/components/Modal/Modal.provider'
import { Home } from './Home/Home'
import './WordDuelArena.styles.css'

export const WordDuelArena = () => {
    return (
        <div className="word-duel-arena">
            <div className="app">
                <ModalProvider>
                    <Home />
                </ModalProvider>
            </div>
        </div>
    )
}
