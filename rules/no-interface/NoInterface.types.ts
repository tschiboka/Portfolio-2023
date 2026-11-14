import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** A start and an end offset into the source text. */
export type RangeLike = [number, number]

/** Any AST node, read for its kind, the range a fix rewrites, and the ancestors that make it ambient. */
export type NodeLike = {
    type: string
    range?: Optional<RangeLike>
    declare?: Optional<boolean>
    parent?: Optional<NodeLike>
    id?: Optional<NodeLike>
    body?: Optional<NodeLike>
    typeParameters?: Optional<NodeLike>
    extends?: Optional<NodeLike[]>
}
