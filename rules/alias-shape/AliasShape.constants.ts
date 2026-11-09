import {
    isAnyFunctionOf,
    isAnyObjectOf,
    isArrayableOf,
    isAsyncFunctionOf,
    isAtLeastOneOf,
    isAwaitableOf,
    isBrandOf,
    isDefinedOf,
    isDictionaryOf,
    isEmptiableOf,
    isEmptyObjectOf,
    isFalsyOf,
    isKeyOf,
    isKeysOfTypeOf,
    isMergeOf,
    isNilOf,
    isNonEmptyArrayOf,
    isNullableOf,
    isNullishOf,
    isOptionalKeysOf,
    isOptionalOf,
    isPartialByOf,
    isPredicateOf,
    isPrimitiveOf,
    isReadonlyArrayableOf,
    isRequiredByOf,
    isRequiredKeysOf,
    isSortableOf,
    isTruthyOf,
    isTypeGuardOf,
    isValueOfOf,
    isVoidFunctionOf,
    isWithoutIdOf,
} from './AliasShape.utils.js'
import type { AliasShape } from './AliasShape.types.js'

/** The assertion, as the registrar states it. */
export const Description = 'A written type shape names the generic that already says it.'

export const NilMessage = 'Both absences are written `Nil`, never `null | undefined`.'

export const OptionalMessage = 'An omitted value is written `Optional<T>`, never `T | undefined`.'

export const NullableMessage = 'A nullable value is written `Nullable<T>`, never `T | null`.'

export const NullishMessage =
    'A value that may be absent or null is written `Nullish<T>`, never `T | null | undefined`.'

export const ArrayableMessage = 'A value or an array of one is written `Arrayable<T>`, never `T | T[]`.'

export const ReadonlyArrayableMessage =
    'A value or a readonly array of one is written `ReadonlyArrayable<T>`, never `T | readonly T[]`.'

export const AwaitableMessage =
    'A value or a promise of one is written `Awaitable<T>`, never `T | Promise<T>`.'

export const PrimitiveMessage = 'The primitive union is written `Primitive`, never its five members.'

export const SortableMessage =
    'A comparable value is written `Sortable`, never the five primitives and `Date` spelled out.'

export const FalsyMessage = 'The falsy union is written `Falsy`, never its five literals.'

export const DictionaryMessage =
    'A string-keyed map is written `Dictionary<T>`, never `Record<string, T>`.'

export const AnyObjectMessage =
    'An object with any property key is written `AnyObject`, never `Record<PropertyKey, unknown>`.'

export const EmptyObjectMessage =
    'An object with no properties is written `EmptyObject`, never `Record<never, never>`.'

export const KeyMessage = 'A string key is written `Key<T>`, never `Extract<keyof T, string>`.'

export const DefinedMessage =
    'A value that is present is written `Defined<T>`, never `Exclude<T, Nil>` or `NonNullable<T>`.'

export const TruthyMessage = 'A value that is truthy is written `Truthy<T>`, never `Exclude<T, Falsy>`.'

export const VoidFunctionMessage =
    'A callback that returns nothing is written `VoidFunction`, never `() => void`.'

export const AnyFunctionMessage =
    'Any callable is written `AnyFunction`, never `(...args: any[]) => any`.'

export const AsyncFunctionMessage =
    'Any async callable is written `AsyncFunction`, never `(...args: any[]) => Promise<any>`.'

export const PredicateMessage = 'A test is written `Predicate<T>`, never `(value: T) => boolean`.'

export const TypeGuardMessage =
    'A guard is written `TypeGuard<T, S>`, never `(value: T) => value is S`.'

export const MergeMessage = 'A merge is written `Merge<A, B>`, never `Omit<A, keyof B> & B`.'

export const PartialByMessage =
    'A partly optional type is written `PartialBy<T, K>`, never `Omit<T, K> & Partial<Pick<T, K>>`.'

export const RequiredByMessage =
    'A partly required type is written `RequiredBy<T, K>`, never `Omit<T, K> & Required<Pick<T, K>>`.'

export const ValueOfMessage =
    'The union of the values of an object is written `ValueOf<T>`, never `T[keyof T]`.'

export const NonEmptyArrayMessage =
    'An array of at least one item is written `NonEmptyArray<T>`, never `[T, ...T[]]`.'

export const EmptiableMessage =
    'A value that may be empty is written `Emptiable`, never its four members spelled out.'

export const WithoutIdMessage = "An entity without its id is written `WithoutId<T>`, never `Omit<T, '_id'>`."

export const BrandMessage =
    'A branded type is written `Brand<T, Name>`, never `T & { readonly __brand: Name }`.'

