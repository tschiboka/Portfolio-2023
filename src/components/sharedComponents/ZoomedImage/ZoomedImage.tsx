import { ReactNode, useEffect, useRef } from 'react'
import './ZoomedImage.scss'

interface Props {
    children: ReactNode
    handleClick: () => void
    handleEscKeyPress: () => void
    bgColor?: string
}

const ZoomedImage = ({ children, handleClick, handleEscKeyPress, bgColor }: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const escHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') handleEscKeyPress()
    }

    useEffect(() => {
        window.addEventListener('keydown', escHandler)
        return () => window.removeEventListener('keydown', escHandler)
    }, [])

    return (
        <div
            className="ZoomedImage"
            onClick={(e) => {
                e.stopPropagation()
                handleClick()
            }}
            ref={ref}
            style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
            {children}
        </div>
    )
}

export default ZoomedImage
