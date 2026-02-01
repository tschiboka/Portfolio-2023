import { useSession } from '../../Session.context'
import './ExtraWords.styles.css'

type ExtraWordsProps = {
    isOpen: boolean
    setExtraWordsOpen: (open: boolean) => void
}
export const ExtraWords = ({ isOpen, setExtraWordsOpen }: ExtraWordsProps) => {
    const session = useSession()
    const { level } = session.sessionState || {}
    const extraWords = level?.extraWords || []
    const role = session?.sessionState?.role || ''
    const byPlayerWords = extraWords.filter(
        (word) => word.status === 'SOLVED' && word.solvedBy === role,
    )
    const byOpponentWords = extraWords.filter(
        (word) => word.status === 'SOLVED' && word.solvedBy !== role,
    )

    return (
        isOpen && (
            <div className="extra-words">
                <h1>Extra Words</h1>
                <p>Total: {extraWords.length}</p>
                <p>By you: {byPlayerWords.length}</p>
                <div className="words-list solved-by-player">
                    {byPlayerWords.map((word, index) => (
                        <div className="word" key={index}>
                            {word.status === 'SOLVED' && word.word}
                        </div>
                    ))}
                </div>
                <p>By opponent: {byOpponentWords.length}</p>
                <div className="words-list solved-by-opponent">
                    {byOpponentWords.map((word, index) => (
                        <div className="word" key={index}>
                            {word.status === 'SOLVED' && word.word}
                        </div>
                    ))}
                </div>
                <button onClick={() => setExtraWordsOpen(false)}>Close</button>
            </div>
        )
    )
}
