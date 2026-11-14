import { isDefined, isNull, isUndefined } from '../../common/utils/Predicate/Predicate.js'
import type { TextOf, TypeLike } from './AliasShape.types.js'
import type { Nullable, Optional } from '../../common/utils/Generics/Generics.types.js'

/**
 * The aliases that already allow absence, so `Nullable<T> | undefined` is `Nullish<T>` rather than
 * `Optional<Nullable<T>>`.
 */
const NullableAliases = ['Nil', 'Nullable', 'Optional', 'Nullish']

const isUndefinedKeyword = (node: TypeLike): boolean => node.type === 'TSUndefinedKeyword'

const isNullKeyword = (node: TypeLike): boolean => node.type === 'TSNullKeyword'

/** The name a type reference writes — `Optional` for `Optional<T>`, `null` for anything else. */
const referencedName = (node: TypeLike): Nullable<string> =>
    node.type === 'TSTypeReference' ? (node.typeName?.name ?? null) : null

/** The members a union writes, or `[]` where the node is no union. */
const unionMembersOf = (node: TypeLike): TypeLike[] =>
    node.type === 'TSUnionType' ? (node.types ?? []) : []

/** Answers whether a member is written as one of the aliases that already allow absence. */
const isNullableAlias = (node: TypeLike): boolean => {
    const name = referencedName(node)

    return isDefined(name) && NullableAliases.includes(name)
}

/**
 * Answers whether a union is `null | undefined`, the pair `Nil` names.
 *
 * @example
 * isNilOf(unionOf(null, undefined)) // true
 */
export const isNilOf = (node: TypeLike, _text: TextOf): boolean => {
    const members = unionMembersOf(node)

    return (
        members.length === 2 &&
        members.filter(isNullKeyword).length === 1 &&
        members.filter(isUndefinedKeyword).length === 1
    )
}

/**
 * Answers whether a union is `T | undefined` for a `T` the generic still has to name.
 *
 * @example
 * isOptionalOf(unionOf(name, undefined))       // true
 * isOptionalOf(unionOf(name, undefined, null)) // false — that is `Nullish<T>`
 */
export const isOptionalOf = (node: TypeLike, _text: TextOf): boolean => {
    const members = unionMembersOf(node)
    const absent = members.filter(isUndefinedKeyword)
    const written = members.filter((member) => !isUndefinedKeyword(member))
    if (absent.length !== 1 || written.length !== 1) return false

    const [other] = written

    if (other.type === 'TSUnionType') return false

    return !isNullKeyword(other) && !isNullableAlias(other)
}

/**
 * Answers whether a union is `T | null` for a `T` the generic still has to name.
 *
 * @example
 * isNullableOf(unionOf(name, null)) // true
 * isNullableOf(unionOf(name, undefined)) // false — that is `Optional<T>`
 */
export const isNullableOf = (node: TypeLike, _text: TextOf): boolean => {
    const members = unionMembersOf(node)
    const absent = members.filter(isNullKeyword)
    const written = members.filter((member) => !isNullKeyword(member))
    if (absent.length !== 1 || written.length !== 1) return false

    const [other] = written

    if (other.type === 'TSUnionType') return false

    return !isUndefinedKeyword(other) && !isNullableAlias(other)
}

/**
 * Answers whether a union is `T | null | undefined` for a `T` the generic still has to name.
 *
 * @example
 * isNullishOf(unionOf(name, null, undefined)) // true
 * isNullishOf(unionOf(name, null))            // false — that is `Nullable<T>`
 */
export const isNullishOf = (node: TypeLike, _text: TextOf): boolean => {
    const members = unionMembersOf(node)
    const nulls = members.filter(isNullKeyword)
    const undefineds = members.filter(isUndefinedKeyword)
    const written = members.filter(
        (member) => !isNullKeyword(member) && !isUndefinedKeyword(member),
    )

    return (
        members.length === 3 &&
        nulls.length === 1 &&
        undefineds.length === 1 &&
        written.length === 1 &&
        !isNullableAlias(written[0])
    )
}

/** The members of a type of a given size, or `null` where it writes another size. */
const membersOf = (node: TypeLike, size: number): Nullable<TypeLike[]> => {
    const members = node.types ?? []

    return members.length === size ? members : null
}

/** Answers whether two members are written from the same source text. */
const isWrittenAs = (left: Optional<TypeLike>, right: Optional<TypeLike>, text: TextOf): boolean =>
    isDefined(left) && isDefined(right) && text(left) === text(right)

/** Answers whether a union writes exactly the given members, in any order. */
const hasWrittenSet = (node: TypeLike, text: TextOf, wanted: string[]): boolean => {
    const members = unionMembersOf(node)
    if (members.length !== wanted.length) return false

    const written = members.map(text).sort()
    const expected = [...wanted].sort()

    return expected.every((value, index) => value === written[index])
}

