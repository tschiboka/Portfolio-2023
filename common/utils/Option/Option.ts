/** A selectable choice: a display label paired with a value. */
export type Option<T = string> = {
    value: T
    label: string
}

/** Helper functions over {@link Option} collections. */
export const Option = {
    /**
     * Plucks the `value` from each option, preserving the literal union of `value`s.
     *
     * @example
     * const options = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] as const
     * Option.getValues(options) // ['a', 'b']
     */
    getValues: <T>(options: readonly Option<T>[]): T[] => options.map((option) => option.value),

    /**
     * Plucks the `label` from each option.
     *
     * @example
     * Option.getLabels([{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]) // ['A', 'B']
     */
    getLabels: <T>(options: readonly Option<T>[]): string[] =>
        options.map((option) => option.label),

    /**
     * Finds the label for a given value. Returns `undefined` when no option matches.
     *
     * @example
     * Option.getLabelByValue([{ value: 'a', label: 'A' }], 'a') // 'A'
     * Option.getLabelByValue([{ value: 'a', label: 'A' }], 'z') // undefined
     */
    getLabelByValue: <T>(options: readonly Option<T>[], value: T): string | undefined =>
        options.find((option) => option.value === value)?.label,

    /**
     * Finds the value for a given label. Returns `undefined` when no option matches.
     *
     * @example
     * Option.getValueByLabel([{ value: 'a', label: 'A' }], 'A') // 'a'
     * Option.getValueByLabel([{ value: 'a', label: 'A' }], 'z') // undefined
     */
    getValueByLabel: <T>(options: readonly Option<T>[], label: string): T | undefined =>
        options.find((option) => option.label === label)?.value,
}
