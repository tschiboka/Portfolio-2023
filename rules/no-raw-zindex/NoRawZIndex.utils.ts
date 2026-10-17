import type { Nullable } from '../../common/utils/Generics/Generics.types.js'
import { StyleTokenPattern } from './NoRawZIndex.constants.js'

/** An AST node seen as its type plus whatever fields the check reads. */
type AstNode = { type: string; [field: string]: unknown }

const asNode = (value: unknown): Nullable<AstNode> =>
    typeof value === 'object' && value !== null && 'type' in value ? (value as AstNode) : null

const isIdentifierNamed = (node: Nullable<AstNode>, name: string): boolean =>
    node !== null && node.type === 'Identifier' && node.name === name

/** The property's key as text, whichever surface produced it — `zIndex` or `"z-index"`. */
export const keyTextOf = (key: unknown): string => {
    const node = asNode(key)
    if (node === null) return ''
    if (typeof node.name === 'string') return node.name
    if (typeof node.value === 'string') return node.value

    return ''
}

/** True for `Const.ZIndex.<layer>` — the only value a TS styles object may carry. */
export const isConstToken = (value: unknown): boolean => {
    const node = asNode(value)
    if (node === null || node.type !== 'MemberExpression') return false

    const zIndex = asNode(node.object)
    if (zIndex === null || zIndex.type !== 'MemberExpression') return false

    return (
        isIdentifierNamed(asNode(zIndex.object), 'Const') &&
        isIdentifierNamed(asNode(zIndex.property), 'ZIndex')
    )
}

/** True for a `var(--z-<layer>)` string — the only value a stylesheet may carry. */
export const isStyleToken = (value: unknown): boolean => {
    const node = asNode(value)

    return (
        node !== null &&
        node.type === 'Literal' &&
        typeof node.value === 'string' &&
        StyleTokenPattern.test(node.value)
    )
}

/** A shorthand property names a binding rather than a value, so it carries no z-index. */
export const isShorthand = (node: object): boolean => 'shorthand' in node && node.shorthand === true

/** A destructuring pattern reads a z-index rather than setting one. */
export const isObjectPattern = (node: object): boolean => {
    if (!('parent' in node)) return false

    const parent = asNode(node.parent)

    return parent !== null && parent.type === 'ObjectPattern'
}
