import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** An AST node narrowed to the fields the placement reads. */
export type NodeLike = {
    type: string
    name?: string
    callee?: NodeLike
    object?: NodeLike
    property?: NodeLike
}

/** A declarator, narrowed to its binding and its initialiser. */
export type DeclaratorLike = NodeLike & {
    id?: NodeLike
    init?: Nullable<NodeLike>
}

/** A statement, narrowed to what the classification reads. */
export type StatementLike = NodeLike & {
    expression?: NodeLike
    declaration?: Nullable<NodeLike>
    declarations?: DeclaratorLike[]
}

/** What a declaration puts in a spec: `.spec.utils.ts` for a helper, `.mocks.ts` for data. */
export type OffendingKind = 'helper' | 'data'
