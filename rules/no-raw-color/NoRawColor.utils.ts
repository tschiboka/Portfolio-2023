import { ColorFamilies, ColorTokens } from '../tokens.generated.js'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** An AST node seen as its type plus whatever fields the check reads. */
type AstNode = { type: string; [field: string]: unknown }

/** Built once: the generated sheets carry hundreds of colour names, so a scan per property would not do. */
const KnownFamilies = new Set<string>(ColorFamilies)
const KnownColours = new Set<string>(ColorTokens)

const asNode = (value: unknown): Nullable<AstNode> =>
    typeof value === 'object' && value !== null && 'type' in value ? (value as AstNode) : null

/** The string a node carries, or `null` when it carries none. */
export const getString = (node: unknown): Nullable<string> => {
    const value = asNode(node)

    return value !== null && value.type === 'Literal' && typeof value.value === 'string'
        ? value.value
        : null
}

/** A shorthand property names a binding rather than a value. */
export const isShorthand = (node: object): boolean => 'shorthand' in node && node.shorthand === true

/** A destructuring pattern reads a value rather than setting one. */
export const isObjectPattern = (node: object): boolean => {
    if (!('parent' in node)) return false

    const parent = asNode(node.parent)

    return parent !== null && parent.type === 'ObjectPattern'
}

/**
 * True when a custom property name is one the sheets define, or belongs to no colour family.
 *
 * A name such as `--black-2a55` claims to be a colour but the palette has no such step, so the
 * declaration silently resolves to nothing. Names from other families — `--space-16`, `--z-panel`,
 * `--panel-shadow` — are left to the rules that own them.
 */
export const isKnownColour = (name: string): boolean => {
    const bare = name.replace(/^--/, '')
    const family = bare.split('-')[0] ?? ''

    return !KnownFamilies.has(family) || KnownColours.has(bare)
}

/** The name a property carries — `color` from `color:` or from `"color":` — or `null`. */
export const getPropertyName = (node: object): Nullable<string> => {
    const key = asNode('key' in node ? node.key : null)

    if (key === null) return null
    if (key.type === 'Identifier') return typeof key.name === 'string' ? key.name : null

    return getString(key)
}

/**
 * True when a bare word is a colour the palette defines — `orange`, `warning`, `gray`.
 *
 * Such a word is a family name the code may use as a label, so the grammar counting it as a
 * CSS keyword says nothing about whether a colour was written by hand.
 */
export const isPaletteName = (name: string): boolean => KnownColours.has(name)
