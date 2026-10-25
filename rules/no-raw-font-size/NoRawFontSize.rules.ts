import { ErrorMessage } from './NoRawFontSize.constants.js'
import { hasAbsoluteLength, isFontSize } from './NoRawFontSize.utils.js'
import type { Rule } from 'eslint'

type PropertyNode = Parameters<NonNullable<Rule.NodeListener['Property']>>[0]

const Eslint = {
    NoRawFontSize9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: PropertyNode): void => {
                if (!isFontSize(node.key)) return
                if (!hasAbsoluteLength(node.value)) return

                context.report({ message: ErrorMessage, node })
            }

            return { Property: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
