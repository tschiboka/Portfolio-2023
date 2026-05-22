import { ReactNode } from 'react'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import { StackAlign, StackJustify, StackGap } from '../Stack/Stack.types'

export type InlineProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof React.JSX.IntrinsicElements
        children: ReactNode
        align?: StackAlign
        justify?: StackJustify
        gap?: StackGap
        wrap?: boolean
    }
