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
