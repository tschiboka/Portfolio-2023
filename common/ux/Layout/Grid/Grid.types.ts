import { StackGap, StackAlign, StackJustify } from '../Stack/Stack.types'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import type { JSX, ReactNode } from 'react'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12

export type Breakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ResponsiveColumns = { base: GridColumns } & Partial<
    Record<Exclude<Breakpoint, 'base'>, GridColumns>
>

export type GridProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof JSX.IntrinsicElements
        children: ReactNode
        columns?: GridColumns | ResponsiveColumns
        gap?: StackGap
        rowGap?: StackGap
        columnGap?: StackGap
        align?: StackAlign
        justify?: StackJustify
    }
