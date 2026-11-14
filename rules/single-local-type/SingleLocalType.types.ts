import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** The name an identifier carries, which is all this rule reads from one. */
export type NameLike = {
    name?: Optional<string>
}

/** Any AST node, read for the handful of fields this rule walks. */
export type NodeLike = {
    type: string
    id?: Optional<NameLike>
    parent?: Optional<NodeLike>
    declaration?: Optional<NodeLike>
    declarations?: Optional<NodeLike[]>
    init?: Optional<NodeLike>
    body?: Optional<NodeLike[]>
}
