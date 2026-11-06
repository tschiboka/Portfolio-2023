import {
    BoundMessage,
    ComparisonMessage,
    Description,
    PatternMessage,
} from './NoInlineValidationLiteral.constants.js'
import {
    isBoundMethod,
    isComparingMethod,
    isComparisonOperator,
    isNumberLiteral,
    isPatternMethod,
    isPresenceBound,
    isRegexLiteral,
    methodNameOf,
} from './NoInlineValidationLiteral.utils.js'
import type { Node } from 'estree'
import type { Rule } from 'eslint'

type CallNode = Parameters<NonNullable<Rule.NodeListener['CallExpression']>>[0]
type BinaryNode = Parameters<NonNullable<Rule.NodeListener['BinaryExpression']>>[0]

const Eslint = {
    NoInlineValidationLiteral9: {
        meta: {
            type: 'suggestion',
            docs: { description: Description },
        },
        create(context) {
            const report = (node: Node, message: string): void =>
                context.report({ message, node })

            let comparingDepth = 0

            const checkNumericBound = (node: CallNode, method: string): void => {
                if (!isBoundMethod(method)) return

                const bound = node.arguments[0]
                if (bound === undefined) return
                if (!isNumberLiteral(bound)) return
                if (isPresenceBound(method, bound)) return

                report(bound, BoundMessage)
            }

            const checkPattern = (node: CallNode, method: string): void => {
                if (!isPatternMethod(method)) return

                const pattern = node.arguments[0]
                if (pattern === undefined) return
                if (!isRegexLiteral(pattern)) return

                report(pattern, PatternMessage)
            }

            const checkCall = (node: CallNode): void => {
                const method = methodNameOf(node.callee)
                if (method === null) return

                checkNumericBound(node, method)
                checkPattern(node, method)

                if (isComparingMethod(method)) comparingDepth += 1
            }

            const exitCall = (node: CallNode): void => {
                const method = methodNameOf(node.callee)
                if (method === null) return
                if (!isComparingMethod(method)) return

                comparingDepth -= 1
            }

            const checkComparison = (node: BinaryNode): void => {
                if (comparingDepth === 0) return
                if (!isComparisonOperator(node.operator)) return
                if (!isNumberLiteral(node.left) && !isNumberLiteral(node.right)) return

                report(node, ComparisonMessage)
            }

            return {
                CallExpression: checkCall,
                'CallExpression:exit': exitCall,
                BinaryExpression: checkComparison,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
