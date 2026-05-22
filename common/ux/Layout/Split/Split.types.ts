import { ReactNode } from 'react'
import { AccessibleProps, InteractiveProps } from '../../index.types'
import { StackGap } from '../Stack/Stack.types'

export type SplitRatio = '1/1' | '1/2' | '2/1' | '1/3' | '3/1' | '1/4' | '4/1'

export type SplitProps = AccessibleProps &
    InteractiveProps & {
        as?: keyof React.JSX.IntrinsicElements
        left: ReactNode
        right: ReactNode
        gap?: StackGap
        ratio?: SplitRatio
    }
