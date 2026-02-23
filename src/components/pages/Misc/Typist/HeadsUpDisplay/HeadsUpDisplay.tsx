import './HeadsUpDisplay.styles.scss'
import { HeadsUpMetrics } from './HeadsUpMetrics/HeadsUpMetrics'
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
            <HeadsUpMetrics />
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
