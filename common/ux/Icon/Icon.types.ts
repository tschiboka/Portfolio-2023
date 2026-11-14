import type { CSSProperties } from 'react'

export type IconName = 'chart' | 'eye' | 'heart'

export type IconProps = {
    name: IconName
    size?: number
    color?: string
    className?: string
    style?: CSSProperties
}