/** The member that is a bare `T[]`, or `undefined` where the union writes none. */
const bareArrayOf = (members: TypeLike[]): Optional<TypeLike> =>
    members.find((member) => member.type === 'TSArrayType')

/** The member that is a `readonly T[]`, or `undefined` where the union writes none. */
const readonlyArrayOf = (members: TypeLike[]): Optional<TypeLike> =>
    members.find(
        (member) =>
            member.type === 'TSTypeOperator' &&
            member.operator === 'readonly' &&
            member.typeAnnotation?.type === 'TSArrayType',
    )

/** The `T` a `Promise<T>` member writes, or `undefined` where the member is no promise. */
const promiseArgumentOf = (node: TypeLike): Optional<TypeLike> =>
    referencedName(node) === 'Promise' ? node.typeArguments?.params?.[0] : undefined

/** Answers whether a union is `T | T[]`. */
export const isArrayableOf = (node: TypeLike, text: TextOf): boolean => {
    const members = membersOf(node, 2)
    if (isNull(members)) return false

    const array = bareArrayOf(members)
    if (isUndefined(array)) return false

    return isWrittenAs(
        array.elementType,
        members.find((member) => member !== array),
        text,
    )
}

/** Answers whether a union is `T | readonly T[]`. */
export const isReadonlyArrayableOf = (node: TypeLike, text: TextOf): boolean => {
    const members = membersOf(node, 2)
    if (isNull(members)) return false

    const array = readonlyArrayOf(members)
    if (isUndefined(array)) return false

    return isWrittenAs(
        array.typeAnnotation?.elementType,
        members.find((member) => member !== array),
        text,
    )
}

/** Answers whether a union is `T | Promise<T>`. */
export const isAwaitableOf = (node: TypeLike, text: TextOf): boolean => {
    const members = membersOf(node, 2)
    if (isNull(members)) return false

    const promised = members.find((member) => isDefined(promiseArgumentOf(member)))
    if (isUndefined(promised)) return false

    return isWrittenAs(
        promiseArgumentOf(promised),
        members.find((member) => member !== promised),
        text,
    )
}

/** The five keywords `Primitive` names. */
const PrimitiveKeywords = ['string', 'number', 'boolean', 'bigint', 'symbol']

/** Answers whether a union writes `Primitive` out in full. */
export const isPrimitiveOf = (node: TypeLike, text: TextOf): boolean =>
    hasWrittenSet(node, text, PrimitiveKeywords)

/** Answers whether a union writes `Sortable` out in full. */
export const isSortableOf = (node: TypeLike, text: TextOf): boolean =>
    hasWrittenSet(node, text, [...PrimitiveKeywords, 'Date'])

/** Answers whether a union writes `Falsy` out in full. */
export const isFalsyOf = (node: TypeLike, text: TextOf): boolean =>
    hasWrittenSet(node, text, ['false', '0', "''", 'null', 'undefined'])

/** The type arguments a reference writes, or `null` where it names another type. */
const referenceArgsOf = (node: TypeLike, name: string): Nullable<TypeLike[]> =>
    referencedName(node) === name ? (node.typeArguments?.params ?? []) : null

/** Answers whether the given members are written exactly as the given texts, in order. */
const areWrittenAs = (nodes: TypeLike[], wanted: string[], text: TextOf): boolean =>
    nodes.length === wanted.length && nodes.every((node, index) => text(node) === wanted[index])

/** Answers whether a member writes the `Nil` pair, by name or in full. */
const isNilWrittenAs = (node: TypeLike, text: TextOf): boolean =>
    text(node) === 'Nil' || isNilOf(node, text)

/** Answers whether a member writes the `Falsy` set, by name or in full. */
const isFalsyWrittenAs = (node: TypeLike, text: TextOf): boolean =>
    text(node) === 'Falsy' || isFalsyOf(node, text)

/** Answers whether a reference is `Record<string, T>`. */
export const isDictionaryOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Record')
    if (isNull(args) || args.length !== 2) return false

    return text(args[0]) === 'string'
}

/** Answers whether a reference is `Record<PropertyKey, unknown>`. */
export const isAnyObjectOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Record')

    return isDefined(args) && areWrittenAs(args, ['PropertyKey', 'unknown'], text)
}

/** Answers whether a reference is `Record<never, never>`. */
export const isEmptyObjectOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Record')

    return isDefined(args) && areWrittenAs(args, ['never', 'never'], text)
}

/** Answers whether a reference is `Extract<keyof T, string>`. */
export const isKeyOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Extract')
    if (isNull(args) || args.length !== 2) return false

    const [keys, keyType] = args

    return keys.type === 'TSTypeOperator' && keys.operator === 'keyof' && text(keyType) === 'string'
}

