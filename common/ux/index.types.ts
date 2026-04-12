import { CSSProperties, ReactNode } from 'react'

export type AccessibleProps = {
    ariaLabel?: string
    className?: string
    style?: CSSProperties
}

export type ComponentProps = AccessibleProps & {
    children: ReactNode
}
