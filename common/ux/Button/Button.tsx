import type { Dictionary } from '@common-utils'
import type { ButtonProps } from './Button.types'
import './Button.styles.css'

const commonKeys = new Set(['as', 'variant', 'size', 'className', 'ariaLabel', 'style', 'children'])

export const Button = (props: ButtonProps) => {
    const { children, variant = 'primary', size = 'md', className, ariaLabel, style } = props
    const cls = ['btn', size === 'sm' ? 'btn--sm' : 'standalone-btn', variant, className ?? '']
        .filter(Boolean)
        .join(' ')

    if (props.as === 'a')
        return (
            <a
                className={cls}
                aria-label={ariaLabel}
                style={style}
                href={props.href}
                download={props.download}
                target={props.target}
                rel={props.rel}
            >
                {children}
            </a>
        )

    // eslint-disable-next-line standards/predicate-case -- the typeof pair narrows props.as to ComponentType, which no predicate reproduces
    if (typeof props.as === 'function' || typeof props.as === 'object') {
        const Component = props.as
        const rest: Dictionary = Object.fromEntries(
            Object.entries(props).filter(([key]) => !commonKeys.has(key)),
        )

        return (
            <Component className={cls} aria-label={ariaLabel} style={style} {...rest}>
                {children}
            </Component>
        )
    }

    return (
        <button
            type={props.type ?? 'button'}
            className={cls}
            aria-label={ariaLabel}
            style={style}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {children}
        </button>
    )
}
