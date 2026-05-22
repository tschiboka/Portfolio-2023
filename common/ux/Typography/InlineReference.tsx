import { Link } from '../Link/Link'
import type { InlineReferenceProps } from './Typography.types'
import './Typography.styles.css'

const isExternal = (url: string) => /^https?:\/\//.test(url)

export const InlineReference = ({ reference, ariaLabel, className }: InlineReferenceProps) => {
    const cls = `typo-inline-ref${className ? ` ${className}` : ''}`

    return isExternal(reference.source) ? (
        <Link className={cls} href={reference.source} ariaLabel={ariaLabel}>
            [{reference.author}]
        </Link>
    ) : (
        <Link className={cls} to={reference.source} ariaLabel={ariaLabel}>
            [{reference.author}]
        </Link>
    )
}
