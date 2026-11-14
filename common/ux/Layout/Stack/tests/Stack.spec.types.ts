import type { ReactNode } from 'react'
import type { StackProps } from '../Stack.types'

export type SetProps = Omit<StackProps, 'ariaLabel' | 'children'> & {
    ariaLabel: string
    children?: ReactNode
}
