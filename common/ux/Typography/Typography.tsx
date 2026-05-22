import type { TypographyProps } from './Typography.types'
import './Typography.styles.css'

export const Typography = ({
    as: Element = 'span',
    id,
    size,
    weight,
    align,
    tone,
    truncate,
    wrap,
    family,
    decoration,
    transform,
    includeInTableOfContents,
    children,
    ariaLabel,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: TypographyProps) => {
    const cls = [
        'typo',
        size && `typo--${size}`,
        weight && `typo--${weight}`,
        align && `typo--${align}`,
        tone && tone !== 'default' && `typo--${tone}`,
        truncate && 'typo--truncate',
        wrap && `typo--${wrap}`,
        family && `typo--${family}`,
        decoration && `typo--decoration-${decoration}`,
        transform && `typo--${transform}`,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Element
            id={id}
            className={cls}
            aria-label={ariaLabel}
            data-toc={includeInTableOfContents ? '' : undefined}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {children}
        </Element>
    )
}
