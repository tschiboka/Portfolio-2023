import {
    AllowedHookNames,
    AllowedViMethods,
    DataErrorMessage,
    Description,
    HelperErrorMessage,
} from './NoSpecLocalDeclaration.constants.js'
import {
    getDeclarationKind,
    getDeclaratorKind,
    getStatementKind,
    isSuiteStatement,
} from './NoSpecLocalDeclaration.utils.js'
import type { Rule } from 'eslint'
import type { OffendingKind, StatementLike } from './NoSpecLocalDeclaration.types.js'

type ProgramNode = Parameters<NonNullable<Rule.NodeListener['Program']>>[0]
type StatementNode = ProgramNode['body'][number]

const messages: Record<OffendingKind, string> = {
    helper: HelperErrorMessage,
    data: DataErrorMessage,
}

/** The statements a suite's callback declares, or `[]` where the callback is written as an expression. */
const getSuiteBody = (statement: StatementNode): StatementNode[] => {
    if (statement.type !== 'ExpressionStatement') return []
    if (statement.expression.type !== 'CallExpression') return []

    const [, callback] = statement.expression.arguments
    if (callback?.type !== 'ArrowFunctionExpression' && callback?.type !== 'FunctionExpression')
        return []

    return callback.body.type === 'BlockStatement' ? callback.body.body : []
}

const Eslint = {
    NoSpecLocalDeclaration9: {
        meta: {
            type: 'suggestion',
            docs: { description: Description },
        },
        create(context) {
            const report = (node: unknown, kind: OffendingKind): void =>
                context.report({ message: messages[kind], node: node as Rule.Node })

            const checkDeclarators = (statement: StatementLike): void =>
                statement.declarations?.forEach((declarator) => {
                    const kind = getDeclaratorKind(declarator, AllowedViMethods)
                    if (kind !== null) report(declarator, kind)
                })

            const checkSuite = (statements: StatementNode[]): void =>
                statements.forEach((statement) => {
                    if (isSuiteStatement(statement)) return checkSuite(getSuiteBody(statement))

                    if (statement.type === 'VariableDeclaration') return checkDeclarators(statement)

                    const kind = getDeclarationKind(statement, AllowedViMethods)
                    if (kind !== null) report(statement, kind)
                })

            return {
                Program(node: ProgramNode) {
                    const suite = node.body.findIndex(isSuiteStatement)
                    if (suite === -1) return

                    node.body.slice(0, suite).forEach((statement) => {
                        if (statement.type === 'VariableDeclaration')
                            return checkDeclarators(statement)

                        const kind = getStatementKind(statement, AllowedHookNames, AllowedViMethods)
                        if (kind !== null) report(statement, kind)
                    })

                    node.body.slice(suite).forEach((statement) => {
                        if (isSuiteStatement(statement)) checkSuite(getSuiteBody(statement))
                    })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
