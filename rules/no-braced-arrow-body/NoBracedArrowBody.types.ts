import type { Node } from 'estree'

/** The little a statement must show to be read: its kind, and the directive it may declare. */
export type StatementLike = Node & { directive?: string | undefined }

/** What an arrow carries beyond the ESTree shape: the return annotation it may declare. */
export type AnnotatedNode = {
    type: string
    returnType?: { typeAnnotation?: { type: string } | undefined } | undefined
}
