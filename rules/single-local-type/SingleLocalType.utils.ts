import { PropsSuffix } from './SingleLocalType.constants.js'
import { Strings } from '../../common/utils/Strings/Strings.js'
import { isDefined, isNonEmpty, isString } from '../../common/utils/Predicate/Predicate.js'
import type { NodeLike } from './SingleLocalType.types.js'
import type { Optional } from '../../common/utils/Generics/Generics.types.js'

const FunctionNodeTypes = ['FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression']
const WrapperNodeTypes = ['ExportNamedDeclaration', 'ExportDefaultDeclaration']

/** The statement a node was exported by, or the node itself where it stands alone. */
export const getStatementOf = (node: NodeLike): NodeLike =>
    isDefined(node.parent) &&
    WrapperNodeTypes.includes(node.parent.type) &&
    isDefined(node.parent.declaration)
        ? node.parent
        : node

/** The functions a statement declares, by name, whichever declarator carries them. */
export const getFunctionNamesOf = (statement: Optional<NodeLike>): string[] => {
    if (!isDefined(statement)) return []

    const declaration =
        WrapperNodeTypes.includes(statement.type) && isDefined(statement.declaration)
            ? statement.declaration
            : statement

    const declaredName = declaration.id?.name

    if (declaration.type === 'FunctionDeclaration')
        return isString(declaredName) ? [declaredName] : []

    if (declaration.type !== 'VariableDeclaration') return []

    return (declaration.declarations ?? []).flatMap((declarator) => {
        const name = declarator.id?.name

        if (!isDefined(declarator.init) || !isString(name)) return []

        return FunctionNodeTypes.includes(declarator.init.type) ? [name] : []
    })
}

/** The name a function's own type takes: the function's name capitalised, then `Props`. */
export const getExpectedName = (name: string): string =>
    isNonEmpty(name) ? `${Strings.capitalise(name)}${PropsSuffix}` : ''

/** True where a name claims to be a function's own type, by the suffix it carries. */
export const hasPropsSuffix = (name: string): boolean => name.endsWith(PropsSuffix)

/** The statements that share a statement's own body. */
const getSiblingsOf = (statement: NodeLike): NodeLike[] => statement.parent?.body ?? []

/** The statement directly after this one, within its own body. */
export const getNextOf = (statement: NodeLike): Optional<NodeLike> => {
    const siblings = getSiblingsOf(statement)
    const index = siblings.indexOf(statement)

    return index === -1 ? undefined : siblings[index + 1]
}

/** True where a statement declares a function that would take this name for its own type. */
const isOwnerOf =
    (name: string) =>
    (candidate: NodeLike): boolean =>
        getFunctionNamesOf(candidate).some((declared) => getExpectedName(declared) === name)

/** The statement whose own type takes this name, among the ones after the declaration. */
export const findOwnerOf = (statement: NodeLike, name: string): Optional<NodeLike> => {
    const siblings = getSiblingsOf(statement)
    const index = siblings.indexOf(statement)

    return siblings.slice(index + 1).find(isOwnerOf(name))
}

/** The nearest statement whose own type takes this name, searching backwards from here. */
export const findOwnerBehindOf = (statement: NodeLike, name: string): Optional<NodeLike> => {
    const siblings = getSiblingsOf(statement)
    const index = siblings.indexOf(statement)

    return siblings.slice(0, Math.max(index, 0)).reverse().find(isOwnerOf(name))
}

/** The types file that takes a declaration this file may not hold. */
export const getHomeOf = (fileName: string): string => {
    const leaf = fileName.split(/[/\\]/).pop() ?? ''
    const [stem] = leaf.split('.')

    return `${stem}.types.ts`
}
