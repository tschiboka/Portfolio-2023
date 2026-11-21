/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import './Character.styles.scss'

type CharacterProps = {
    char: string
    className?: string
}

export const Character = ({ char, className }: CharacterProps) => {
    const nonBreakingSpace = '\u00A0'
    const displayChar = char === ' ' ? nonBreakingSpace : char

    return <span className={`Character ${className || ''}`}>{displayChar}</span>
}
