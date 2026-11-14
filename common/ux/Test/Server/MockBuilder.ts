import { over } from 'ramda'
import type { MockBuilderType } from './MockBuilder.types'

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
