import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'

export type FigureSize = 'sm' | 'md' | 'lg' | 'full'

export type FigureSource = {
    src: string
    minWidth?: string
    maxWidth?: string
    type?: string
}

export type FigureProps = AccessibleProps & {
    src: string
    alt: string
    caption?: ReactNode
    size?: FigureSize
    sources?: FigureSource[]
    bgColor?: string
    onZoom?: () => void
}
