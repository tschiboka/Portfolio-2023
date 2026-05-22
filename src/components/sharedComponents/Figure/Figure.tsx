import { useAppContext } from '../../../context/AppContext/App.context'
import ZoomedImage from '../ZoomedImage/ZoomedImage'
import { TbZoomOutFilled } from 'react-icons/tb'
import { Reference } from '../References/References'
import './Figure.scss'
import InlineReference from '../InlineReference/InlineReference'
import { Figure as UxFigure } from '@common/ux'
import type { FigureSize } from '../../../../common/ux/Figure/Figure.types'

interface Props {
    image: string
    className?: string
    alt: string
    caption?: string
    zoomAllowed?: boolean
    reference?: Reference
    bgColor?: string
    size?: FigureSize
}

const Figure = ({
    image,
    className,
    alt,
    caption,
    zoomAllowed = true,
    reference,
    bgColor,
    size,
}: Props) => {
    const { setOverlayVisible, setOverlayContent, setMainMenuVisible, setSubMenuVisible } =
        useAppContext()

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
            <ZoomedImage handleClick={closeZoom} handleEscKeyPress={closeZoom} bgColor={bgColor}>
                <img src={image} alt={alt} />
                <TbZoomOutFilled className="Figure__icon Figure__icon--close" />
            </ZoomedImage>
        )

        setOverlayContent(content)
    }

    const captionContent = caption ? (
        <>
            {caption}
            {reference && <InlineReference reference={reference} />}
        </>
    ) : undefined

    return (
        <UxFigure
            src={image}
            alt={alt}
            caption={captionContent}
            onZoom={zoomAllowed ? displayZoomOverlay : undefined}
            className={`Figure${className ? ` ${className}` : ''}`}
            bgColor={bgColor}
            size={size}
        />
    )
}

export default Figure
