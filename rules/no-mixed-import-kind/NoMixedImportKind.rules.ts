import { ErrorMessage } from './NoMixedImportKind.constants.js'
import { isNonEmpty } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'

/** A specifier's kind — `type` when the parser marks it, `value` otherwise. */
const isType = (specifier: object): boolean =>
    'importKind' in specifier && specifier.importKind === 'type'

const Eslint = {
    NoMixedImportKind9: {
        meta: {
            type: 'problem',
            docs: { description: ErrorMessage },
        },
        create(context) {
            return {
                ImportDeclaration(node) {
                    const types = node.specifiers.filter(isType)
                    const values = node.specifiers.filter((specifier) => !isType(specifier))
                    if (isNonEmpty(types) && isNonEmpty(values))
                        context.report({ message: ErrorMessage, node })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
