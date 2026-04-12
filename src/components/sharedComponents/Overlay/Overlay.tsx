import './Overlay.scss'
import { Overlay } from '@common/ux'
import { useAppContext } from '../../../context/AppContext/App.context'

export const FullScreenOverlay = () => {
    const { overlayVisible, overlayContent } = useAppContext()

    if (overlayVisible) return <Overlay.FullScreen>{overlayContent}</Overlay.FullScreen>
}
