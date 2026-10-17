import { ErrorMessage, StyleKey, TsKey } from './NoRawZIndex.constants.js'
import {
    isConstToken,
    isObjectPattern,
    isShorthand,
    isStyleToken,
    keyTextOf,
} from './NoRawZIndex.utils.js'
import type { Rule } from 'eslint'

type PropertyNode = Parameters<NonNullable<Rule.NodeListener['Property']>>[0]

const Eslint = {
    NoRawZIndex9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: PropertyNode): void => {
                if (isShorthand(node) || isObjectPattern(node)) return

                const key = keyTextOf(node.key)
                const isRaw =
                    (key === TsKey && !isConstToken(node.value)) ||
                    (key === StyleKey && !isStyleToken(node.value))

                if (isRaw) context.report({ message: ErrorMessage, node })
            }

            return { Property: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
