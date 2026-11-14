import { NoRawSemanticJsxConstants } from './NoRawSemanticJsx.constants.js'
import type { Rule } from 'eslint'

export const isJsxElement = (node: Rule.Node): node is Rule.Node & JsxElementNode =>
    (node.type as string) === 'JSXElement'

type TagNameString = {
    context: Rule.RuleContext
    node: JsxElementNode
}

export const getTagNameString = ({ context, node }: TagNameString) => {
    const nameTag = context.sourceCode.text.slice(...node.openingElement.name.range)
    const nameText = nameTag.replace(/[^a-z0-9]/gi, '')
    return nameText
}

export const getIsTagThrowError = (tagNameString: string) =>
    NoRawSemanticJsxConstants.Error.find(({ tag }) => tag === tagNameString)

export const TestUtils = { getTagNameString, getIsTagThrowError }

/**
 * ESLint types no JSX visitor: `Rule.Node` is built from `@types/estree`, which omits JSX, so the
 * shape a `JSXElement` listener receives has to be declared and narrowed rather than imported.
 */
export type JsxElementNode = {
    type: 'JSXElement'
    openingElement: { name: { range: [number, number] } }
}