export const AtLeastOneMessage =
    'A type with at least one key is written `AtLeastOne<T>`, never `Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]`.'

export const OptionalKeysMessage =
    'The optional keys are written `OptionalKeys<T>`, never a mapped `keyof` over `unknown`.'

export const RequiredKeysMessage =
    'The required keys are written `RequiredKeys<T>`, never `Exclude<keyof T, OptionalKeys<T>>`.'

export const KeysOfTypeMessage =
    'The keys whose values extend a type are written `KeysOfType<T, V>`, never a mapped conditional indexed by `keyof T`.'

/** Every shape a generic already names — a matcher, and the alias it points at. */
export const AliasShapes: AliasShape[] = [
    {
        alias: 'Nil',
        message: NilMessage,
        matches: isNilOf,
    },
    {
        alias: 'Optional',
        message: OptionalMessage,
        matches: isOptionalOf,
    },
    {
        alias: 'Nullable',
        message: NullableMessage,
        matches: isNullableOf,
    },
    {
        alias: 'Nullish',
        message: NullishMessage,
        matches: isNullishOf,
    },
    {
        alias: 'Arrayable',
        message: ArrayableMessage,
        matches: isArrayableOf,
    },
    {
        alias: 'ReadonlyArrayable',
        message: ReadonlyArrayableMessage,
        matches: isReadonlyArrayableOf,
    },
    {
        alias: 'Awaitable',
        message: AwaitableMessage,
        matches: isAwaitableOf,
    },
    {
        alias: 'Primitive',
        message: PrimitiveMessage,
        matches: isPrimitiveOf,
    },
    {
        alias: 'Sortable',
        message: SortableMessage,
        matches: isSortableOf,
    },
    {
        alias: 'Falsy',
        message: FalsyMessage,
        matches: isFalsyOf,
    },
    {
        alias: 'Dictionary',
        message: DictionaryMessage,
        matches: isDictionaryOf,
    },
    {
        alias: 'AnyObject',
        message: AnyObjectMessage,
        matches: isAnyObjectOf,
    },
    {
        alias: 'EmptyObject',
        message: EmptyObjectMessage,
        matches: isEmptyObjectOf,
    },
    {
        alias: 'Key',
        message: KeyMessage,
        matches: isKeyOf,
    },
    {
        alias: 'Defined',
        message: DefinedMessage,
        matches: isDefinedOf,
    },
    {
        alias: 'Truthy',
        message: TruthyMessage,
        matches: isTruthyOf,
    },
    {
        alias: 'VoidFunction',
        message: VoidFunctionMessage,
        matches: isVoidFunctionOf,
    },
    {
        alias: 'AnyFunction',
        message: AnyFunctionMessage,
        matches: isAnyFunctionOf,
    },
    {
        alias: 'AsyncFunction',
        message: AsyncFunctionMessage,
        matches: isAsyncFunctionOf,
    },
    {
        alias: 'Predicate',
        message: PredicateMessage,
        matches: isPredicateOf,
    },
    {
        alias: 'TypeGuard',
        message: TypeGuardMessage,
        matches: isTypeGuardOf,
    },
    {
        alias: 'Merge',
        message: MergeMessage,
        matches: isMergeOf,
    },
    {
        alias: 'PartialBy',
        message: PartialByMessage,
        matches: isPartialByOf,
    },
    {
        alias: 'RequiredBy',
        message: RequiredByMessage,
        matches: isRequiredByOf,
    },
    {
        alias: 'ValueOf',
        message: ValueOfMessage,
        matches: isValueOfOf,
    },
    {
        alias: 'NonEmptyArray',
        message: NonEmptyArrayMessage,
        matches: isNonEmptyArrayOf,
    },
    {
        alias: 'Emptiable',
        message: EmptiableMessage,
        matches: isEmptiableOf,
    },
    {
        alias: 'WithoutId',
        message: WithoutIdMessage,
        matches: isWithoutIdOf,
    },
    {
        alias: 'Brand',
        message: BrandMessage,
        matches: isBrandOf,
    },
    {
        alias: 'AtLeastOne',
        message: AtLeastOneMessage,
        matches: isAtLeastOneOf,
    },
    {
        alias: 'OptionalKeys',
        message: OptionalKeysMessage,
        matches: isOptionalKeysOf,
    },
    {
        alias: 'RequiredKeys',
        message: RequiredKeysMessage,
        matches: isRequiredKeysOf,
    },
    {
        alias: 'KeysOfType',
        message: KeysOfTypeMessage,
        matches: isKeysOfTypeOf,
    },
]
