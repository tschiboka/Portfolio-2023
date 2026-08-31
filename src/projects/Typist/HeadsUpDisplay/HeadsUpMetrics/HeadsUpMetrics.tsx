import { TypistContext } from '../../Typist.context'
import { LetterBox } from '../LetterBox/LetterBox'
import './HeadsUpMetrics.scss'

export const HeadsUpMetrics = () => {
    const { stats } = TypistContext.Use().editorState

    return (
        <div className="HeadsUpMetrics HeadsUpDisplay__entry">
            <div className="label">Metrics</div>
            <div className="content metrics">
                <div className="errors">
                    <span>Errors:</span>
                    {stats?.errorCombinations?.map((combination, i) => (
                        <div key={i}>
                            {combination.split('').map((char, index) => (
                                <LetterBox
                                    key={index}
                                    letter={char}
                                    proficiency="extreme"
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <span>Speed:</span>
                    <span>{stats?.speed?.wpm} wpm</span>
                </div>
                <div>
                    <span>Accuracy:</span>
                    <span>{stats?.accuracy}%</span>
                </div>
                <div>
                    <span>Score:</span>
                    <span>{stats?.score}</span>
                </div>
            </div>
        </div>
    )
}
