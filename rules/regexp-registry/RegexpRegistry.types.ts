import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** A callee, read only for the plain name it resolves to. */
export type CalleeLike = {
    name?: Optional<string>
}

/** Any AST node, read for the handful of fields this rule walks. */
export type NodeLike = {
    type: string
    callee?: Optional<CalleeLike>
    regex?: Optional<unknown>
}
