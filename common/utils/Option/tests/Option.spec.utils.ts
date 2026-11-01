import type { Option } from '..'

const readonlyOptions: readonly Option<string>[] = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
]

const options: Option<string>[] = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
]

export const OptionTestUtils = { readonlyOptions, options }
