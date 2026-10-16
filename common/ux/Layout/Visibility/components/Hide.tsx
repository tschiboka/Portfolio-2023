import type { HideProps } from '../Visibility.types'
import '../Visibility.styles.css'

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
