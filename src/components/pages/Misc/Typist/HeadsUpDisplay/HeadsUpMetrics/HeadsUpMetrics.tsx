import { TypistContext } from '../../Typist.context'
import { LetterBox } from '../LetterBox/LetterBox'

export const HeadsUpMetrics = () => {
    const { stats } = TypistContext.Use().editorState

    return (
        <div className="HeadsUpDisplay__entry">
            <div className="label">Metrics</div>
            <div className="content metrics">
                <div className="errors">
                    <span>Errors:</span>
                    {stats?.errorCombinations?.map((combination, i) => (
                        <span key={i}>
                            {combination.split('').map((char, index) => (
                                <LetterBox
                                    key={index}
                                    letter={char}
                                    proficiency="extreme"
                                />
                            ))}
                        </span>
                    ))}
                </div>
                <div>
                    <span>Speed:</span>
                    <span>72</span>
                </div>
                <div>
                    <span>Accuracy:</span>
                    <span>98%</span>
                </div>
                <div>
                    <span>Score:</span>
                    <span>98%</span>
                </div>
            </div>
        </div>
    )
}
