import type { ButtonProps } from './Button.types'
import './Button.styles.css'

const commonKeys = new Set(['as', 'variant', 'size', 'className', 'ariaLabel', 'style', 'children'])

export const Button = (props: ButtonProps) => {
    const { children, variant = 'primary', size = 'md', className, ariaLabel, style } = props
    const cls = ['btn', size === 'sm' ? 'btn--sm' : 'standalone-btn', variant, className ?? '']
        .filter(Boolean)
        .join(' ')

    if (props.as === 'a') {
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
    }

    if (typeof props.as === 'function' || typeof props.as === 'object') {
        const Component = props.as
        const rest: Record<string, unknown> = {}
        for (const key of Object.keys(props)) {
            if (!commonKeys.has(key)) rest[key] = (props as Record<string, unknown>)[key]
        }
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
