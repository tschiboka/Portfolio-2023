import { ErrorMessage } from './NoMagicBreakpoint.constants.js'
import { getQueryText, getWidths, isTokenWidth } from './NoMagicBreakpoint.utils.js'
import { MediaQueryKey } from '../styleProcessor.js'
import type { Rule } from 'eslint'

type PropertyNode = Parameters<NonNullable<Rule.NodeListener['Property']>>[0]

/** Answers whether a property is the marker the style processor emits for `@media`. */
const isMediaQuery = (node: PropertyNode): boolean =>
    node.key.type === 'Literal' && node.key.value === MediaQueryKey

const Eslint = {
    NoMagicBreakpoint9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: PropertyNode): void => {
                if (!isMediaQuery(node)) return

                const query = getQueryText(node.value)
                if (query === null) return
                if (getWidths(query).every(isTokenWidth)) return

                context.report({ message: ErrorMessage, node })
            }

            return { Property: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
