import type { OverlineProps } from './Typography.types'
import './Typography.styles.css'

export const Overline = ({
    weight = 'semibold',
    align,
    tone,
    truncate,
    wrap,
    family,
    decoration,
    transform,
    children,
    ariaLabel,
}: OverlineProps) => {
    const cls = [
        'typo',
        'typo--overline',
        weight && `typo--${weight}`,
        align && `typo--${align}`,
        tone && tone !== 'default' && `typo--${tone}`,
        truncate && 'typo--truncate',
        wrap && `typo--${wrap}`,
        family && `typo--${family}`,
        decoration && `typo--decoration-${decoration}`,
        transform && `typo--${transform}`,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <span className={cls} aria-label={ariaLabel}>
            {children}
        </span>
    )
}
