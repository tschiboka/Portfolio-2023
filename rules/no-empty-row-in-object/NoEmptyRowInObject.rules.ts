import { Rows } from '../rows.js'
import type { Rule } from 'eslint'

export const ErrorMessage = 'An object must not contain an empty row between its properties.'

const Eslint = {
    Min9: {
        meta: {
            type: 'layout',
            docs: { description: ErrorMessage },
        },
        create(context) {
            const sourceCode = context.sourceCode

            return {
                ObjectExpression(node: Rule.Node) {
                    const properties =
                        (node as unknown as { properties: Rule.Node[] }).properties ?? []

                    properties
                        .slice(1)
                        .filter((property, index) =>
                            Rows.hasBlankRow(sourceCode, properties[index], property),
                        )
                        .forEach((property) =>
                            context.report({ node: property, message: ErrorMessage }),
                        )
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
