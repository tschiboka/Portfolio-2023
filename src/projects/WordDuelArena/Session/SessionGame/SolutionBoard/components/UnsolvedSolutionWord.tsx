import { CSSProperties } from 'react'
import type { UnsolvedLevelWord } from '../../../Session.types'

type UnsolvedSolutionWordProps = {
    playableWord: UnsolvedLevelWord
    letterSize?: number
}

export const UnsolvedSolutionWord = ({ playableWord, letterSize }: UnsolvedSolutionWordProps) => {
    const hintedIndices = playableWord.hintIndices

    return (
        <div className="word unsolved">
            {playableWord.mask.split('').map((char, index) => (
                <div
                    className={`letter ${hintedIndices.includes(index) ? 'hinted' : ''}`}
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
