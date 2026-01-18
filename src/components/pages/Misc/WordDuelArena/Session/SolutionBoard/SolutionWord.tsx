import { SolvedLevelWord, UnsolvedLevelWord } from '../Session.types'

type SolvedSolutionWordProps = {
    playableWord: SolvedLevelWord
    letterSize?: number
}

export const SolvedSolutionWord = ({
    playableWord,
    letterSize,
}: SolvedSolutionWordProps) => {
    return (
        <div className="word solved">
            {playableWord.word.split('').map((char, index) => (
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
