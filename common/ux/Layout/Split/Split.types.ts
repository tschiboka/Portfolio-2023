import { StackGap } from '../Stack/Stack.types'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import type { JSX, ReactNode } from 'react'

export type SplitRatio = '1/1' | '1/2' | '2/1' | '1/3' | '3/1' | '1/4' | '4/1'

export type SplitProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof JSX.IntrinsicElements
        left: ReactNode
        right: ReactNode
        gap?: StackGap
        ratio?: SplitRatio
    }