/** Answers whether a reference is `Exclude<T, Nil>` or `NonNullable<T>`. */
export const isDefinedOf = (node: TypeLike, text: TextOf): boolean => {
    if (referencedName(node) === 'NonNullable')
        return (node.typeArguments?.params ?? []).length === 1

    const args = referenceArgsOf(node, 'Exclude')
    if (isNull(args) || args.length !== 2) return false

    return isNilWrittenAs(args[1], text)
}

/** Answers whether a reference is `Exclude<T, Falsy>`. */
export const isTruthyOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Exclude')
    if (isNull(args) || args.length !== 2) return false

    return isFalsyWrittenAs(args[1], text)
}

/** The source of a node with every run of whitespace removed, so a written shape compares literally. */
const squeezed = (node: TypeLike, text: TextOf): string => text(node).replace(/\s+/g, '')

/** The type a function type returns, unwrapped from the annotation that carries it. */
const returnedTypeOf = (node: TypeLike): Optional<TypeLike> => {
    if (node.type !== 'TSFunctionType') return undefined

    const { returnType } = node
    if (isUndefined(returnType)) return undefined

    return returnType.type === 'TSTypeAnnotation' ? returnType.typeAnnotation : returnType
}

/** Answers whether a function type is `() => void`. */
export const isVoidFunctionOf = (node: TypeLike, text: TextOf): boolean => {
    const returned = returnedTypeOf(node)
    if (isUndefined(returned) || (node.params ?? []).length !== 0) return false

    return text(returned) === 'void'
}

/** Answers whether a function type is `(...args: any[]) => any`. */
export const isAnyFunctionOf = (node: TypeLike, text: TextOf): boolean =>
    node.type === 'TSFunctionType' && squeezed(node, text) === '(...args:any[])=>any'

/** Answers whether a function type is `(...args: any[]) => Promise<any>`. */
export const isAsyncFunctionOf = (node: TypeLike, text: TextOf): boolean =>
    node.type === 'TSFunctionType' && squeezed(node, text) === '(...args:any[])=>Promise<any>'

/** Answers whether a function type is `(value: T) => boolean`. */
export const isPredicateOf = (node: TypeLike, _text: TextOf): boolean => {
    const returned = returnedTypeOf(node)
    const params = node.params ?? []
    if (isUndefined(returned) || params.length !== 1) return false
    if (params[0].type !== 'Identifier') return false

    return returned.type === 'TSBooleanKeyword'
}

/** Answers whether a function type is `(value: T) => value is S`. */
export const isTypeGuardOf = (node: TypeLike, _text: TextOf): boolean => {
    const returned = returnedTypeOf(node)
    if (isUndefined(returned) || (node.params ?? []).length !== 1) return false

    return returned.type === 'TSTypePredicate'
}

/** The two members an intersection writes, or `null` where the node is no intersection of two. */
const intersectionMembersOf = (node: TypeLike): Nullable<TypeLike[]> =>
    node.type === 'TSIntersectionType' ? membersOf(node, 2) : null

/** Answers whether an intersection is `Omit<A, keyof B> & B`. */
export const isMergeOf = (node: TypeLike, text: TextOf): boolean => {
    const members = intersectionMembersOf(node)
    if (isNull(members)) return false

    const args = referenceArgsOf(members[0], 'Omit')
    if (isNull(args) || args.length !== 2 || args[1].operator !== 'keyof') return false
    if (isUndefined(args[1].typeAnnotation)) return false

    return text(members[1]) === text(args[1].typeAnnotation)
}

/** Answers whether an intersection is `Omit<T, K> & Partial<Pick<T, K>>`, or with `Required`. */
const isModifierBy = (node: TypeLike, text: TextOf, modifier: string): boolean => {
    const members = intersectionMembersOf(node)
    if (isNull(members)) return false

    const args = referenceArgsOf(members[0], 'Omit')
    if (isNull(args) || args.length !== 2) return false

    const [picked] = referenceArgsOf(members[1], modifier) ?? []
    if (isUndefined(picked)) return false

    const pickArgs = referenceArgsOf(picked, 'Pick')
    if (isNull(pickArgs) || pickArgs.length !== 2) return false

    return text(pickArgs[0]) === text(args[0]) && text(pickArgs[1]) === text(args[1])
}

/** Answers whether an intersection is `Omit<T, K> & Partial<Pick<T, K>>`. */
export const isPartialByOf = (node: TypeLike, text: TextOf): boolean =>
    isModifierBy(node, text, 'Partial')

