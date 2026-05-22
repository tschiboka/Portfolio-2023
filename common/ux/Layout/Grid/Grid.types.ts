import { ReactNode } from 'react'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import { StackGap, StackAlign, StackJustify } from '../Stack/Stack.types'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12

export type Breakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ResponsiveColumns = { base: GridColumns } & Partial<
    Record<Exclude<Breakpoint, 'base'>, GridColumns>
>

export type GridProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof React.JSX.IntrinsicElements
        children: ReactNode
        columns?: GridColumns | ResponsiveColumns
        gap?: StackGap
        rowGap?: StackGap
        columnGap?: StackGap
        align?: StackAlign
        justify?: StackJustify
    }
