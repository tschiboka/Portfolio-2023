import { Const } from '@common/ux'
import './Overlay.styles.css'
import { OverlayProps } from './Overlay.types'

export const FullScreen = ({ ariaLabel, className, style, children }: OverlayProps) => (
    <div
        aria-label={ariaLabel}
        className={className ?? 'Overlay'}
        style={{ zIndex: Const.ZIndex.panel, ...style }}
    >
        {children}
    </div>
)
