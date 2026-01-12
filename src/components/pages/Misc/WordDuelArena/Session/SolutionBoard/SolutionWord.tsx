import { SolvedLevelWord, UnsolvedLevelWord } from '../Session.types'

type SolvedSolutionWordProps = {
    playableWord: SolvedLevelWord
}

export const SolvedSolutionWord = ({
    playableWord,
}: SolvedSolutionWordProps) => {
    return (
        <div className="word solved">
            {playableWord.word.split('').map((char, index) => (
                <div className="letter" key={index}>
                    {char}
                </div>
            ))}
        </div>
    )
}

type UnsolvedSolutionWordProps = {
    playableWord: UnsolvedLevelWord
}

export const UnsolvedSolutionWord = ({
    playableWord,
}: UnsolvedSolutionWordProps) => {
    return (
        <div className="word unsolved">
            {playableWord.mask.split('').map((char, index) => (
                <div className="letter" key={index}>
                    {char}
                </div>
            ))}
        </div>
    )
}
