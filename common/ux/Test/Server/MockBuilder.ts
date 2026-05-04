export type MockBuilderType<T> = {
    modify: (overrides: Partial<T>) => MockBuilderType<T>
    setValue: <P extends keyof T>(property: P, value: T[P]) => MockBuilderType<T>
    set: (modifier: (mock: T) => T) => MockBuilderType<T>
    build: () => T
}

export const MockBuilder = <T>(state: T): MockBuilderType<T> => ({
    modify: (overrides) => MockBuilder({ ...state, ...overrides }),
    setValue: (property, value) => MockBuilder({ ...state, [property]: value } as T),
    set: (modifier) => MockBuilder(modifier(state)),
    build: () => state,
})
