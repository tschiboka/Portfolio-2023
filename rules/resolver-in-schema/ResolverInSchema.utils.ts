import { ResolverName, SchemaMethod, SchemaSuffix } from './ResolverInSchema.constants.js'
import type { CalleeLike } from './ResolverInSchema.types.js'
import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/**
 * Reads the member a call is made on — `object` from `yup.object(...)` — or `null` where the
 * callee is no named member. A computed key cannot be read, so it is left alone.
 */
export const methodNameOf = (callee: CalleeLike): Nullable<string> => {
    if (callee.type !== 'MemberExpression') return null
    if (callee.computed === true) return null
    if (callee.property?.type !== 'Identifier') return null

    return callee.property.name ?? null
}

/**
 * Reads the name a call is made under — `yupResolver` from `yupResolver(schema)` — or `null`
 * where the callee names nothing.
 */
export const calleeNameOf = (callee: CalleeLike): Nullable<string> =>
    callee.type === 'Identifier' ? (callee.name ?? null) : null

/** Answers whether the call builds a yup schema. */
export const isSchemaCall = (callee: CalleeLike): boolean => methodNameOf(callee) === SchemaMethod

/** Answers whether the call builds a resolver. */
export const isResolverCall = (callee: CalleeLike): boolean => calleeNameOf(callee) === ResolverName

/** Answers whether the file is one a resolver belongs in. */
export const isSchemaFile = (filename: string): boolean => filename.endsWith(SchemaSuffix)
