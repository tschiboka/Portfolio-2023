import { LetterWheel } from '../LetterWheel/LetterWheel'
import { FaBook, FaShuffle } from 'react-icons/fa6'
import { useSession } from '../../Session.context'
import { shuffleArray } from '../../../common/utils'

type GameControlsProps = {
    inputLetters: string
    setInputLetters: (letters: string) => void
    setExtraWordsOpen: (open: boolean) => void
}

export const GameControls = ({
    inputLetters,
    setInputLetters,
    setExtraWordsOpen,
}: GameControlsProps) => {
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

    const handleShuffle = () => {
        const shuffled = shuffleArray(inputLetters.split('')).join('')
        setInputLetters(shuffled)
    }

    return (
        <div className="game-controls">
            <button onClick={() => setExtraWordsOpen(true)}>
                <div className="solved-by-counts">
                    <div className="solved-by-player">
                        {byPlayerWords.length}
                    </div>
                    <div className="solved-by-opponent">
                        {byOpponentWords.length}
                    </div>
                </div>
                <FaBook />
            </button>
            <LetterWheel inputLetters={inputLetters} />
            <button onClick={handleShuffle}>
                <FaShuffle />
            </button>
        </div>
    )
}
