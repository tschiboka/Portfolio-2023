import { NoRawSemanticJsxConstants } from './NoRawSemanticJsx.constants.js'
import type { Rule } from 'eslint'
import type { JsxElementNode, TagNameString } from './NoRawSemanticJsx.types.js'

export const isJsxElement = (node: Rule.Node): node is Rule.Node & JsxElementNode =>
    (node.type as string) === 'JSXElement'

export const getTagNameString = ({ context, node }: TagNameString) => {
    const nameTag = context.sourceCode.text.slice(...node.openingElement.name.range)
    const nameText = nameTag.replace(/[^a-z0-9]/gi, '')
    return nameText
}

export const getIsTagThrowError = (tagNameString: string) =>
    NoRawSemanticJsxConstants.Error.find(({ tag }) => tag === tagNameString)

export const TestUtils = { getTagNameString, getIsTagThrowError }
