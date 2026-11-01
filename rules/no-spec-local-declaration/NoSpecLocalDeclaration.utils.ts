import type {
    DeclaratorLike,
    NodeLike,
    OffendingKind,
    StatementLike,
} from './NoSpecLocalDeclaration.types.js'

const isIdentifier = (node: NodeLike | undefined, name: string): boolean =>
    node?.type === 'Identifier' && node.name === name

const isDescribe = (callee: NodeLike): boolean => {
    if (callee.type === 'CallExpression')
        return callee.callee !== undefined && isDescribe(callee.callee)
    if (callee.type === 'MemberExpression')
        return callee.object !== undefined && isDescribe(callee.object)

    return isIdentifier(callee, 'describe')
}

const isViMethod = (callee: NodeLike | undefined, viMethods: string[]): boolean =>
    callee?.type === 'MemberExpression' &&
    isIdentifier(callee.object, 'vi') &&
    callee.property?.name !== undefined &&
    viMethods.includes(callee.property.name)

/** Answers whether a statement opens a suite — the plain form or any member form, such as `.each`. */
export const isSuiteStatement = (statement: StatementLike): boolean =>
    statement.type === 'ExpressionStatement' &&
    statement.expression?.type === 'CallExpression' &&
    statement.expression.callee !== undefined &&
    isDescribe(statement.expression.callee)

/**
 * Reads what a single declarator puts in a spec.
 *
 * An alias and a destructure carry no value of their own, and a `vi.mock` / `vi.mocked` handle cannot
 * move — a mocked module resolves from the file that mocks it, and a handle resolves from the call
 * above it. Everything else either describes behaviour, which is a helper, or holds values, which is
 * data.
 */
export const getDeclaratorKind = (
    declarator: DeclaratorLike,
    viMethods: string[],
): OffendingKind | null => {
    const { id, init } = declarator

    if (id?.type === 'ObjectPattern' || id?.type === 'ArrayPattern') return null
    if (init?.type === 'ArrowFunctionExpression' || init?.type === 'FunctionExpression')
        return 'helper'
    if (init?.type === 'CallExpression' && isViMethod(init.callee, viMethods)) return null
    if (init?.type === 'Identifier' || init?.type === 'MemberExpression') return null

    return 'data'
}

/**
 * Reads what a declaration puts in a spec, or `null` where it belongs there.
 *
 * A type is a type wherever it is written, a function describes behaviour, and a value is data. A
 * declaration is the only shape read inside a suite: a call there is a test or a hook.
 */
export const getDeclarationKind = (
    statement: StatementLike,
    viMethods: string[],
): OffendingKind | null => {
    if (statement.type === 'ExportNamedDeclaration')
        return statement.declaration ? getDeclarationKind(statement.declaration, viMethods) : null
    if (statement.type === 'FunctionDeclaration') return 'helper'
    if (statement.type === 'ClassDeclaration') return 'helper'
    if (statement.type === 'TSTypeAliasDeclaration' || statement.type === 'TSInterfaceDeclaration')
        return null
    if (statement.type === 'TSEnumDeclaration' || statement.type === 'TSModuleDeclaration')
        return null

    return null
}

/**
 * Reads what a statement puts above the first suite, or `null` where it belongs there.
 *
 * A call above every suite runs before any test does, so it is a helper unless it is a lifecycle hook
 * or a hoisted `vi` form.
 */
export const getStatementKind = (
    statement: StatementLike,
    hooks: string[],
    viMethods: string[],
): OffendingKind | null => {
    if (statement.type !== 'ExpressionStatement') return getDeclarationKind(statement, viMethods)

    const expression = statement.expression
    if (expression?.type !== 'CallExpression') return 'helper'
    if (expression.callee?.type === 'Identifier' && hooks.includes(expression.callee.name ?? ''))
        return null

    return isViMethod(expression.callee, viMethods) ? null : 'helper'
}
