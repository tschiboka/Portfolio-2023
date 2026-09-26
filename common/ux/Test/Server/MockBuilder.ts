import { over } from 'ramda'
import type { Lens } from 'ramda'

export type MockBuilderType<T> = {
    modify: (overrides: Partial<T>) => MockBuilderType<T>
    setValue: <P extends keyof T>(property: P, value: T[P]) => MockBuilderType<T>
    set: (modifier: (mock: T) => T) => MockBuilderType<T>
    /** Applies `modifier` to a nested value reached by a ramda `lens`. */
    update: (
        lens: Lens<unknown, unknown>,
        modifier: (value: unknown) => unknown,
    ) => MockBuilderType<T>
    omit: (...keys: (keyof T)[]) => MockBuilderType<T>
    pick: (...keys: (keyof T)[]) => MockBuilderType<T>
    /**
     * Wraps this mock (and any additional builders) in a `MockBuilderType<T[]>`.
     * Use for endpoints that return a plain array response.
     *
     * @example
     * response: MockChargePeriodResource.asList()
     * response: MockChargePeriodResource.asList(MockChargePeriodResource.modify({ id: 2 }))
     */
    asList: (...extra: MockBuilderType<T>[]) => MockBuilderType<T[]>
    buildList: (overrides: Partial<T>[]) => T[]
    build: () => T
}

export const MockBuilder = <T>(state: T): MockBuilderType<T> => ({
    modify: (overrides) => MockBuilder<T>({ ...state, ...overrides }),
    setValue: (property, value) => MockBuilder<T>({ ...state, [property]: value }),
    set: (modifier) => MockBuilder(modifier({ ...state })),
    update: (lens, modifier) => MockBuilder(over(lens, modifier, state) as T),
    omit: (...keys) =>
        MockBuilder(
            Object.fromEntries(
                Object.entries(state as object).filter(([k]) => !(keys as string[]).includes(k)),
            ) as T,
        ),
    pick: (...keys) => MockBuilder(Object.fromEntries(keys.map((key) => [key, state[key]])) as T),
    asList: (...extra) => MockBuilder([state, ...extra.map((builder) => builder.build())]),
    buildList: (overrides) =>
        overrides.map((override) => MockBuilder({ ...state, ...override }).build()),
    build: () => state,
})

export const MockEntitiesBuilder = <T>(state: T[]): MockBuilderType<{ entities: T[] }> =>
    MockBuilder({ entities: state })
