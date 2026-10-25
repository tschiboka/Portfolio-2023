import { lexer, parse } from 'css-tree'
import type { CssNode } from 'css-tree'
import type { Nullable } from '../common/utils/Generics/Generics.types.js'

/** Keywords the grammar calls colours, but which have no palette entry to stand in. */
const AllowedKeywords = ['currentColor', 'transparent']

/** Functions whose result is a colour; containers such as `color-mix()` are deliberately absent. */
const ColorFunctions = [
    'color',
    'device-cmyk',
    'hsl',
    'hsla',
    'hwb',
    'lab',
    'lch',
    'oklab',
    'oklch',
    'rgb',
    'rgba',
]

/** A hash that is a hex colour — a hash is any `#name`, including a url fragment. */
const HexColor = /^(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i

/** SCSS variables and interpolation are not CSS and make the parser throw. */
const Scss = /\$[a-z0-9_-]+/i

/** How far a `var()` fallback may nest, since a fallback is re-parsed as a value. */
const MaxDepth = 4

const parseValue = (value: string): Nullable<CssNode> => {
    try {
        return parse(value, { context: 'value' })
    } catch {
        return null
    }
}

const getChildren = (node: CssNode): ReadonlyArray<CssNode> =>
    'children' in node && typeof node.children === 'object' && node.children !== null
        ? node.children.toArray()
        : []

const isColorNode = (node: CssNode): boolean => {
    if (node.type === 'Hash') return HexColor.test(node.value)
    if (node.type === 'Function') return ColorFunctions.includes(node.name.toLowerCase())
    if (node.type === 'Identifier')
        return (
            !AllowedKeywords.includes(node.name) &&
            lexer.matchType('color', node.name).matched !== null
        )

    return false
}

const holdsColor = (node: CssNode, depth: number): boolean => {
    if (isColorNode(node)) return true
    if (node.type === 'Raw') return depth > 0 && hasColor(node.value, depth - 1)

    return getChildren(node).some((child) => holdsColor(child, depth))
}

/** True when a value carries a colour the grammar knows, however deeply nested. */
const hasColor = (value: string, depth: number = MaxDepth): boolean => {
    if (Scss.test(value)) return false

    const ast = parseValue(value)

    return ast !== null && holdsColor(ast, depth)
}

const getVarName = (node: CssNode): Nullable<string> => {
    const children = getChildren(node)
    const [only] = children

    return children.length === 1 && only !== undefined && only.type === 'Identifier'
        ? only.name
        : null
}

/** The `var(--name)` a value consists of, or `null` when it is more than that. */
const getTokenName = (value: string): Nullable<string> => {
    const ast = parseValue(value)
    const children = ast === null ? [] : getChildren(ast)
    const [only] = children

    return children.length === 1 &&
        only !== undefined &&
        only.type === 'Function' &&
        only.name === 'var'
        ? getVarName(only)
        : null
}

/** The bare colour keyword a value is — `orange` but not `1px solid orange` — or `null`. */
const getColorKeyword = (value: string): Nullable<string> => {
    if (Scss.test(value)) return null

    const ast = parseValue(value)
    const children = ast === null ? [] : getChildren(ast)
    const [only] = children

    return children.length === 1 &&
        only !== undefined &&
        only.type === 'Identifier' &&
        isColorNode(only)
        ? only.name
        : null
}

/** A `var(--name)` anywhere in a value — a fallback is parsed as raw text, so the tree hides it. */
const TokenNamePattern = /var\(\s*(--[a-z0-9-]+)/gi

/** Every custom property a value names, in the order it names them. */
const getTokenNames = (value: string): string[] =>
    Scss.test(value)
        ? []
        : [...value.matchAll(TokenNamePattern)]
              .map((match) => match[1])
              .filter((name): name is string => name !== undefined)

/** True for a value that is a palette token: a lone `var()` or an SCSS variable. */
const isToken = (value: string): boolean => Scss.test(value) || getTokenName(value) !== null

/** `backgroundColor` → `background-color`, so a React style object is judged like a stylesheet. */
const toKebabCase = (name: string): string =>
    name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

/** True for a name a stylesheet or a React style object could declare. */
const isProperty = (name: string): boolean =>
    name.startsWith('--') || lexer.getProperty(toKebabCase(name)) !== null

/** CSS value questions the rule registry answers from the grammar rather than from patterns. */
export const Css = {
    getColorKeyword,
    getTokenName,
    getTokenNames,
    hasColor,
    isProperty,
    isToken,
}
