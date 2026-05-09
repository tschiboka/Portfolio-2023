import './LoadingIndicator.styles.css'
import type { AccessibleProps } from '../index.types'

type LoadingIndicatorProps = AccessibleProps & {
    show: boolean
    color?: string
}

export const LoadingIndicator = ({
    show,
    color,
    ariaLabel = 'Loading',
    className,
    style,
}: LoadingIndicatorProps) => {
    if (!show) return null

    const classes = ['LoadingIndicator', className].filter(Boolean).join(' ')

    return (
        <div
            role="progressbar"
            aria-label={ariaLabel}
            className={classes}
            style={{ color, ...style }}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
