import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The call node the parser hands over, taken from the listener's own signature. */
export type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

/** The binary node the parser hands over. */
export type BinaryNode = Parameters<Defined<Rule.NodeListener['BinaryExpression']>>[0]

/** An argument, narrowed to the literal a bound or a pattern can be read from. */
export type ValueNode = {
    type: string
    value?: unknown
    regex?: unknown
}

/** A callee, narrowed to the member a call is made on. */
export type CalleeLike = {
    type: string
    computed?: boolean
    property?: {
        type: string
        name?: string
    }
}
