import type { Rule } from 'eslint'
import { basename } from 'node:path'
import { isDefined, isNonEmpty, isOneOf } from '../../common/utils/Predicate/Predicate.js'
import { ErrorMessage } from './RoleExportName.constants.js'
import { defaultNameOf, expectationFor, exportedName, messageFor } from './RoleExportName.utils.js'

const Eslint = {
    RoleExportName9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const fileName = basename(context.filename)
            const expectation = expectationFor(fileName)
            if (!isDefined(expectation)) return {}

            const found: string[] = []
            let firstExportLine: number | undefined

            return {
                'Program:exit'() {
                    if (isOneOf(expectation.expected, found)) return

                    context.report({
                        message: messageFor(
                            fileName,
                            expectation.role,
                            expectation.expected,
                            found,
                        ),
                        loc: { line: firstExportLine ?? 1, column: 0 },
                    })
                },
                ExportAllDeclaration(node) {
                    firstExportLine ??= node.loc?.start.line
                    const name = isDefined(node.exported) ? exportedName(node.exported) : null
                    if (isDefined(name)) found.push(name)
                },
                ExportDefaultDeclaration(node) {
                    firstExportLine ??= node.loc?.start.line
                    found.push(defaultNameOf(node.declaration) ?? 'default')
                },
                ExportNamedDeclaration(node) {
                    firstExportLine ??= node.loc?.start.line
                    const { declaration, specifiers } = node

                    if (isNonEmpty(specifiers))
                        specifiers.forEach((specifier) => {
                            const name = exportedName(specifier.exported)
                            if (isDefined(name)) found.push(name)
                        })
                    else if (!isDefined(declaration)) return
                    else if (declaration.type === 'VariableDeclaration')
                        declaration.declarations.forEach(({ id }) => {
                            if (id.type === 'Identifier') found.push(id.name)
                        })
                    else if ('id' in declaration && isDefined(declaration.id))
                        found.push(declaration.id.name)
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
