import {
    BoundMethods,
    ComparingMethod,
    ComparisonOperators,
    PresenceBound,
} from './NoInlineValidationLiteral.constants.js'
import type { CalleeLike, ValueNode } from './NoInlineValidationLiteral.types.js'

/**
 * Reads the method a call is made on — `min` from `yup.string().min(8)` — or `null` where the
 * callee is no named member. A computed key cannot be read, so it is left alone.
 */
export const methodNameOf = (callee: CalleeLike): string | null => {
    if (callee.type !== 'MemberExpression') return null
    if (callee.computed === true) return null
    if (callee.property?.type !== 'Identifier') return null

    return callee.property.name ?? null
}

/** Answers whether the method takes a numeric bound as its first argument. */
export const isBoundMethod = (method: string): boolean => BoundMethods.includes(method)

/** Answers whether the method takes a pattern as its first argument. */
export const isPatternMethod = (method: string): boolean => method === 'matches'

/** Answers whether the call is the one whose callback compares against a bound. */
export const isComparingMethod = (method: string): boolean => method === ComparingMethod

/** Answers whether the operator is one a bound comparison uses. */
export const isComparisonOperator = (operator: string): boolean =>
    ComparisonOperators.includes(operator)

/**
 * Answers whether the value is a written number.
 *
 * @example
 * isNumberLiteral(argumentOf('min(8)')) // true
 * isNumberLiteral(argumentOf('min(limit)')) // false
 */
export const isNumberLiteral = (value: ValueNode | undefined): boolean =>
    value?.type === 'Literal' && typeof value.value === 'number'

/**
 * Answers whether the value is a pattern written in place rather than named.
 *
 * @example
 * isRegexLiteral(argumentOf('matches(/^[0-9]+$/)')) // true
 * isRegexLiteral(argumentOf('matches(Regexp.Alphanumeric)')) // false
 */
export const isRegexLiteral = (value: ValueNode | undefined): boolean =>
    value?.type === 'Literal' && (value.regex !== undefined || value.value instanceof RegExp)

/** Reads the number a value writes out, or `null` where it writes none. */
export const numberValueOf = (value: ValueNode | undefined): number | null =>
    isNumberLiteral(value) ? Number(value?.value) : null

/**
 * Answers whether the bound asserts presence rather than declaring a limit — `.min(1)`.
 *
 * @example
 * isPresenceBound('min', argumentOf('min(1)')) // true
 * isPresenceBound('max', argumentOf('max(1)')) // false
 */
export const isPresenceBound = (method: string, value: ValueNode | undefined): boolean =>
    method === 'min' && numberValueOf(value) === PresenceBound
