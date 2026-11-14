import {
    Description,
    GroupKeyMessage,
    LeafKeyMessage,
    NestingMessage,
} from './QueriesExportShape.constants.js'
import {
    isGroupName,
    isLeafName,
    propertyNameOf,
    queriesObjectOf,
} from './QueriesExportShape.utils.js'
import { isNull } from '../../common/utils/Predicate/Predicate.js'
import type { Node, ObjectExpression, Property } from 'estree'
import type { Rule } from 'eslint'

const Eslint = {
    QueriesExportShape9: {
        meta: {
            type: 'suggestion',
            docs: { description: Description },
        },
        create(context) {
            const report = (node: Node, message: string): void => context.report({ message, node })

            const checkGroup = (group: ObjectExpression): void =>
                group.properties.forEach((property) => {
                    if (property.type !== 'Property') return
                    if (property.value.type === 'ObjectExpression')
                        return report(property, NestingMessage)

                    const name = propertyNameOf(property)
                    if (isNull(name) || isLeafName(name)) return

                    report(property, LeafKeyMessage)
                })

            const checkProperty = (property: Property): void => {
                const name = propertyNameOf(property)
                if (isNull(name)) return

                if (property.value.type === 'ObjectExpression') {
                    if (!isGroupName(name)) report(property, GroupKeyMessage)
                    return checkGroup(property.value)
                }

                if (!isLeafName(name)) report(property, LeafKeyMessage)
            }

            return {
                ExportNamedDeclaration(node) {
                    const object = queriesObjectOf(node)
                    if (isNull(object)) return

                    object.properties.forEach((property) => {
                        if (property.type === 'Property') checkProperty(property)
                    })
                },
            }
        },
    } satisfies Rule.RuleModule,
}

export const Rules = { Eslint }