/** Answers whether an intersection is `Omit<T, K> & Required<Pick<T, K>>`. */
export const isRequiredByOf = (node: TypeLike, text: TextOf): boolean =>
    isModifierBy(node, text, 'Required')

/** Answers whether an indexed access is `T[keyof T]`. */
export const isValueOfOf = (node: TypeLike, text: TextOf): boolean => {
    if (node.type !== 'TSIndexedAccessType') return false

    const { indexType, objectType } = node
    if (isUndefined(indexType) || isUndefined(objectType)) return false
    if (indexType.type !== 'TSTypeOperator' || indexType.operator !== 'keyof') return false
    if (isUndefined(indexType.typeAnnotation)) return false

    return text(indexType.typeAnnotation) === text(objectType)
}

/** Answers whether a tuple is `[T, ...T[]]`. */
export const isNonEmptyArrayOf = (node: TypeLike, text: TextOf): boolean => {
    if (node.type !== 'TSTupleType') return false

    const elements = node.elementTypes ?? []
    if (elements.length !== 2) return false

    const [first, second] = elements
    const rest = second.type === 'TSRestType' ? second.typeAnnotation : undefined
    if (rest?.type !== 'TSArrayType' || isUndefined(rest.elementType)) return false

    return text(rest.elementType) === text(first)
}

/** Answers whether a union is `unknown[] | string | Dictionary | Nil`. */
export const isEmptiableOf = (node: TypeLike, text: TextOf): boolean =>
    hasWrittenSet(node, text, ['unknown[]', 'string', 'Dictionary', 'Nil'])

/** Answers whether a reference is `Omit<T, '_id'>`. */
export const isWithoutIdOf = (node: TypeLike, text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Omit')
    if (isNull(args) || args.length !== 2) return false

    return ["'_id'", '"_id"'].includes(squeezed(args[1], text))
}

/** The member of an intersection that brands a type, once its whitespace is gone. */
const BrandMember = /^\{readonly__brand:.+\}$/

/** Answers whether an intersection is `T & { readonly __brand: Name }`. */
export const isBrandOf = (node: TypeLike, text: TextOf): boolean => {
    const members = intersectionMembersOf(node)
    if (isNull(members)) return false

    return members.some((member) => BrandMember.test(squeezed(member, text)))
}

/** Answers whether an intersection is `Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]`. */
export const isAtLeastOneOf = (node: TypeLike, _text: TextOf): boolean => {
    const members = intersectionMembersOf(node)
    if (isNull(members)) return false

    const partial = referenceArgsOf(members[0], 'Partial')
    if (isNull(partial) || partial.length !== 1) return false

    const [indexed] = members.slice(1)
    if (indexed.type !== 'TSIndexedAccessType') return false
    if (indexed.indexType?.type !== 'TSTypeOperator' || indexed.indexType.operator !== 'keyof')
        return false
    if (indexed.objectType?.type !== 'TSMappedType') return false

    const picked = indexed.objectType.typeAnnotation

    return isDefined(picked) && referencedName(picked) === 'Pick'
}

/** Answers whether a reference is a `keyof` over the mapped `unknown` that `OptionalKeys` writes. */
export const isOptionalKeysOf = (node: TypeLike, text: TextOf): boolean => {
    if (node.type !== 'TSTypeOperator' || node.operator !== 'keyof') return false

    const mapped = node.typeAnnotation
    if (mapped?.type !== 'TSMappedType') return false
    if (isNull(mapped.nameType) || isUndefined(mapped.nameType)) return false
    if (mapped.nameType.type !== 'TSConditionalType') return false
    if (isUndefined(mapped.typeAnnotation)) return false

    return text(mapped.typeAnnotation) === 'unknown'
}

/** Answers whether a reference is `Exclude<keyof T, OptionalKeys<T>>`. */
export const isRequiredKeysOf = (node: TypeLike, _text: TextOf): boolean => {
    const args = referenceArgsOf(node, 'Exclude')
    if (isNull(args) || args.length !== 2) return false

    return referencedName(args[1]) === 'OptionalKeys'
}

/** Answers whether an indexed access is the mapped conditional that `KeysOfType` writes. */
export const isKeysOfTypeOf = (node: TypeLike, text: TextOf): boolean => {
    if (node.type !== 'TSIndexedAccessType') return false

    const { indexType, objectType } = node
    if (indexType?.type !== 'TSTypeOperator' || indexType.operator !== 'keyof') return false
    if (objectType?.type !== 'TSMappedType' || isUndefined(objectType.constraint)) return false
    if (text(objectType.constraint) !== text(indexType)) return false

    const mapped = objectType.typeAnnotation
    if (mapped?.type !== 'TSConditionalType' || isUndefined(mapped.falseType)) return false

    return text(mapped.falseType) === 'never'
}
