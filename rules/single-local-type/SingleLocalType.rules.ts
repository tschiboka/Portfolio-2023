import {
    Description,
    HomeMessage,
    NameMessage,
    PlacementMessage,
} from './SingleLocalType.constants.js'
import {
    findOwnerBehindOf,
    findOwnerOf,
    getExpectedName,
    getFunctionNamesOf,
    getHomeOf,
    getNextOf,
    getStatementOf,
    hasPropsSuffix,
} from './SingleLocalType.utils.js'
import { isDefined, isString } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { NodeLike } from './SingleLocalType.types.js'

const Eslint = {
    SingleLocalType9: {
        meta: {
            type: 'problem',
            schema: [],
            docs: { description: Description },
            messages: {
                home: HomeMessage,
                name: NameMessage,
                placement: PlacementMessage,
            },
        },
        create(context) {
            const home = getHomeOf(context.filename)

            const check = (node: Rule.Node) => {
                const declaration = node as unknown as NodeLike
                const name = declaration.id?.name
                if (!isString(name)) return

                const statement = getStatementOf(declaration)
                const owner = findOwnerOf(statement, name)

                if (isDefined(owner)) {
                    // Anywhere but directly above its own function is a move, not a rename.
                    if (owner !== getNextOf(statement))
                        context.report({ messageId: 'placement', node, data: { name } })

                    return
                }

                // A function above the declaration already claims this name, so it sits too late.
                if (isDefined(findOwnerBehindOf(statement, name))) {
                    context.report({ messageId: 'placement', node, data: { name } })

                    return
                }

                const [nextName] = getFunctionNamesOf(getNextOf(statement))

                // A declaration that claims one of the two suffixes is renamed, never relocated by name.
                if (isDefined(nextName) && hasPropsSuffix(name)) {
                    context.report({
                        messageId: 'name',
                        node,
                        data: { expected: getExpectedName(nextName), name },
                    })

                    return
                }

                context.report({ messageId: 'home', node, data: { home, name } })
            }

            return {
                TSEnumDeclaration: check,
                TSTypeAliasDeclaration: check,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
