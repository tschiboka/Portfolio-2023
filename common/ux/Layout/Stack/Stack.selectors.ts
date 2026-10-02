import { isDefined } from '@common-utils'
import { StackAlign, StackJustify } from './Stack.types'

const AlignMap: Record<StackAlign, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
} as const

const JustifyMap: Record<StackJustify, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
} as const

const selectAlign = (align?: StackAlign) => (isDefined(align) ? AlignMap[align] : undefined)

const selectJustify = (justify?: StackJustify) =>
    isDefined(justify) ? JustifyMap[justify] : undefined

export const StackSelectors = { selectAlign, selectJustify }
