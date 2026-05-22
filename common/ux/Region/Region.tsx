import { useState } from 'react'
import type { RegionProps } from './Region.types'
import './Region.styles.css'

const VariantTag = {
    default: 'div',
    section: 'section',
    modal: 'div',
    sidebar: 'aside',
    header: 'header',
    main: 'main',
} as const

export const Region = ({
    children,
    variant = 'default',
    collapsible = false,
    title,
    icon,
    defaultOpen = true,
    ariaLabel,
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    onFocus,
    onBlur,
}: RegionProps) => {
    const [open, setOpen] = useState(collapsible ? defaultOpen : true)
    const Tag = collapsible ? 'section' : VariantTag[variant]
    const cls = [
        'region',
        `region--${variant}`,
        collapsible && 'region--collapsible',
        open && 'region--open',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Tag
            className={cls}
            aria-label={ariaLabel ?? title}
            style={style}
            role={variant === 'modal' ? 'dialog' : undefined}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {title &&
                (collapsible ? (
                    <button
                        type="button"
                        className="region__header"
                        aria-expanded={open}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <span className="region__header-left">
                            {icon && (
                                <span className="region__icon" aria-hidden="true">
                                    {icon}
                                </span>
                            )}
                            <span className="region__title">{title}</span>
                        </span>
                        <span className="region__chevron" aria-hidden="true" />
                    </button>
                ) : (
                    <div className="region__header region__header--static">
                        <span className="region__header-left">
                            {icon && (
                                <span className="region__icon" aria-hidden="true">
                                    {icon}
                                </span>
                            )}
                            <span className="region__title">{title}</span>
                        </span>
                    </div>
                ))}
            {open && <div className="region__content">{children}</div>}
        </Tag>
    )
}
