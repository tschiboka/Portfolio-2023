import { typescriptRuleTester } from '../../config'
import {
    AnyFunctionMessage,
    AnyObjectMessage,
    ArrayableMessage,
    AsyncFunctionMessage,
    AtLeastOneMessage,
    AwaitableMessage,
    BrandMessage,
    DefinedMessage,
    DictionaryMessage,
    EmptiableMessage,
    EmptyObjectMessage,
    FalsyMessage,
    KeyMessage,
    KeysOfTypeMessage,
    MergeMessage,
    NilMessage,
    NonEmptyArrayMessage,
    NullableMessage,
    NullishMessage,
    OptionalKeysMessage,
    OptionalMessage,
    PartialByMessage,
    PredicateMessage,
    PrimitiveMessage,
    ReadonlyArrayableMessage,
    RequiredByMessage,
    RequiredKeysMessage,
    SortableMessage,
    TruthyMessage,
    TypeGuardMessage,
    ValueOfMessage,
    VoidFunctionMessage,
    WithoutIdMessage,
} from '../AliasShape.constants'
import { Rules } from '../AliasShape.rules'

typescriptRuleTester.run('alias-shape', Rules.Eslint.AliasShape9, {
    valid: [
        {
            name: 'should accept a wider union, which no generic names',
            code: 'type Mixed = string | null | number',
        },
        {
            name: 'should accept a three-member union holding one `undefined`',
            code: 'type Mixed = string | number | undefined',
        },
        {
            name: 'should accept a union whose two members are neither `null` nor `undefined`',
            code: 'type Mixed = string | number',
        },
        {
            name: 'should accept the generic itself',
            code: 'type Omitted = Optional<string>',
        },
        {
            name: 'should accept the generic itself in a property',
            code: 'type Row = { value: Optional<string> }',
        },
        {
            name: 'should accept a bare `undefined`, which is no union',
            code: 'type Absent = undefined',
        },
        {
            name: 'should accept a bare `null`, which is no union',
            code: 'type Absent = null',
        },
        {
            name: 'should accept a union of a value and `void`',
            code: 'type Silent = string | void',
        },
        {
            name: 'should accept a repeated `undefined`, which is no single absence',
            code: 'type Absent = string | undefined | undefined',
        },
        {
            name: 'should accept `Nullable<T> | undefined`, which is `Nullish<T>`',
            code: 'type Either = Nullable<string> | undefined',
        },
        {
            name: 'should accept `Optional<T> | undefined`, which is already absent',
            code: 'type Either = Optional<string> | undefined',
        },
        {
            name: 'should accept `Nullish<T> | undefined`, which is already absent',
            code: 'type Either = Nullish<string> | undefined',
        },
        {
            name: 'should accept `Nil` beside `undefined`, which adds nothing',
            code: 'type Either = Nil | undefined',
        },
        {
            name: 'should accept a nullable alias beside `null`',
            code: 'type Either = Optional<string> | null',
        },
        {
            name: 'should accept a union inside a generic argument when already named',
            code: 'type Rows = ReadonlyArray<Optional<string>>',
        },
        {
            name: 'should accept an intersection of two named types',
            code: 'type Both = Optional<string> & { id: number }',
        },
        {
            name: 'should accept a union of three aliases',
            code: 'type Either = Optional<string> | Nullable<number> | Nil',
        },
        {
            name: 'should accept a file that writes no union at all',
            code: 'const id = 1',
        },
        {
            name: 'should accept an array of a different type beside a value',
            code: 'type OneOrMany = Item | Other[]',
        },
        {
            name: 'should accept a bare array',
            code: 'type Many = Item[]',
        },
        {
            name: 'should accept `ReadonlyArray<Item>` beside `Item`, which is no `readonly` array',
            code: 'type OneOrMany = Item | ReadonlyArray<Item>',
        },
        {
            name: 'should accept a promise of a different type',
            code: 'type Loaded = Item | Promise<Other>',
        },
        {
            name: 'should accept four primitives, which `Primitive` does not name',
            code: 'type Scalar = string | number | boolean | bigint',
        },
        {
            name: 'should accept two primitives',
            code: 'type Scalar = string | number',
        },
        {
            name: 'should accept two falsy literals',
            code: 'type Empty = false | 0',
        },
        {
            name: 'should accept four falsy literals',
            code: "type Empty = false | 0 | '' | null",
        },
        {
            name: 'should accept a value or an array of one made nullable',
            code: 'type OneOrMany = Item | Item[] | null',
        },
        {
            name: 'should accept a map keyed by a number',
            code: 'type Row = Record<number, Item>',
        },
        {
            name: 'should accept a `Record` with one argument',
            code: 'type Row = Record<string>',
        },
        {
            name: 'should accept a `Record` with three arguments',
            code: 'type Row = Record<string, Item, Other>',
        },
        {
            name: 'should accept a key extraction over another key type',
            code: 'type Name = Extract<keyof Item, number>',
        },
        {
            name: 'should accept a key extraction of another member',
            code: 'type Name = Extract<Item, string>',
        },
        {
            name: 'should accept `Exclude` of a single absence',
            code: 'type Row = Exclude<Item, null>',
        },
        {
            name: 'should accept `Exclude` of another type',
            code: 'type Row = Exclude<Item, Other>',
        },
        {
            name: 'should accept `Exclude` with one argument',
            code: 'type Row = Exclude<Item>',
        },
        {
            name: 'should accept `Record<PropertyKey, string>`, which is no `AnyObject`',
            code: 'type Row = Record<PropertyKey, string>',
        },
        {
            name: 'should accept `Record<never, unknown>`, which is no `EmptyObject`',
            code: 'type Row = Record<never, unknown>',
        },
        {
            name: 'should accept each reference generic by name',
            code: 'type Rows = Dictionary<Item> & AnyObject & EmptyObject & Key<Item>',
        },
        {
            name: 'should accept the conditional generics by name',
            code: 'type Rows = Defined<Item> & Truthy<Item>',
        },
        {
            name: 'should accept a callback that takes an argument',
            code: 'type Click = (event: Event) => void',
        },
        {
            name: 'should accept a callback that returns something else',
            code: 'type Click = () => undefined',
        },
        {
            name: 'should accept a rest that is no `any`',
            code: 'type Fn = (...args: number[]) => any',
        },
        {
            name: 'should accept a rest that returns something else',
            code: 'type Fn = (...args: any[]) => unknown',
        },
        {
            name: 'should accept a function that returns neither `boolean` nor a predicate',
            code: 'type Read = (value: string) => string',
        },
        {
            name: 'should accept a merge of another key set',
            code: 'type Merged = Omit<A, keyof B> & C',
        },
        {
            name: 'should accept an `Omit` whose second argument is no `keyof`',
            code: 'type Merged = Omit<A, B> & A',
        },
        {
            name: 'should accept a partly optional type over another key',
            code: 'type Partly = Omit<T, K> & Partial<Pick<T, Other>>',
        },
        {
            name: 'should accept a partly required type over another key',
            code: 'type Partly = Omit<T, K> & Required<Pick<T, Other>>',
        },
        {
            name: 'should accept an index over another object',
            code: 'type Values = T[keyof Other]',
        },
        {
            name: 'should accept an index over a single key',
            code: "type Values = T['a']",
        },
        {
            name: 'should accept a tuple of two types',
            code: 'type Pair = [Item, Other]',
        },
        {
            name: 'should accept a rest of another type',
            code: 'type Many = [Item, ...Other[]]',
        },
        {
            name: 'should accept every remaining generic by name',
            code: "type All = VoidFunction | AnyFunction | AsyncFunction | Predicate<Item> | TypeGuard<Item, string> | Merge<A, B> | PartialBy<T, K> | RequiredBy<T, K> | ValueOf<T> | NonEmptyArray<Item>",
        },
        {
            name: 'should accept an `Omit` of another key',
            code: "type Row = Omit<Item, 'id'>",
        },
        {
            name: 'should accept an intersection that brands another name',
            code: "type Id = string & { readonly __name: 'UserId' }",
        },
        {
            name: 'should accept three of the `Emptiable` members',
            code: 'type Empty = string | Dictionary | Nil',
        },
        {
            name: 'should accept a `Partial` intersection that is no `AtLeastOne`',
            code: 'type Some = Partial<T> & Other',
        },
        {
            name: 'should accept a mapped `keyof` without an `as` clause',
            code: 'type Keys = keyof { [K in keyof T]: unknown }',
        },
        {
            name: 'should accept an `Exclude` that is no `RequiredKeys`',
            code: 'type Keys = Exclude<keyof T, Other>',
        },
        {
            name: 'should accept a mapped conditional that does not fall to `never`',
            code: 'type Keys = { [K in keyof T]: T[K] extends V ? K : string }[keyof T]',
        },
        {
            name: 'should accept the object generics by name',
            code: "type All = Emptiable | WithoutId<T> | Brand<T, 'x'> | AtLeastOne<T> | OptionalKeys<T> | RequiredKeys<T> | KeysOfType<T, string>",
        },
        {
            name: 'should accept a literal type that spells a union',
            code: "type Text = 'a | b'",
        },
        {
            name: 'should accept a union of two names under `keyof`',
            code: 'type Held = keyof (First | Second)',
        },
    ],
    invalid: [
        {
            name: 'should report the `Nil` shape',
            code: 'type Absent = null | undefined',
            errors: [{ message: NilMessage }],
        },
        {
            name: 'should report the `Nil` shape written the other way round',
            code: 'type Absent = undefined | null',
            errors: [{ message: NilMessage }],
        },
        {
            name: 'should report the `Nil` shape in a property',
            code: 'type Row = { value: null | undefined }',
            errors: [{ message: NilMessage }],
        },
        {
            name: 'should report the `Nil` shape in a return type',
            code: 'function read(): null | undefined { return null }',
            errors: [{ message: NilMessage }],
        },
        {
            name: 'should report the `Nil` shape in a generic argument',
            code: 'type Rows = Array<null | undefined>',
            errors: [{ message: NilMessage }],
        },
        {
            name: 'should report the `Nullable` shape',
            code: 'type Maybe = string | null',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullable` shape with `null` written first',
            code: 'type Maybe = null | string',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullable` shape in a parameter',
            code: 'const read = (maybe: number | null) => maybe',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullable` shape in a property',
            code: 'interface Row { value: string | null }',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullable` shape in a generic argument',
            code: 'type Rows = Promise<string | null>',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullable` shape around a literal',
            code: "type Maybe = 'a' | null",
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report the `Nullish` shape',
            code: 'type Either = string | null | undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape written in another order',
            code: 'type Either = undefined | null | string',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape with `null` written first',
            code: 'type Either = null | string | undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape in a return type',
            code: 'type Read = () => string | null | undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape in a mapped value',
            code: 'type Rows<T> = { [K in keyof T]: string | null | undefined }',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape in a nested generic argument',
            code: 'type Rows = Record<string, number | null | undefined>',
            errors: [{ message: DictionaryMessage }, { message: NullishMessage }],
        },
        {
            name: 'should report the `Nullish` shape around an intersection',
            code: 'type Either = ({ id: number } & Row) | null | undefined',
            errors: [{ message: NullishMessage }],
        },
        {
            name: 'should report an aliased union',
            code: 'type Omitted = string | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an exported alias',
            code: 'export type Omitted = string | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an annotated variable',
            code: 'let omitted: string | undefined = undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a parameter',
            code: 'const read = (omitted: number | undefined) => omitted',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a return type',
            code: 'function read(): number | undefined { return undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a declared function',
            code: 'declare function read(): number | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an interface property',
            code: 'interface Row { value: string | undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an interface method return',
            code: 'interface Row { read(): string | undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a class property',
            code: 'class Row { value: string | undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an object type literal property',
            code: 'type Row = { value: string | undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a function type return',
            code: 'type Read = () => string | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a generic argument',
            code: 'type Rows = Array<string | undefined>',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a nested generic argument',
            code: 'type Rows = Record<string, number | undefined>',
            errors: [{ message: DictionaryMessage }, { message: OptionalMessage }],
        },
        {
            name: 'should report a promise argument',
            code: 'type Read = Promise<string | undefined>',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a tuple member',
            code: 'type Pair = [string, number | undefined]',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an array element',
            code: 'type Rows = (string | undefined)[]',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a mapped type value',
            code: 'type Rows<T> = { [K in keyof T]: string | undefined }',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a conditional branch',
            code: 'type Read<T> = T extends string ? string | undefined : never',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a type parameter used as the present member',
            code: 'type Omitted<T> = T | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a generic default',
            code: 'type Omitted<T = string | undefined> = T',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a generic constraint',
            code: 'type Omitted<T extends string | undefined> = T',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a literal member',
            code: "type Omitted = 'a' | undefined",
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a qualified member',
            code: 'type Omitted = Foo.Bar | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an indexed access member',
            code: "type Omitted = Row['value'] | undefined",
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a keyof member',
            code: 'type Omitted = keyof Row | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an intersection member',
            code: 'type Omitted = ({ id: number } & Row) | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a union inside an intersection',
            code: 'type Omitted = (string | undefined) & Row',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a union nested inside a nullable union',
            code: 'type Omitted = (string | undefined) | null',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a type predicate parameter',
            code: 'const isText = (value: string | undefined): value is string => true',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report an absent member written first',
            code: 'type Omitted = undefined | string',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report every union in a file, not just the first',
            code: 'type A = string | undefined\ntype B = number | undefined',
            errors: [{ message: OptionalMessage }, { message: OptionalMessage }],
        },
        {
            name: 'should report a union written over three lines',
            code: 'type Omitted =\n    | string\n    | undefined',
            errors: [{ message: OptionalMessage }],
        },
        {
            name: 'should report a value beside an array of one',
            code: 'type OneOrMany = Item | Item[]',
            errors: [{ message: ArrayableMessage }],
        },
        {
            name: 'should report a value beside an array of one, in a parameter',
            code: 'const read = (items: Item | Item[]) => items',
            errors: [{ message: ArrayableMessage }],
        },
        {
            name: 'should report a value beside an array of one, in a generic argument',
            code: 'type Rows = Array<Item | Item[]>',
            errors: [{ message: ArrayableMessage }],
        },
        {
            name: 'should report a value beside an array of one, array first',
            code: 'type OneOrMany = Item[] | Item',
            errors: [{ message: ArrayableMessage }],
        },
        {
            name: 'should report a value beside a readonly array of one',
            code: 'type OneOrMany = Item | readonly Item[]',
            errors: [{ message: ReadonlyArrayableMessage }],
        },
        {
            name: 'should report a value beside a readonly array of one, in a generic argument',
            code: 'type Rows = Promise<Item | readonly Item[]>',
            errors: [{ message: ReadonlyArrayableMessage }],
        },
        {
            name: 'should report a value beside a promise of one',
            code: 'type Loaded = Item | Promise<Item>',
            errors: [{ message: AwaitableMessage }],
        },
        {
            name: 'should report a value beside a promise of one, in a return type',
            code: 'type Read = () => Item | Promise<Item>',
            errors: [{ message: AwaitableMessage }],
        },
        {
            name: 'should report a value beside a promise of one, promise first',
            code: 'type Loaded = Promise<Item> | Item',
            errors: [{ message: AwaitableMessage }],
        },
        {
            name: 'should report the five primitives',
            code: 'type Scalar = string | number | boolean | bigint | symbol',
            errors: [{ message: PrimitiveMessage }],
        },
        {
            name: 'should report the five primitives in another order',
            code: 'type Scalar = symbol | bigint | boolean | number | string',
            errors: [{ message: PrimitiveMessage }],
        },
        {
            name: 'should report the primitives and `Date`',
            code: 'type Value = string | number | boolean | bigint | symbol | Date',
            errors: [{ message: SortableMessage }],
        },
        {
            name: 'should report the primitives and `Date` in another order',
            code: 'type Value = Date | symbol | bigint | boolean | number | string',
            errors: [{ message: SortableMessage }],
        },
        {
            name: 'should report the five falsy literals',
            code: "type Empty = false | 0 | '' | null | undefined",
            errors: [{ message: FalsyMessage }],
        },
        {
            name: 'should report the five falsy literals in another order',
            code: "type Empty = undefined | null | '' | 0 | false",
            errors: [{ message: FalsyMessage }],
        },
        {
            name: 'should report a string-keyed map',
            code: 'type Row = Record<string, Item>',
            errors: [{ message: DictionaryMessage }],
        },
        {
            name: 'should report a string-keyed map in a parameter',
            code: 'const read = (row: Record<string, Item>) => row',
            errors: [{ message: DictionaryMessage }],
        },
        {
            name: 'should report each map in a nested map',
            code: 'type Rows = Record<string, Record<string, Item>>',
            errors: [{ message: DictionaryMessage }, { message: DictionaryMessage }],
        },
        {
            name: 'should report `Record<PropertyKey, unknown>`',
            code: 'type Row = Record<PropertyKey, unknown>',
            errors: [{ message: AnyObjectMessage }],
        },
        {
            name: 'should report `Record<never, never>`',
            code: 'type Row = Record<never, never>',
            errors: [{ message: EmptyObjectMessage }],
        },
        {
            name: 'should report a string key extraction',
            code: 'type Name = Extract<keyof Item, string>',
            errors: [{ message: KeyMessage }],
        },
        {
            name: 'should report `Exclude<T, Nil>`',
            code: 'type Row = Exclude<Item, Nil>',
            errors: [{ message: DefinedMessage }],
        },
        {
            name: 'should report `NonNullable<T>`',
            code: 'type Row = NonNullable<Item>',
            errors: [{ message: DefinedMessage }],
        },
        {
            name: 'should report `Exclude` of the written `Nil` pair twice over',
            code: 'type Row = Exclude<Item, null | undefined>',
            errors: [{ message: DefinedMessage }, { message: NilMessage }],
        },
        {
            name: 'should report `Exclude<T, Falsy>`',
            code: 'type Row = Exclude<Item, Falsy>',
            errors: [{ message: TruthyMessage }],
        },
        {
            name: 'should report `Exclude` of the written falsy set twice over',
            code: "type Row = Exclude<Item, false | 0 | '' | null | undefined>",
            errors: [{ message: TruthyMessage }, { message: FalsyMessage }],
        },
        {
            name: 'should report a callback that returns nothing',
            code: 'type Click = () => void',
            errors: [{ message: VoidFunctionMessage }],
        },
        {
            name: 'should report a callback that returns nothing, as a property',
            code: 'interface Row { onClick: () => void }',
            errors: [{ message: VoidFunctionMessage }],
        },
        {
            name: 'should report any callable spelled out',
            code: 'type Fn = (...args: any[]) => any',
            errors: [{ message: AnyFunctionMessage }],
        },
        {
            name: 'should report any async callable spelled out',
            code: 'type Fn = (...args: any[]) => Promise<any>',
            errors: [{ message: AsyncFunctionMessage }],
        },
        {
            name: 'should report a test spelled out',
            code: 'type Test = (value: string) => boolean',
            errors: [{ message: PredicateMessage }],
        },
        {
            name: 'should report a test spelled out, as a property',
            code: 'interface Row { filter: (item: Item) => boolean }',
            errors: [{ message: PredicateMessage }],
        },
        {
            name: 'should report a guard spelled out',
            code: 'type Guard = (value: unknown) => value is string',
            errors: [{ message: TypeGuardMessage }],
        },
        {
            name: 'should report a merge spelled out',
            code: 'type Merged = Omit<A, keyof B> & B',
            errors: [{ message: MergeMessage }],
        },
        {
            name: 'should report a partly optional type spelled out',
            code: 'type Partly = Omit<T, K> & Partial<Pick<T, K>>',
            errors: [{ message: PartialByMessage }],
        },
        {
            name: 'should report a partly required type spelled out',
            code: 'type Partly = Omit<T, K> & Required<Pick<T, K>>',
            errors: [{ message: RequiredByMessage }],
        },
        {
            name: 'should report an index over the whole object',
            code: 'type Values = T[keyof T]',
            errors: [{ message: ValueOfMessage }],
        },
        {
            name: 'should report a tuple that must hold one item',
            code: 'type Many = [Item, ...Item[]]',
            errors: [{ message: NonEmptyArrayMessage }],
        },
        {
            name: 'should report a tuple that must hold one item, in a parameter',
            code: 'const read = (items: [Item, ...Item[]]) => items',
            errors: [{ message: NonEmptyArrayMessage }],
        },
        {
            name: 'should report the four `Emptiable` members',
            code: 'type Empty = unknown[] | string | Dictionary | Nil',
            errors: [{ message: EmptiableMessage }],
        },
        {
            name: 'should report an `Omit` of the id',
            code: "type Row = Omit<Item, '_id'>",
            errors: [{ message: WithoutIdMessage }],
        },
        {
            name: 'should report an inline brand',
            code: "type UserId = string & { readonly __brand: 'UserId' }",
            errors: [{ message: BrandMessage }],
        },
        {
            name: 'should report an inline `AtLeastOne`',
            code: 'type Some<T> = Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]',
            errors: [{ message: AtLeastOneMessage }],
        },
        {
            name: 'should report an inline `OptionalKeys`',
            code: 'type Keys<T> = keyof { [K in keyof T as T[K] extends undefined ? K : never]: unknown }',
            errors: [{ message: OptionalKeysMessage }],
        },
        {
            name: 'should report an inline `RequiredKeys`',
            code: 'type Keys<T> = Exclude<keyof T, OptionalKeys<T>>',
            errors: [{ message: RequiredKeysMessage }],
        },
        {
            name: 'should report an inline `KeysOfType`',
            code: 'type Keys<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]',
            errors: [{ message: KeysOfTypeMessage }],
        },
        {
            name: 'should report a union in a type assertion',
            code: 'const maybe = item as string | null',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report a union in a call type argument',
            code: 'const [value] = useState<string | null>(null)',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report a union inherited into an interface',
            code: 'interface Row extends Other { value: string | null }',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report a union on an optional property',
            code: 'interface Row { value?: string | null }',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report a union beside JSX',
            code: 'const view = <div />\ntype Row = { value: string | null }',
            filename: 'Row.tsx',
            errors: [{ message: NullableMessage }],
        },
        {
            name: 'should report a map and an index written on one line',
            code: 'type Map = Record<string, T[keyof T]>',
            errors: [{ message: DictionaryMessage }, { message: ValueOfMessage }],
        },
        {
            name: 'should report a map holding a nullable value on one line',
            code: 'type Row = Record<string, string | null>',
            errors: [{ message: DictionaryMessage }, { message: NullableMessage }],
        },
        {
            name: 'should report a nested callback that returns nothing',
            code: 'type Runner = (done: () => void) => void',
            errors: [{ message: VoidFunctionMessage }],
        },
        {
            name: 'should report `AnyObject` as a property',
            code: 'type Row = { value: Record<PropertyKey, unknown> }',
            errors: [{ message: AnyObjectMessage }],
        },
        {
            name: 'should report `EmptyObject` in a parameter',
            code: 'const read = (row: Record<never, never>) => row',
            errors: [{ message: EmptyObjectMessage }],
        },
        {
            name: 'should report `Key` as a property',
            code: 'interface Row { key: Extract<keyof Item, string> }',
            errors: [{ message: KeyMessage }],
        },
        {
            name: 'should report `TypeGuard` as an array element type',
            code: 'const guards: ((value: unknown) => value is string)[] = []',
            errors: [{ message: TypeGuardMessage }],
        },
        {
            name: 'should report `Merge` in a parameter',
            code: 'const merge = (item: Omit<A, keyof B> & B) => item',
            errors: [{ message: MergeMessage }],
        },
        {
            name: 'should report `PartialBy` as a property',
            code: 'type Row = { partly: Omit<T, K> & Partial<Pick<T, K>> }',
            errors: [{ message: PartialByMessage }],
        },
        {
            name: 'should report `RequiredBy` as a property',
            code: 'type Row = { partly: Omit<T, K> & Required<Pick<T, K>> }',
            errors: [{ message: RequiredByMessage }],
        },
        {
            name: 'should report `ValueOf` in a parameter',
            code: 'const read = (values: T[keyof T]) => values',
            errors: [{ message: ValueOfMessage }],
        },
        {
            name: 'should report `Emptiable` in a parameter',
            code: 'const read = (value: unknown[] | string | Dictionary | Nil) => value',
            errors: [{ message: EmptiableMessage }],
        },
        {
            name: 'should report `WithoutId` as a property',
            code: "type Row = { item: Omit<Item, '_id'> }",
            errors: [{ message: WithoutIdMessage }],
        },
        {
            name: 'should report `Brand` as a property',
            code: "type Row = { id: string & { readonly __brand: 'UserId' } }",
            errors: [{ message: BrandMessage }],
        },
        {
            name: 'should report `AtLeastOne` in a parameter',
            code: 'const some = (value: Partial<T> & { [K in keyof T]: Pick<T, K> }[keyof T]) => value',
            errors: [{ message: AtLeastOneMessage }],
        },
        {
            name: 'should report `OptionalKeys` as a property',
            code: 'type Row = { keys: keyof { [K in keyof T as T[K] extends undefined ? K : never]: unknown } }',
            errors: [{ message: OptionalKeysMessage }],
        },
        {
            name: 'should report `RequiredKeys` in a parameter',
            code: 'const keys = (value: Exclude<keyof T, OptionalKeys<T>>) => value',
            errors: [{ message: RequiredKeysMessage }],
        },
        {
            name: 'should report `KeysOfType` as a property',
            code: 'type Row = { keys: { [K in keyof T]: T[K] extends V ? K : never }[keyof T] }',
            errors: [{ message: KeysOfTypeMessage }],
        },
        {
            name: 'should report `AnyFunction` as a property',
            code: 'interface Row { fn: (...args: any[]) => any }',
            errors: [{ message: AnyFunctionMessage }],
        },
        {
            name: 'should report `AsyncFunction` as a property',
            code: 'interface Row { fn: (...args: any[]) => Promise<any> }',
            errors: [{ message: AsyncFunctionMessage }],
        },
    ],
})
