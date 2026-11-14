import type { Rule } from 'eslint'
import type { Defined, Nullable } from '../../common/utils/Generics/Generics.types.js'

/** The program node the parser hands over, taken from the listener's own signature. */
export type ProgramNode = Parameters<Defined<Rule.NodeListener['Program']>>[0]

/** One statement of that program. */
export type StatementNode = ProgramNode['body'][number]

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
