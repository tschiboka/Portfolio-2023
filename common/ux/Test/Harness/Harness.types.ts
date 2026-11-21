import { Dictionary, Nullable } from '@common-utils/Generics/Generics.types'
import type { ByRoleMatcher, Matcher } from '@testing-library/react'
import type { VoidFunction } from '@common-utils'
import type { Accessor } from '../Accessor/Accessor'

/** What any recipe may add to the query it names. */
export type RecipeModifiers = {
    /** Another key, so the query runs inside that element rather than the page root. */
    within?: string
    /** The whole document, ignoring the page root. `within` and `scope` exclude each other. */
    scope?: 'screen'
    /** Role recipes only — RTL's own narrowing, for a name shared by several elements. */
    hasText?: Matcher
    /** Which of several matches — required once more than one matches. */
    index?: number
}

/**
 * One entry's element, named by the RTL query family it belongs to. The key decides the query, so a
 * harness never spells `getByRole` out and never drifts from the accessor it mirrors.
 */
export type ElementRecipe = RecipeModifiers &
    (
        | { role: ByRoleMatcher; name?: Matcher }
        | { label: Matcher }
        | { text: Matcher }
        | { placeholder: Matcher }
        | { altText: Matcher }
        | { title: Matcher }
        | { displayValue: Matcher }
        | { testId: string }
    )

/** An entry that names an existing accessor, so a component's own contract is reused rather than re-stated. */
export type AccessorRecipe = { via: () => Accessor }

/** A feature's named sequences — each a whole journey, composed from `Do` and `Wait`. */
export type HarnessFlow = Dictionary<() => Promise<void>>

/** A key whose recipe is built from the call's arguments. Not yet surfaced: the polymorphic `this`
 * cannot resolve a conditional type in a rest-parameter position, so the surfaces stay zero-argument. */
export type RecipeFactory = (...args: never[]) => ElementRecipe

/** Anything a harness may declare. */
export type ElementEntry = ElementRecipe | AccessorRecipe

/** A harness's declarations, keyed by the name a spec uses. */
export type ElementMap = Dictionary<ElementEntry>

/** What an entry resolves to: the accessor it holds, or the element its recipe names. */
export type ResolvedEntry<TEntry> = TEntry extends AccessorRecipe
    ? ReturnType<TEntry['via']>
    : HTMLElement

/** The keys that name an element — the only ones an action, a plural query or a wait may take. */
export type ElementKeys<TMap extends ElementMap> = {
    [TKey in keyof TMap]: TMap[TKey] extends AccessorRecipe ? never : TKey
}[keyof TMap]

/** A harness instance: whatever declares an element map. The surface types take this, not the map. */
export type HarnessInstance = { Elements: ElementMap }

/** The element keys of one harness instance — `this`, in every surface below. */
export type HarnessKeys<TSelf extends HarnessInstance> = ElementKeys<TSelf['Elements']>

/** The base getters every accessor carries, so a harness keeps them alongside its own keys. */
export type AccessorGetters = Accessor['Get']

export type HarnessGet<TSelf extends HarnessInstance> = AccessorGetters & {
    [TKey in keyof TSelf['Elements']]: () => ResolvedEntry<TSelf['Elements'][TKey]>
}

export type HarnessGetAll<TSelf extends HarnessInstance> = {
    [TKey in HarnessKeys<TSelf>]: () => HTMLElement[]
}

export type HarnessQuery<TSelf extends HarnessInstance> = {
    [TKey in keyof TSelf['Elements']]: () => Nullable<ResolvedEntry<TSelf['Elements'][TKey]>>
}

export type HarnessQueryAll<TSelf extends HarnessInstance> = {
    [TKey in HarnessKeys<TSelf>]: () => HTMLElement[]
}

export type HarnessFind<TSelf extends HarnessInstance> = {
    [TKey in keyof TSelf['Elements']]: () => Promise<ResolvedEntry<TSelf['Elements'][TKey]>>
}

export type HarnessFindAll<TSelf extends HarnessInstance> = {
    [TKey in HarnessKeys<TSelf>]: () => Promise<HTMLElement[]>
}

/**
 * The same as `HarnessFind`, but over a declared key and with loose arguments: `Accessor.Wait` is typed
 * as a permissive proxy, and an override has to stay assignable to it.
 */
export type HarnessWait<TSelf extends HarnessInstance> = {
    [TKey in keyof TSelf['Elements']]: (
        ...args: unknown[]
    ) => Promise<ResolvedEntry<TSelf['Elements'][TKey]>>
}

/** The checks that answer yes or no, over a declared key — `Has` never throws. */
export type HarnessHas<TSelf extends HarnessInstance> = {
    [TKey in keyof TSelf['Elements']]: () => boolean
}

/** What a spec may assert about a declared element, immediately. `WaitFor` is the same set, retried. */
/**
 * What a spec may assert about a declared element, in jest-dom's vocabulary. Every key qualifies:
 * an accessor key asserts against the element its accessor is already bound to.
 */
export type HarnessExpect<TSelf extends HarnessInstance> = {
    visible: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    absent: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    enabled: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    disabled: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    checked: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    unchecked: { [TKey in keyof TSelf['Elements']]: VoidFunction }
    text: { [TKey in keyof TSelf['Elements']]: (content: string) => void }
    inputValue: { [TKey in keyof TSelf['Elements']]: (value: string) => void }
}

/** State that settles later — presence is `Wait`, which retries `Get`. */
export type HarnessWaitFor<TSelf extends HarnessInstance> = {
    enabled: { [TKey in keyof TSelf['Elements']]: () => Promise<void> }
    gone: { [TKey in keyof TSelf['Elements']]: () => Promise<void> }
    inputValue: { [TKey in keyof TSelf['Elements']]: (value: string) => Promise<void> }
}
