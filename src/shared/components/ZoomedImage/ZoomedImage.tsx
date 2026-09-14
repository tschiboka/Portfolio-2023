import { ReactNode, useEffect } from 'react'
import './ZoomedImage.scss'

interface Props {
    children: ReactNode
    handleClick: () => void
    handleEscKeyPress: () => void
    bgColor?: string
}

const ZoomedImage = ({ children, handleClick, handleEscKeyPress, bgColor }: Props) => {
    useEffect(() => {
        const escHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleEscKeyPress()
        }

        window.addEventListener('keydown', escHandler)
        return () => window.removeEventListener('keydown', escHandler)
    }, [handleEscKeyPress])

    return (
        <div
            className="ZoomedImage"
            onClick={(e) => {
                e.stopPropagation()
                handleClick()
            }}
            style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
            {children}
        </div>
    )
}

export default ZoomedImage
