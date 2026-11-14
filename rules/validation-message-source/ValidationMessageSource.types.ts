import { Nullable } from '../../common/utils/Generics/index.js'
import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

/** The call node the parser hands over, taken from the listener's own signature. */
export type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

/** A property key, narrowed to the name or the value that identifies it. */
export type KeyLike = {
    type: string
    name?: string
    value?: unknown
}

/** An argument, narrowed to what a message can be read from. */
export type ValueLike = {
    type: string
    value?: unknown
    quasis?: { value?: { cooked?: Nullable<string> } }[]
}

/** A callee, narrowed to the member a call is made on. */
export type CalleeLike = {
    type: string
    computed?: boolean
    property?: KeyLike
}

/** An object property, narrowed to the key and value a message sits between. */
export type PropertyLike = {
    computed?: boolean
    key?: KeyLike
    value?: ValueLike
}
