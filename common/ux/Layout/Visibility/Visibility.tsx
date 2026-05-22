import type { ShowProps, HideProps } from './Visibility.types'
import './Visibility.styles.css'

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

export const Hide = ({ above, below, children }: HideProps) => {
    const cls = [
        'visibility',
        above && `visibility--hide-above-${above}`,
        below && `visibility--hide-below-${below}`,
    ]
        .filter(Boolean)
        .join(' ')

    return <div className={cls}>{children}</div>
}
