import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The property node the parser hands over, taken from the listener's own signature. */
export type PropertyNode = Parameters<Defined<Rule.NodeListener['Property']>>[0]

/** A bound and the width it states. */
export type Width = {
    bound: string
    width: number
}
