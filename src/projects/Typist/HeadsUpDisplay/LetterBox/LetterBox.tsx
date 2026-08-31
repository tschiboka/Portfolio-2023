import './LetterBox.styles.scss'

export type ProficiencyLevel =
    | 'extreme'
    | 'outstanding'
    | 'high'
    | 'moderate'
    | 'low'
export const LetterBox = ({
    letter,
    proficiency,
}: {
    letter: string
    proficiency?: ProficiencyLevel
}) => {
    return (
        <div
            className={`LetterBox${proficiency ? ` proficiency-${proficiency}` : ''}`}
        >
            <span>{letter}</span>
        </div>
    )
}
