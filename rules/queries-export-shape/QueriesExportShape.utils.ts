import { GroupPattern, LeafPattern, QueriesSuffix } from './QueriesExportShape.constants.js'
import { isString } from '../../common/utils/Predicate/Predicate.js'
import type { ExportNamedDeclaration, ObjectExpression, Property } from 'estree'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** Answers whether a key names a leaf — `use` and the verb alone. */
export const isLeafName = (name: string): boolean => LeafPattern.test(name)

/** Answers whether a key names a group — PascalCase, which a `use` key never is. */
export const isGroupName = (name: string): boolean => GroupPattern.test(name)

/**
 * The static name a property declares, or `null` where nothing can be read.
 *
 * A computed key is only known when the file runs, so it is left alone: a rule that guessed at
 * `[key]` would report correct code.
 */
export const propertyNameOf = (property: Property): Nullable<string> => {
    if (property.computed) return null
    if (property.key.type === 'Identifier') return property.key.name
    if (property.key.type === 'Literal' && isString(property.key.value)) return property.key.value

    return null
}

/**
 * The object a `<Feature>Queries` export declares, or `null` where the statement exports
 * something else.
 */
export const queriesObjectOf = (statement: ExportNamedDeclaration): Nullable<ObjectExpression> => {
    const declaration = statement.declaration
    if (declaration?.type !== 'VariableDeclaration') return null

    const declarator = declaration.declarations.find(
        (candidate) =>
            candidate.id.type === 'Identifier' && candidate.id.name.endsWith(QueriesSuffix),
    )
    if (declarator?.init?.type !== 'ObjectExpression') return null

    return declarator.init
}
