import type { ReactNode } from 'react'
import type { VoidFunction } from '@common-utils'

export type ToggleProps = {
    children?: ReactNode
    handleClick: VoidFunction
    active: boolean
    activeColor?: string
}
