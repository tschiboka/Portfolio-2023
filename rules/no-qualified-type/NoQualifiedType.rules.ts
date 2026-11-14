import { isDefined } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

export const ErrorMessage = 'A type must be imported, not reached through a namespace.'

/** The clauses that name a type while accepting an expression, so their name parses as a member. */
const HeritageParents = new Set(['TSClassImplements', 'TSInterfaceHeritage'])

/** A node whose parent may be absent, which is all the three questions below need. */
type WithParent = { parent: Nullable<{ type: string }> }

/** The parent's node type, or an empty string at the root, so no comparison has to guard. */
const getParentType = (node: WithParent): string => node.parent?.type ?? ''

/**
 * Answers whether a qualified name is the one to report.
 *
 * A nested name belongs to its parent, which reports the whole chain once. A name inside
 * `typeof` is a value query, and one inside `import('…')` is an inline import that names its
 * module already, so neither is a type reached through a namespace binding.
 */
const isReportableName = (node: WithParent): boolean => {
    const parentType = getParentType(node)

    return (
        parentType !== 'TSQualifiedName' &&
        parentType !== 'TSTypeQuery' &&
        parentType !== 'TSImportType'
    )
}

/**
 * Answers whether a member expression is a heritage clause's type name.
 *
 * A class `extends` clause is left alone: it names the superclass value, not a type.
 */
const isReportableMember = (node: WithParent): boolean => HeritageParents.has(getParentType(node))

/** A dotted chain, whose first name is the one that has to be imported. */
type NameChain = { type: string; name?: string; left?: NameChain }

/** A member chain, whose first name is the one that has to be imported. */
type MemberChain = { type: string; name?: string; object?: MemberChain }

/** The first name of a dotted chain — `React` for `React.FormEvent`, `A` for `A.B.C`. */
const getRootName = (node: NameChain): Nullable<string> => {
    if (node.type === 'Identifier') return node.name ?? null

    return node.left ? getRootName(node.left) : null
}

/** The first name of a member chain — `React` for `React.Component`. */
const getMemberRootName = (node: MemberChain): Nullable<string> => {
    if (node.type === 'Identifier') return node.name ?? null

    return node.object ? getMemberRootName(node.object) : null
}

const Eslint = {
    Min9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const importedNames = new Set<string>()

            const isImported = (name: Nullable<string>): boolean =>
                isDefined(name) && importedNames.has(name)

            return {
                ImportDeclaration(node: Rule.Node) {
                    const { specifiers } = node as unknown as {
                        specifiers: { local: { name: string } }[]
                    }

                    specifiers.forEach((specifier) => importedNames.add(specifier.local.name))
                },
                MemberExpression(node: Rule.Node) {
                    if (!isReportableMember(node)) return
                    if (isImported(getMemberRootName(node))) return

                    context.report({ node, message: ErrorMessage })
                },
                TSQualifiedName(node: Rule.Node) {
                    if (!isReportableName(node)) return
                    if (isImported(getRootName(node))) return

                    context.report({ node, message: ErrorMessage })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
