import type { ListProps } from './Typography.types'
import { isObject } from '@common-utils'
import './Typography.styles.css'

export const List = ({ as: Element = 'ul', items, size = 'md', ...rest }: ListProps) => {
    const {
        weight,
        align,
        tone,
        family,
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
            {items.map((item, index) => {
                if (isObject(item))
                    return (
                        <li key={item.key ?? index} className={item.className}>
                            {item.content}
                        </li>
                    )
                return <li key={index}>{item}</li>
            })}
        </Element>
    )
}
