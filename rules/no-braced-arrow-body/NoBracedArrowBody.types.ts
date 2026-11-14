import type { Node } from 'estree'
import type { Optional } from '../../common/utils/Generics/Generics.types.js'

/** The little a statement must show to be read: its kind, and the directive it may declare. */
export type StatementLike = Node & { directive?: Optional<string> }

/** What an arrow carries beyond the ESTree shape: the return annotation it may declare. */
export type AnnotatedNode = {
    type: string
    returnType?: Optional<{ typeAnnotation?: Optional<{ type: string }> }>
}
