import { getNameText, getTestName, isTestName } from './TestNameVerb.utils.js'
import { AliasErrorMessage, ErrorMessage } from './TestNameVerb.constants.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { Defined } from '../../common/utils/Generics/Generics.types.js'

type CallNode = Parameters<Defined<Rule.NodeListener['CallExpression']>>[0]

const Eslint = {
    TestNameVerb9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const check = (node: CallNode): void => {
                const name = getNameText(node.arguments[0])
                if (isNull(name)) return

                const testName = getTestName(node.callee)
                if (isNull(testName)) return

                if (testName !== 'it') {
                    context.report({ message: AliasErrorMessage, node })
                    return
                }

                if (isTestName(name)) return

                context.report({ message: ErrorMessage, node })
            }

            return { CallExpression: check }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
