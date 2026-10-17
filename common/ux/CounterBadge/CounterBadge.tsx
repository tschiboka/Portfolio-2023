import { Numbers } from '@common-utils'
import type { CounterBadgeProps } from './CounterBadge.types'
import './CounterBadge.css'

export const CounterBadge = ({ count, ariaLabel, className, style }: CounterBadgeProps) => {
    if (count <= 0) return null

    return (
        <span
            className={`CounterBadge${className ? ` ${className}` : ''}`}
            style={style}
            aria-label={ariaLabel ?? `${count}`}
        >
            {Numbers.Counter.format(count)}
        </span>
    )
}
