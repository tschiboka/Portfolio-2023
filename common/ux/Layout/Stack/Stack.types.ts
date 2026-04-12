import { ElementType } from 'react'
import { ComponentProps } from '../../index.types'

export type StackDirection = 'row' | 'column'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around'
export type StackGap =
    | '2'
    | '4'
    | '8'
    | '12'
    | '16'
    | '20'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64'

export type StackProps = ComponentProps & {
    as?: ElementType
    align?: StackAlign
    justify?: StackJustify
    gap?: StackGap
    wrap?: boolean
}
