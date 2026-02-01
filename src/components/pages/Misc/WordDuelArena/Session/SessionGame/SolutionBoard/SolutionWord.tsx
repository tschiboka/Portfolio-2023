import { SolvedLevelWord, UnsolvedLevelWord } from '../../Session.types'
import { useSession } from '../../Session.context'

type SolvedSolutionWordProps = {
    playableWord: SolvedLevelWord
    letterSize?: number
}

export const SolvedSolutionWord = ({
    playableWord,
    letterSize,
}: SolvedSolutionWordProps) => {
    const { sessionState } = useSession()
    const role = sessionState?.role
    const solvedByClass =
        role === playableWord.solvedBy
            ? 'solved-by-player'
            : 'solved-by-opponent'

    return (
        <div className="word solved">
            {playableWord.word.split('').map((char, index) => (
                <div
                    className={`letter ${solvedByClass}`}
                    key={index}
                    style={{ width: letterSize, height: letterSize }}
                >
                    {char}
                </div>
            ))}
        </div>
    )
}

type UnsolvedSolutionWordProps = {
    playableWord: UnsolvedLevelWord
    letterSize?: number
}

export const UnsolvedSolutionWord = ({
    playableWord,
    letterSize,
}: UnsolvedSolutionWordProps) => {
    return (
        <div className="word unsolved">
            {playableWord.mask.split('').map((char, index) => (
                <div
                    className="letter"
                    key={index}
                    style={{ width: letterSize, height: letterSize }}
                >
                    {char}
                </div>
            ))}
        </div>
    )
}
