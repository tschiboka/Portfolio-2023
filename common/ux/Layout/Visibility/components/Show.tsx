import type { ShowProps } from '../Visibility.types'
import '../Visibility.styles.css'

export const Show = ({ above, below, children }: ShowProps) => {
    const cls = [
        'visibility',
        'visibility--hidden',
        above && `visibility--show-above-${above}`,
        below && `visibility--show-below-${below}`,
    ]
        .filter(Boolean)
        .join(' ')

    return <div className={cls}>{children}</div>
}
