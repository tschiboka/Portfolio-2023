import type { ReactNode } from 'react'

export type ToggleProps = {
    children?: ReactNode
    handleClick: () => void
    active: boolean
    activeColor?: string
}
