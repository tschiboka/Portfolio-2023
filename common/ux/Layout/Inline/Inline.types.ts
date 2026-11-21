import { StackAlign, StackJustify, StackGap } from '../Stack'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import type { JSX, ReactNode } from 'react'

export type InlineProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof JSX.IntrinsicElements
        children: ReactNode
        align?: StackAlign
        justify?: StackJustify
        gap?: StackGap
        wrap?: boolean
    }
