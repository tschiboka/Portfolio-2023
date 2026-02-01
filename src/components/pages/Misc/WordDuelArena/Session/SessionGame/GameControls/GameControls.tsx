import { LetterWheel } from '../LetterWheel/LetterWheel'
import { FaBook, FaShuffle } from 'react-icons/fa6'
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
    const handleShuffle = () => {
        const shuffled = shuffleArray(inputLetters.split('')).join('')
        setInputLetters(shuffled)
    }

    return (
        <div className="game-controls">
            <button onClick={() => setExtraWordsOpen(true)}>
                <FaBook />
            </button>
            <LetterWheel inputLetters={inputLetters} />
            <button onClick={handleShuffle}>
                <FaShuffle />
            </button>
        </div>
    )
}
