import { Link as RouterLink } from 'react-router-dom'
import type { LinkProps } from './Link.types'
import './Link.styles.css'

const isExternal = (url: string) => /^https?:\/\//.test(url)

export const Link = (props: LinkProps) => {
    const { children, className, style, ariaLabel, title, onClick } = props
    const cls = `link${className ? ` ${className}` : ''}`

    if ('to' in props && props.to !== undefined) {
        const target = props.target ?? (isExternal(props.to) ? '_blank' : undefined)
        const rel = props.rel ?? (isExternal(props.to) ? 'noopener noreferrer' : undefined)
        return (
            <RouterLink
                className={cls}
                style={style}
                aria-label={ariaLabel}
                title={title}
                onClick={onClick}
                to={props.to}
                target={target}
                rel={rel}
            >
                {children}
            </RouterLink>
        )
    }

    const { href, download } = props
    return (
        <a
            className={cls}
            style={style}
            aria-label={ariaLabel}
            title={title}
            onClick={onClick}
            href={href}
            download={download}
            {...(isExternal(href) && { target: '_blank', rel: 'noopener noreferrer' })}
        >
            {children}
        </a>
    )
}
