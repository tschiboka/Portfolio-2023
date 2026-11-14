import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** A comment as this rule reads it: the text, and where it sits in the file. */
export type CommentLike = {
    value: string
    loc?: Nullable<{
        start: { line: number; column: number }
        end: { line: number; column: number }
    }>
}
