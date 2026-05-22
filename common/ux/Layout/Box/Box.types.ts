import { ReactNode } from 'react'
import { AccessibleProps, InteractiveProps } from '../../index.types'

export type BoxSpacing =
    | '0'
    | '2'
    | '4'
    | '8'
    | '12'
    | '16'
    | '20'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64'
export type BoxBackground = 'transparent' | 'surface' | 'raised' | 'sunken' | 'accent'
export type BoxBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BoxDisplay = 'block' | 'flex' | 'inline' | 'inline-flex'

export type BoxProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof React.JSX.IntrinsicElements
        children: ReactNode
        padding?: BoxSpacing
        paddingX?: BoxSpacing
        paddingY?: BoxSpacing
        margin?: BoxSpacing
        background?: BoxBackground
        borderRadius?: BoxBorderRadius
        display?: BoxDisplay
    }
