import { MessageArguments, MessageProperty } from './ValidationMessageSource.constants.js'
import type { CalleeLike, PropertyLike, ValueLike } from './ValidationMessageSource.types.js'

/**
 * Reads the method a call is made on — `min` from `yup.string().min(8)` — or `null` where the
 * callee is no named member. A computed key cannot be read, so it is left alone.
 *
 * @example
 * methodNameOf(calleeOf('yup.string().min(8)')) // 'min'
 * methodNameOf(calleeOf('build(name)')) // null
 */
export const methodNameOf = (callee: CalleeLike): string | null => {
    if (callee.type !== 'MemberExpression') return null
    if (callee.computed === true) return null
    if (callee.property?.type !== 'Identifier') return null

    return callee.property.name ?? null
}

/**
 * The argument index a named method carries its message in, or `null` where it carries none.
 *
 * @example
 * messageArgumentOf('min') // 1
 * messageArgumentOf('shape') // null
 */
export const messageArgumentOf = (method: string): number | null => {
    const index = MessageArguments[method]

    return Number.isInteger(index) ? index : null
}

/**
 * Answers whether the value is a message written out rather than built: any string literal, or any
 * template carrying text of its own. A template of nothing but substitutions carries no wording,
 * so it is left alone.
 *
 * @example
 * isStringLiteral(literalOf("'Name is required'")) // true
 * isStringLiteral(literalOf('`Name is ${verb}`')) // true
 * isStringLiteral(literalOf('`${verb}`')) // false
 */
export const isStringLiteral = (value: ValueLike | undefined): boolean => {
    if (value === undefined) return false
    if (value.type === 'Literal') return typeof value.value === 'string'
    if (value.type !== 'TemplateLiteral') return false

    return (value.quasis ?? []).some((quasi) => (quasi.value?.cooked ?? '').trim() !== '')
}

/**
 * Answers whether the property is the `message` a yup options object carries, written either as
 * a bare key or as a quoted one.
 */
export const isMessageProperty = (property: PropertyLike): boolean => {
    if (property.computed === true) return false
    if (property.key?.type === 'Identifier') return property.key.name === MessageProperty

    return property.key?.type === 'Literal' && property.key.value === MessageProperty
}
