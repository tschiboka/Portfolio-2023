/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import type { ProficiencyLevel } from './LetterBox.types'
import './LetterBox.styles.scss'

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
