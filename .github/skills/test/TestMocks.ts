// @ts-nocheck — skill example, outside the tsconfig include.

/** Shared primitives. No feature-local literals — extend these instead. */
export const TestMocks = {
    prop1: true,
    prop2: 2,
    prop3: 'prop-3',
    prop4: Object<unknown>(),
    prop5: Function<unknown>(() => {}),
}
