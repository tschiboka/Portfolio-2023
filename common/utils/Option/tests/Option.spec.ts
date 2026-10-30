import { describe, it, expect, expectTypeOf } from 'vitest'
import { Option } from '..'
import type { Option as OptionT } from '..'

describe('Option type', () => {
    it('should require value and label', () => {
        // An `Option<string>` is assignable from { value, label }.
        const option: OptionT<string> = { value: 'x', label: 'X' }
        expect(option).toEqual({ value: 'x', label: 'X' })
    })

    it('should support non-string values via the generic', () => {
        const numberOption: OptionT<number> = { value: 1, label: 'One' }
        const boolOption: OptionT<boolean> = { value: true, label: 'True' }
        expect(numberOption).toEqual({ value: 1, label: 'One' })
        expect(boolOption).toEqual({ value: true, label: 'True' })
    })

    it('should accept options with extra properties via structural typing', () => {
        const withExtras = { value: 'x', label: 'X', icon: null, iconColor: 'red' }
        const option: OptionT<string> = withExtras
        expect(option.value).toBe('x')
    })
})

describe('Option.getValues — runtime invariants', () => {
    it('should return an empty array for empty options', () => {
        expect(Option.getValues([])).toEqual([])
    })

    it('should return a single value for a single option', () => {
        expect(Option.getValues([{ value: 'a', label: 'A' }])).toEqual(['a'])
    })

    it('should preserve input order', () => {
        expect(
            Option.getValues([
                { value: 'c', label: 'C' },
                { value: 'a', label: 'A' },
            ]),
        ).toEqual(['c', 'a'])
    })

    it('should not sort values', () => {
        expect(
            Option.getValues([
                { value: 3, label: 'C' },
                { value: 1, label: 'A' },
            ]),
        ).toEqual([3, 1])
    })

    it('should preserve duplicate values and their positions', () => {
        const result = Option.getValues([
            { value: 'a', label: 'A1' },
            { value: 'b', label: 'B' },
            { value: 'a', label: 'A2' },
        ])
        expect(result).toEqual(['a', 'b', 'a'])
    })

    it('should ignore labels entirely — same value with different labels yields the same output', () => {
        const a = Option.getValues([{ value: 'x', label: 'One' }])
        const b = Option.getValues([{ value: 'x', label: 'Two' }])
        expect(a).toEqual(b)
    })

    it('should preserve primitive values unchanged, including falsy ones', () => {
        expect(Option.getValues([{ value: 0, label: 'zero' }])).toEqual([0])
        expect(Option.getValues([{ value: '', label: 'empty' }])).toEqual([''])
        expect(Option.getValues([{ value: false, label: 'false' }])).toEqual([false])
        expect(Option.getValues([{ value: NaN, label: 'nan' }])).toEqual([NaN])
    })

    it('should preserve object/array references (shallow extraction, no cloning)', () => {
        const obj = { id: 1 }
        const arr = [1, 2]
        const options: OptionT<{ id: number } | number[]>[] = [
            { value: obj, label: 'obj' },
            { value: arr, label: 'arr' },
        ]
        const output = Option.getValues(options)
        expect(output[0]).toBe(obj)
        expect(output[1]).toBe(arr)
    })

    it('should not mutate the input options array', () => {
        const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ]
        const snapshot = options.map((o) => ({ ...o }))
        Option.getValues(options)
        expect(options).toEqual(snapshot)
    })

    it('should return a new array, independent of the input collection', () => {
        const options = [{ value: 'a', label: 'A' }]
        const output = Option.getValues(options)
        expect(output).not.toBe(options)
        output[0] = 'mutated'
        expect(options[0].value).toBe('a')
    })

    it('should reflect a replaced option value on a subsequent call', () => {
        const options: OptionT<string>[] = [{ value: 'a', label: 'A' }]
        const first = Option.getValues(options)
        expect(first).toEqual(['a'])
        options[0].value = 'b'
        expect(Option.getValues(options)).toEqual(['b'])
    })

    it('should not use option.label', () => {
        const output = Option.getValues([{ value: 'a', label: 'anything' }])
        expect(output).toEqual(['a'])
    })
})

describe('Option.getLabels', () => {
    it('should return the label of each option in order', () => {
        expect(
            Option.getLabels([
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
            ]),
        ).toEqual(['A', 'B'])
    })

    it('should return an empty array for empty options', () => {
        expect(Option.getLabels([])).toEqual([])
    })

    it('should preserve duplicate labels', () => {
        expect(
            Option.getLabels([
                { value: 'a', label: 'X' },
                { value: 'b', label: 'X' },
            ]),
        ).toEqual(['X', 'X'])
    })

    it('should preserve input order and does not sort', () => {
        expect(
            Option.getLabels([
                { value: 'c', label: 'Zebra' },
                { value: 'a', label: 'Alpha' },
            ]),
        ).toEqual(['Zebra', 'Alpha'])
    })

    it('should return a new, independent array', () => {
        const options = [{ value: 'a', label: 'A' }]
        const output = Option.getLabels(options)
        expect(output).not.toBe(options)
        output[0] = 'mutated'
        expect(options[0].label).toBe('A')
    })

    it('should not depend on values (incl. non-string values)', () => {
        expect(
            Option.getLabels([
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
            ]),
        ).toEqual(['One', 'Two'])
    })
})

