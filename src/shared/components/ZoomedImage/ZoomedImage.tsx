import { ReactNode, useEffect } from 'react'
import type { VoidFunction } from '@common-utils'
import './ZoomedImage.scss'

interface Props {
    children: ReactNode
    handleClick: VoidFunction
    handleEscKeyPress: VoidFunction
    bgColor?: string
}

export const ZoomedImage = ({ children, handleClick, handleEscKeyPress, bgColor }: Props) => {
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
