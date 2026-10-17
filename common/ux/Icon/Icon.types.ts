import type { CSSProperties } from 'react'

export type IconName = 'chart' | 'eye' | 'heart'

export interface IconProps {
    name: IconName
    size?: number
    color?: string
    className?: string
    style?: CSSProperties
}
