import './HeadsUpDisplay.styles.scss'
import { LetterBox } from './LetterBox/LetterBox'

export const HeadsUpDisplay = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const numbersAndPunctuation = [
        ...'0123456789'.split(''),
        ...'.!?,;:-\'"@&()'.split(''),
    ]
    return (
        <div className="HeadsUpDisplay">
            <div className="HeadsUpDisplay__entry">
                <div className="label">Metrics</div>
                <div className="content metrics">
                    <div className="errors">
                        <span>Errors:</span>
                        <LetterBox letter="A" proficiency="extreme" />
                        <LetterBox letter="B" proficiency="outstanding" />
                        <LetterBox letter="C" proficiency="high" />
                        <LetterBox letter="D" proficiency="moderate" />
                        <LetterBox letter="E" proficiency="low" />
                        <LetterBox letter="F" />
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
            <div className="HeadsUpDisplay__entry">
                <div className="label">Lower keys</div>
                <div className="content keys">
                    {lowercaseChars.map((char) => (
                        <LetterBox letter={char} />
                    ))}
                </div>
            </div>
            <div className="HeadsUpDisplay__entry">
                <div className="label">Upper keys</div>
                <div className="content keys">
                    {uppercaseChars.map((char) => (
                        <LetterBox letter={char} />
                    ))}
                </div>
            </div>
            <div className="HeadsUpDisplay__entry">
                <div className="label">Numbers & Punctuation</div>
                <div className="content keys">
                    {numbersAndPunctuation.map((char) => (
                        <LetterBox letter={char} />
                    ))}
                </div>
            </div>
        </div>
    )
}
