import './Overlay.styles.css'
import { OverlayProps } from './Overlay.types'

export const FullScreen = ({ ariaLabel, className, children }: OverlayProps) => (
    <div aria-label={ariaLabel} className={className ?? 'Overlay'}>
        {children}
    </div>
)
