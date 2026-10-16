import './Overlay.scss'
import { FullScreen } from '@common-ux/Overlay/FullScreen'
import { AppHooks } from '@shared-context'

export const Overlay = () => {
    const { overlayVisible, overlayContent } = AppHooks.useContext()
    if (overlayVisible) return <FullScreen>{overlayContent}</FullScreen>
}
