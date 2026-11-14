import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The call node the parser hands over, taken from the listener's own signature. */
export type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

/** The program node the parser hands over. */
export type ProgramNode = Parameters<Defined<Rule.NodeListener['Program']>>[0]

/** A callee, narrowed to the name a call is made under, or the member it is made on. */
export type CalleeLike = {
    type: string
    name?: string
    computed?: boolean
    property?: {
        type: string
        name?: string
    }
}
