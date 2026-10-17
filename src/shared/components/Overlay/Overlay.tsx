import { AppHooks } from '@shared-context'
import { FullScreen } from '@common-ux/Overlay/FullScreen'
import './Overlay.scss'

export const Overlay = () => {
    const { overlayVisible, overlayContent } = AppHooks.useContext()
    if (overlayVisible) return <FullScreen>{overlayContent}</FullScreen>
}
