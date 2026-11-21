import { ErrorMessage } from './NoDeepImport.constants.js'
import { getBarrelSpecifier } from './NoDeepImport.utils.js'
import { isString } from '../../common/utils/Predicate/Predicate.js'
import type { Rule } from 'eslint'
import type { NodeLike } from './NoDeepImport.types.js'

const Eslint = {
    NoDeepImport9: {
        meta: {
            type: 'problem',
            schema: [],
            fixable: 'code',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const complain = (node: Rule.Node) => {
                const source = (node as unknown as NodeLike).source
                if (!source || !isString(source.value)) return

                const barrel = getBarrelSpecifier(source.value, context.filename)
                if (!barrel) return

                const raw = source.raw
                const quote = isString(raw) && raw.startsWith('"') ? '"' : "'"

                context.report({
                    message: [ErrorMessage, `Import "${barrel}" instead.`].join(' '),
                    node,
                    fix: (fixer) => fixer.replaceText(source, `${quote}${barrel}${quote}`),
                })
            }

            return {
                ImportDeclaration: complain,
                ExportNamedDeclaration: complain,
                ExportAllDeclaration: complain,
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
