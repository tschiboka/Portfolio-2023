import type { Nullable } from '../../common/utils/Generics/Generics.types.js'
import { Css } from '../css.js'
import { ZIndexTokens } from '../tokens.generated.js'
import { StyleTokenPrefix } from './NoRawZIndex.constants.js'

const isLayer = (name: unknown): boolean =>
    typeof name === 'string' && (ZIndexTokens as readonly string[]).includes(name)

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

    if (!isIdentifierNamed(asNode(zIndex.object), 'Const')) return false
    if (!isIdentifierNamed(asNode(zIndex.property), 'ZIndex')) return false

    const layer = asNode(node.property)

    return isLayer(node.computed === true ? layer?.value : layer?.name)
}

/** True for a `var(--z-<layer>)` string naming a real layer. */
export const isStyleToken = (value: unknown): boolean => {
    const node = asNode(value)
    if (node === null || node.type !== 'Literal' || typeof node.value !== 'string') return false

    const name = Css.getTokenName(node.value)
    if (name === null || !name.startsWith(StyleTokenPrefix)) return false

    return isLayer(name.slice(StyleTokenPrefix.length))
}

/** A shorthand property names a binding rather than a value, so it carries no z-index. */
export const isShorthand = (node: object): boolean => 'shorthand' in node && node.shorthand === true

/** A destructuring pattern reads a z-index rather than setting one. */
export const isObjectPattern = (node: object): boolean => {
    if (!('parent' in node)) return false

    const parent = asNode(node.parent)

    return parent !== null && parent.type === 'ObjectPattern'
}