describe('Option.getLabelByValue', () => {
    it('should return the label for a matching value', () => {
        expect(
            Option.getLabelByValue(
                [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ],
                'b',
            ),
        ).toBe('B')
    })

    it('should return undefined when no option matches the value', () => {
        expect(Option.getLabelByValue([{ value: 'a', label: 'A' }], 'z')).toBeUndefined()
    })

    it('should return undefined for an empty collection', () => {
        expect(Option.getLabelByValue([], 'a')).toBeUndefined()
    })

    it('should support non-string values', () => {
        expect(
            Option.getLabelByValue(
                [
                    { value: 1, label: 'One' },
                    { value: 2, label: 'Two' },
                ],
                2,
            ),
        ).toBe('Two')
    })

    it('should support object values by reference equality', () => {
        const target = { id: 2 }
        const options = [
            { value: { id: 1 }, label: 'First' },
            { value: target, label: 'Second' },
        ]
        expect(Option.getLabelByValue(options, target)).toBe('Second')
        // a different object with the same shape is not matched (reference equality)
        expect(Option.getLabelByValue(options, { id: 2 })).toBeUndefined()
    })

    it('should match the first option when values are duplicated', () => {
        expect(
            Option.getLabelByValue(
                [
                    { value: 'x', label: 'First' },
                    { value: 'x', label: 'Second' },
                ],
                'x',
            ),
        ).toBe('First')
    })

    it("should return an empty string label as '', not undefined (empty label is a valid result)", () => {
        expect(Option.getLabelByValue([{ value: 'a', label: '' }], 'a')).toBe('')
    })

    it('should use strict equality: NaN never matches, -0 matches 0', () => {
        expect(Option.getLabelByValue([{ value: NaN, label: 'nan' }], NaN)).toBeUndefined()
        expect(Option.getLabelByValue([{ value: 0, label: 'zero' }], -0)).toBe('zero')
    })

    it('should distinguish null from undefined and strict types', () => {
        const options: OptionT<null | undefined | string>[] = [
            { value: null, label: 'null' },
            { value: undefined, label: 'undefined' },
        ]
        expect(Option.getLabelByValue(options, null)).toBe('null')
        expect(Option.getLabelByValue(options, undefined)).toBe('undefined')
        // a boolean/number value does not match a null/undefined-valued option
        expect(Option.getLabelByValue([{ value: null, label: 'n' }], false)).toBeUndefined()
    })
})

describe('Option.getValueByLabel', () => {
    it('should return the value for a matching label', () => {
        expect(
            Option.getValueByLabel(
                [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ],
                'B',
            ),
        ).toBe('b')
    })

    it('should return undefined when no option matches the label', () => {
        expect(Option.getValueByLabel([{ value: 'a', label: 'A' }], 'z')).toBeUndefined()
    })

    it('should return undefined for an empty collection', () => {
        expect(Option.getValueByLabel([], 'A')).toBeUndefined()
    })

    it('should match the first option when labels are duplicated', () => {
        expect(
            Option.getValueByLabel(
                [
                    { value: 'first', label: 'X' },
                    { value: 'second', label: 'X' },
                ],
                'X',
            ),
        ).toBe('first')
    })

    it('should use strict equality: matching is case-sensitive and whitespace-significant', () => {
        expect(Option.getValueByLabel([{ value: 'a', label: 'A' }], 'a')).toBeUndefined()
        expect(Option.getValueByLabel([{ value: 'a', label: 'A' }], ' A')).toBeUndefined()
        expect(Option.getValueByLabel([{ value: 'a', label: 'A' }], 'A ')).toBeUndefined()
    })

    it('should not mistake falsy values for "no result"', () => {
        const options: OptionT<string | number | boolean | null>[] = [
            { value: '', label: 'empty-string' },
            { value: 0, label: 'zero' },
            { value: false, label: 'false' },
            { value: null, label: 'null' },
        ]
        expect(Option.getValueByLabel(options, 'empty-string')).toBe('')
        expect(Option.getValueByLabel(options, 'zero')).toBe(0)
        expect(Option.getValueByLabel(options, 'false')).toBe(false)
        expect(Option.getValueByLabel(options, 'null')).toBe(null)
    })

    it('should be ambiguous for undefined-valued matches: cannot distinguish no-match from undefined value', () => {
        const options: OptionT<string | undefined>[] = [{ value: undefined, label: 'undef' }]
        // both the no-match and the matched-undefined cases return undefined:
        expect(Option.getValueByLabel(options, 'undef')).toBeUndefined()
        expect(Option.getValueByLabel(options, 'missing')).toBeUndefined()
    })
})

