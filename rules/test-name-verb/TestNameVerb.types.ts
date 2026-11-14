import type { Rule } from 'eslint'
import type { Defined, Nullable } from '../../common/utils/Generics/Generics.types.js'

/** The call node the parser hands over, taken from the listener's own signature. */
export type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

export type CalleeLike = {
    type: string
    name?: string
    callee?: CalleeLike
    object?: CalleeLike
    property?: CalleeLike
}

export type ArgumentLike = {
    type: string
    value?: unknown
    quasis?: { value?: { cooked?: Nullable<string> } }[]
}
