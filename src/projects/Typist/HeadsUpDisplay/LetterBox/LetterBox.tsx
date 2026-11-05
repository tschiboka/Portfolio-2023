import './LetterBox.styles.scss'

type ProficiencyLevel = 'extreme' | 'outstanding' | 'high' | 'moderate' | 'low'

export const LetterBox = ({
    letter,
    proficiency,
}: {
    letter: string
    proficiency?: ProficiencyLevel
}) => (
    <div className={`LetterBox${proficiency ? ` proficiency-${proficiency}` : ''}`}>
        <span>{letter}</span>
    </div>
)
