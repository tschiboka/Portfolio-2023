import type { TSESTree } from '@typescript-eslint/types'
import type { Rule } from 'eslint'
import { NoRawSemanticJsxConstants } from './NoRawSemanticJsx.constants.js'

type TagNameString = {
    context: Rule.RuleContext
    node: TSESTree.JSXElement
}
export const getTagNameString = ({ context, node }: TagNameString) => {
    const nameTag = context.sourceCode.text.slice(...node.openingElement.name.range)
    const nameText = nameTag.replace(/[^a-z0-9]/gi, '')
    return nameText
}

export const getIsTagThrowError = (tagNameString: string) =>
    NoRawSemanticJsxConstants.Error.find(({ tag }) => tag === tagNameString)

export const TestUtils = { getTagNameString, getIsTagThrowError }
