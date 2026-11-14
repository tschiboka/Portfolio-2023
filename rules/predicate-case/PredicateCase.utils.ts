import { GuardedTypes, NullishOperators } from './PredicateCase.constants.js'
import { isNull, isNumber, isString, isUndefined } from '../../common/utils/Predicate/Predicate.js'
import type { ExpressionLike, ShapeKind } from './PredicateCase.types.js'
import type { Dictionary, Nullable, Optional } from '../../common/utils/Generics/Generics.types.js'

/**
 * The operator a comparison carries once its sides are put back in reading order, so `0 < x.length`
 * asks the same question as `x.length > 0`.
 */
const readingOrder = (operator: string, mirrored: boolean): string => {
    if (!mirrored) return operator

    const mirror: Dictionary<string> = { '>': '<', '<': '>', '>=': '<=', '<=': '>=' }

    return mirror[operator] ?? operator
}

/** The node inside an optional chain, so `items?.length` reads as the member it is. */
const unwrapChain = (node: Optional<ExpressionLike>): Optional<ExpressionLike> =>
    node?.type === 'ChainExpression' ? node.expression : node

/** True when the expression reads a `.length` — the count a predicate already asks about. */
export const isLengthMember = (node: Optional<ExpressionLike>): boolean => {
    const inner = unwrapChain(node)

    return (
        inner?.type === 'MemberExpression' &&
        inner.computed !== true &&
        inner.property?.type === 'Identifier' &&
        inner.property.name === 'length'
    )
}

/** The number a literal writes, or `null` where it writes none. */
export const numberOf = (node: Optional<ExpressionLike>): Nullable<number> =>
    node?.type === 'Literal' && isNumber(node.value) ? node.value : null

/** The string a literal writes, or `null` where it writes none. */
export const stringOf = (node: Optional<ExpressionLike>): Nullable<string> =>
    node?.type === 'Literal' && isString(node.value) ? node.value : null

/** True when the expression is a `typeof` read. */
export const isTypeofRead = (node: Optional<ExpressionLike>): boolean =>
    node?.type === 'UnaryExpression' && node.operator === 'typeof'

/** Answers whether a call is `Boolean(...)`, written with or without `new`. */
const isBooleanCall = (node: Optional<ExpressionLike>): boolean =>
    (node?.type === 'CallExpression' || node?.type === 'NewExpression') &&
    node.callee?.type === 'Identifier' &&
    node.callee.name === 'Boolean'

/** Answers whether a call is `Array.isArray(...)`. */
const isArrayCall = (node: Optional<ExpressionLike>): boolean =>
    node?.type === 'CallExpression' &&
    node.callee?.type === 'MemberExpression' &&
    node.callee.object?.type === 'Identifier' &&
    node.callee.object.name === 'Array' &&
    (node.callee.property?.name === 'isArray' || node.callee.property?.value === 'isArray')

/** True when the expression writes `null`. */
export const isNullLiteral = (node: Optional<ExpressionLike>): boolean =>
    node?.type === 'Literal' && isNull(node.value)

/** True when the expression names `undefined`, written bare or as `void 0`. */
export const isUndefinedIdentifier = (node: Optional<ExpressionLike>): boolean =>
    (node?.type === 'Identifier' && node.name === 'undefined') ||
    (node?.type === 'UnaryExpression' && node.operator === 'void' && node.argument?.value === 0)

/** Answers whether a negation tests a length — `!items.length`. */
const isNegatedLength = (node: ExpressionLike): boolean =>
    node.type === 'UnaryExpression' && node.operator === '!' && isLengthMember(node.argument)

/**
 * Reads what a comparison restates, or `null` where it asks something no predicate already names.
 *
 * @example
 * shapeOf('length', '>')      // 'length' — `.length > 0` is `isNonEmpty`
 * shapeOf('length', '>', 3)   // null — a bound, not a predicate
 */
export const shapeOf = (node: ExpressionLike): Nullable<ShapeKind> => {
    if (isBooleanCall(node)) return 'truthy'
    if (isArrayCall(node)) return 'array'
    if (isNegatedLength(node)) return 'length'

    const { left, operator, right } = node
    if (isUndefined(operator)) return null

    if (operator === 'instanceof') return 'instance'

    const mirrored = isLengthMember(right)
    const lengthSide = isLengthMember(left) || mirrored

    if (lengthSide) {
        const literal = numberOf(mirrored ? left : right)
        if (isNull(literal)) return null

        const op = readingOrder(operator, mirrored)
        const nonEmpty = (op === '>' && literal === 0) || (op === '>=' && literal === 1)
        const empty = (op === '===' && literal === 0) || (op === '<' && literal === 1)

        return nonEmpty || empty ? 'length' : null
    }

    if (isTypeofRead(left) || isTypeofRead(right)) {
        const literal = stringOf(left) ?? stringOf(right)
        if (isNull(literal)) return null

        return GuardedTypes.includes(literal) ? 'typeof' : null
    }

    const absence = isNullLiteral(left) || isNullLiteral(right)
    const undefinedName = isUndefinedIdentifier(left) || isUndefinedIdentifier(right)

    return (absence || undefinedName) && NullishOperators.includes(operator) ? 'nullish' : null
}
