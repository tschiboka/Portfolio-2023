import { useAppContext } from '../../../context/AppContext/App.context'
import ZoomedImage from '../ZoomedImage/ZoomedImage'
import { TbZoomInFilled, TbZoomOutFilled } from 'react-icons/tb'
import { Reference } from '../References/References'
import './Figure.scss'
import InlineReference from '../InlineReference/InlineReference'

interface Props {
    image: string
    className: string
    alt: string
    caption?: string
    zoomAllowed?: boolean
    reference?: Reference
}

const Figure = ({
    image,
    className,
    alt,
    caption,
    zoomAllowed = true,
    reference,
}: Props) => {
    const {
        setOverlayVisible,
        setOverlayContent,
        setMainMenuVisible,
        setSubMenuVisible,
    } = useAppContext()

    const displayZoomOverlay = () => {
        const closeZoom = () => {
            setOverlayContent(null)
            setOverlayVisible(false)
            setMainMenuVisible(true)
            setSubMenuVisible(true)
        }
        if (zoomAllowed) {
            setOverlayVisible(true)
            setMainMenuVisible(false)
            setSubMenuVisible(false)
        }

        const content: React.ReactNode = (
            <ZoomedImage handleClick={closeZoom} handleEscKeyPress={closeZoom}>
                <img src={image} alt={alt} />
                <TbZoomOutFilled className="Figure__icon Figure__icon--close" />
            </ZoomedImage>
        )

        setOverlayContent(content)
    }

    return (
        <figure className="Figure" onClick={() => displayZoomOverlay()}>
            <div className={className}>
                {zoomAllowed && <TbZoomInFilled className="Figure__icon" />}
                <img src={image} alt={alt} />
            </div>
            {caption && (
                <figcaption>
                    {caption}
                    {reference && <InlineReference reference={reference} />}
                </figcaption>
            )}
            <div className=""></div>
        </figure>
    )
}

export default Figure
