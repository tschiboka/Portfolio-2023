import './Overlay.scss'
import { Overlay } from '@common-ux'
import { AppHooks } from '@shared-context'

export const FullScreenOverlay = () => {
    const { overlayVisible, overlayContent } = AppHooks.useContext()

    if (overlayVisible) return <Overlay.FullScreen>{overlayContent}</Overlay.FullScreen>
}
