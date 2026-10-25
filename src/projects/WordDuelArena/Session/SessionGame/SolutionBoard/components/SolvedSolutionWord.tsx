import { SessionHooks } from '../../../Session.hooks'
import type { CSSProperties } from 'react'
import type { SolvedLevelWord } from '../../../Session.types'

type SolvedSolutionWordProps = {
    playableWord: SolvedLevelWord
    letterSize?: number
}

export const SolvedSolutionWord = ({ playableWord, letterSize }: SolvedSolutionWordProps) => {
    const { sessionState } = SessionHooks.useContext()
    const role = sessionState?.role
    const solvedByClass = role === playableWord.solvedBy ? 'solved-by-player' : 'solved-by-opponent'

    return (
        <div className="word solved">
            {playableWord.word.split('').map((char, index) => (
                <div
                    className={`letter ${solvedByClass}`}
                    key={index}
                    style={
                        {
                            width: letterSize,
                            height: letterSize,
                            '--letter-size': `${letterSize}px`,
                        } as CSSProperties
                    }
                >
                    {char}
                </div>
            ))}
        </div>
    )
}
