import './Pill.styles.css'
import type { AccessibleProps } from '../index.types'

type PillColor = 'accent' | 'error' | 'success' | 'yellow' | 'orange' | 'purple' | 'gray'

type PillProps = AccessibleProps & {
    label: string
    color?: PillColor
}

export const Pill = ({ label, color = 'accent', ariaLabel, className, style }: PillProps) => {
    const classes = ['Pill', `Pill--${color}`, className].filter(Boolean).join(' ')

    return (
        <span aria-label={ariaLabel} className={classes} style={style}>
            {label}
        </span>
    )
}
