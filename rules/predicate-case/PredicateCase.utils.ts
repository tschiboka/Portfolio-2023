import { GuardedTypes, NullishOperators } from './PredicateCase.constants.js'
import type { ExpressionLike, ShapeKind } from './PredicateCase.types.js'

/**
 * The operator a comparison carries once its sides are put back in reading order, so `0 < x.length`
 * asks the same question as `x.length > 0`.
 */
const readingOrder = (operator: string, mirrored: boolean): string => {
    if (!mirrored) return operator

    const mirror: Record<string, string> = { '>': '<', '<': '>', '>=': '<=', '<=': '>=' }

    return mirror[operator] ?? operator
}

/** True when the expression reads a `.length` — the count a predicate already asks about. */
export const isLengthMember = (node: ExpressionLike | undefined): boolean =>
    node?.type === 'MemberExpression' &&
    node.computed !== true &&
    node.property?.type === 'Identifier' &&
    node.property.name === 'length'

/** The number a literal writes, or `null` where it writes none. */
export const numberOf = (node: ExpressionLike | undefined): number | null =>
    node?.type === 'Literal' && typeof node.value === 'number' ? node.value : null

/** The string a literal writes, or `null` where it writes none. */
export const stringOf = (node: ExpressionLike | undefined): string | null =>
    node?.type === 'Literal' && typeof node.value === 'string' ? node.value : null

/** True when the expression is a `typeof` read. */
export const isTypeofRead = (node: ExpressionLike | undefined): boolean =>
    node?.type === 'UnaryExpression' && node.operator === 'typeof'

/** True when the expression writes `null`. */
export const isNullLiteral = (node: ExpressionLike | undefined): boolean =>
    node?.type === 'Literal' && node.value === null

/** True when the expression names `undefined`. */
export const isUndefinedIdentifier = (node: ExpressionLike | undefined): boolean =>
    node?.type === 'Identifier' && node.name === 'undefined'

/**
 * Reads what a comparison restates, or `null` where it asks something no predicate already names.
 *
 * @example
 * shapeOf('length', '>')      // 'length' — `.length > 0` is `isNonEmpty`
 * shapeOf('length', '>', 3)   // null — a bound, not a predicate
 */
export const shapeOf = (node: ExpressionLike): ShapeKind | null => {
    const { left, operator, right } = node
    if (operator === undefined) return null

    const mirrored = isLengthMember(right)
    const lengthSide = isLengthMember(left) || mirrored

    if (lengthSide) {
        const literal = numberOf(mirrored ? left : right)
        if (literal === null) return null

        const op = readingOrder(operator, mirrored)
        const nonEmpty = (op === '>' && literal === 0) || (op === '>=' && literal === 1)
        const empty = (op === '===' && literal === 0) || (op === '<' && literal === 1)

        return nonEmpty || empty ? 'length' : null
    }

    if (isTypeofRead(left) || isTypeofRead(right)) {
        const literal = stringOf(left) ?? stringOf(right)
        if (literal === null) return null

        return GuardedTypes.includes(literal) ? 'typeof' : null
    }

    const absence = isNullLiteral(left) || isNullLiteral(right)
    const undefinedName = isUndefinedIdentifier(left) || isUndefinedIdentifier(right)

    return (absence || undefinedName) && NullishOperators.includes(operator) ? 'nullish' : null
}
