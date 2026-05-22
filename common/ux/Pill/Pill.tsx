import './Pill.styles.css'
import type { AccessibleProps, InteractiveProps } from '../index.types'

export type PillColor = 'accent' | 'error' | 'success' | 'yellow' | 'orange' | 'purple' | 'gray'
type PillVariant = 'outlined' | 'solid'

type PillProps = AccessibleProps &
    InteractiveProps & {
        label: string
        color?: PillColor
        variant?: PillVariant
    }

export const Pill = ({
    label,
    color = 'accent',
    variant = 'outlined',
    ariaLabel,
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: PillProps) => {
    const classes = ['Pill', `Pill--${color}`, `Pill--${variant}`, className]
        .filter(Boolean)
        .join(' ')

    return (
        <span
            aria-label={ariaLabel}
            className={classes}
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {label}
        </span>
    )
}