describe('Option.getLabelByValue — type-level', () => {
    it('should return string | undefined', () => {
        const options: OptionT<string>[] = [{ value: 'a', label: 'A' }]
        expectTypeOf(Option.getLabelByValue(options, 'a')).toEqualTypeOf<string | undefined>()
    })
})

describe('Option.getValueByLabel — type-level', () => {
    it('should return T | undefined, preserving the value union', () => {
        const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ] as const
        expectTypeOf(Option.getValueByLabel(options, 'A')).toEqualTypeOf<('a' | 'b') | undefined>()
    })
})

describe('Option.getLabels — type-level', () => {
    it('should return string[]', () => {
        const options: OptionT<string>[] = [{ value: 'a', label: 'A' }]
        expectTypeOf(Option.getLabels(options)).toEqualTypeOf<string[]>()
    })
})

describe('Option.getValues — type-level contract', () => {
    it('should infer T from the supplied options', () => {
        const options: OptionT<string>[] = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ]
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<string[]>()
    })

    it('should preserve the literal union for as-const options', () => {
        const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ] as const
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<('a' | 'b')[]>()
    })

    it('should preserve numeric literals', () => {
        const options = [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
        ] as const
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<(1 | 2)[]>()
    })

    it('should preserve boolean literals', () => {
        const options = [
            { value: true, label: 'T' },
            { value: false, label: 'F' },
        ] as const
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<boolean[]>()
    })

    it('should preserve object literal value shapes (no widening to object)', () => {
        const options: OptionT<{ id: number }>[] = [
            { value: { id: 1 }, label: 'A' },
            { value: { id: 2 }, label: 'B' },
        ]
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<{ id: number }[]>()
    })

    it('should accept readonly arrays and returns a mutable array', () => {
        const options: readonly OptionT<string>[] = [{ value: 'a', label: 'A' }]
        const output = Option.getValues(options)
        expectTypeOf(output).toEqualTypeOf<string[]>()
        output.push('b') // mutable return type
        expect(output).toEqual(['a', 'b'])
    })

    it('should widen to string[] when the caller has already widened the value type', () => {
        const options: OptionT<string>[] = [{ value: 'a', label: 'A' }]
        expectTypeOf(Option.getValues(options)).toEqualTypeOf<string[]>()
    })
})

describe('Option — literal-union compile-time behaviour', () => {
    it('should accept a literal value in the union in getLabelByValue', () => {
        const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ] as const
        expectTypeOf(Option.getLabelByValue(options, 'a')).toEqualTypeOf<string | undefined>()
        expectTypeOf(Option.getLabelByValue(options, 'b')).toEqualTypeOf<string | undefined>()
    })

    it('should accept getValueByLabel with any string label (label is always string)', () => {
        const options = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ] as const
        // any string is a valid label arg for getValueByLabel
        const result = Option.getValueByLabel(options, 'z')
        expectTypeOf(result).toEqualTypeOf<('a' | 'b') | undefined>()
    })
})

describe('Option — readonly inputs accepted by all helpers', () => {
    const readonlyOptions: readonly OptionT<string>[] = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
    ]

    it('should accept readonly input in getValues', () => {
        expect(Option.getValues(readonlyOptions)).toEqual(['a', 'b'])
    })

    it('should accept readonly input in getLabels', () => {
        expect(Option.getLabels(readonlyOptions)).toEqual(['A', 'B'])
    })

    it('should accept readonly input in getLabelByValue', () => {
        expect(Option.getLabelByValue(readonlyOptions, 'b')).toBe('B')
    })

    it('should accept readonly input in getValueByLabel', () => {
        expect(Option.getValueByLabel(readonlyOptions, 'B')).toBe('b')
    })
})

describe('Option — cross-helper consistency', () => {
    const options = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
    ]

    it('should align getValues and getLabels positionally with the source options', () => {
        const values = Option.getValues(options)
        const labels = Option.getLabels(options)
        options.forEach((option, index) => {
            expect(values[index]).toBe(option.value)
            expect(labels[index]).toBe(option.label)
        })
    })

    it('should round-trip a value → label → value through the lookups when values and labels are unique', () => {
        for (const option of options) {
            const label = Option.getLabelByValue(options, option.value)
            expect(Option.getValueByLabel(options, label as string)).toBe(option.value)
        }
    })

    it('should round-trip a label → value → label through the lookups when values and labels are unique', () => {
        for (const option of options) {
            const value = Option.getValueByLabel(options, option.label)
            expect(Option.getLabelByValue(options, value as string)).toBe(option.label)
        }
    })

    it('should be not an inverse when values are duplicated (first-match wins)', () => {
        const dup = [
            { value: 'x', label: 'First' },
            { value: 'x', label: 'Second' },
        ]
        // value → label gives 'First'; label → value still gives 'x' (ambiguous, first wins)
        expect(Option.getLabelByValue(dup, 'x')).toBe('First')
    })
})
