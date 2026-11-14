import { isDefined, isEmpty, isNonEmpty } from '../../common/utils/Predicate/Predicate.js'
import type { Node } from 'estree'
import type { SourceCode } from 'eslint'
import type { AnnotatedNode, StatementLike } from './NoBracedArrowBody.types.js'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/**
 * The one statement a block body holds when it can stand after the `=>`.
 *
 * A lone `return` belongs to `arrow-body-style`, and a lone `throw` or directive string has no
 * expression form, so each keeps the braces that carry it.
 */
export const unwrappableStatementOf = <Statement extends StatementLike>(body: {
    body: Statement[]
}): Nullable<Statement> => {
    const [statement, ...others] = body.body
    if (!isDefined(statement) || isNonEmpty(others)) return null
    if (statement.type !== 'ExpressionStatement') return null
    if (isDefined(statement.directive)) return null

    return statement
}

/** True when the braces carry no comment of their own, so removing them loses nothing. */
export const dropsNoComment = (source: SourceCode, statement: Node): boolean =>
    isEmpty(source.getCommentsBefore(statement)) && isEmpty(source.getCommentsAfter(statement))

/** True when the arrow declares a `void` return, which the unwrapped expression would mistype. */
export const hasVoidReturn = ({ returnType }: AnnotatedNode): boolean =>
    returnType?.typeAnnotation?.type === 'TSVoidKeyword'
