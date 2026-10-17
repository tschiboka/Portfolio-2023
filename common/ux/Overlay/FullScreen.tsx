import { Const } from '@common-ux'
import { OverlayProps } from './Overlay.types'
import './Overlay.styles.css'

export const FullScreen = ({ ariaLabel, className, style, children }: OverlayProps) => (
    <div
        aria-label={ariaLabel}
        className={className ?? 'Overlay'}
        style={{ zIndex: Const.ZIndex.panel, ...style }}
    >
        {children}
    </div>
)
