import type { ListProps } from './Typography.types'
import './Typography.styles.css'

export const List = ({ as: Element = 'ul', items, size = 'md', ...rest }: ListProps) => {
    const {
        weight,
        align,
        tone,
        family,
        children,
        ariaLabel,
        className,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onKeyDown,
        onFocus,
        onBlur,
    } = rest

    const cls = [
        'typo',
        'typo-list',
        size && `typo--${size}`,
        weight && `typo--${weight}`,
        align && `typo--${align}`,
        tone && tone !== 'default' && `typo--${tone}`,
        family && `typo--${family}`,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Element
            className={cls}
            aria-label={ariaLabel}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            {children}
        </Element>
    )
}
