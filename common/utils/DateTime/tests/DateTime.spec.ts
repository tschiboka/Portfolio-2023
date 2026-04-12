import { DateTime } from '../index'

const { Formats, Units } = DateTime

describe('DateTime', () => {
    describe('Formats', () => {
        it.each([
            ['DisplayDate', 'DD/MM/YYYY'],
            ['DisplayDateTime', 'DD/MM/YYYY HH:mm'],
        ] as const)('should have %s = "%s"', (key, expected) => {
            expect(Formats[key]).toBe(expected)
        })
    })

    describe('Units', () => {
        it.each([
            ['fromSec', 1_000],
            ['fromMin', 60_000],
            ['fromHour', 3_600_000],
            ['fromDay', 86_400_000],
            ['fromWeek', 604_800_000],
        ] as const)('%s() default should return %i ms', (fn, expected) => {
            expect(Units.Ms[fn]()).toBe(expected)
        })

        describe.each([
            [
                'fromSec',
                [
                    [0, 0],
                    [1, 1_000],
                    [5, 5_000],
                    [0.5, 500],
                ],
            ],
            [
                'fromMin',
                [
                    [0, 0],
                    [1, 60_000],
                    [5, 300_000],
                    [0.5, 30_000],
                ],
            ],
            [
                'fromHour',
                [
                    [0, 0],
                    [1, 3_600_000],
                    [2, 7_200_000],
                    [0.5, 1_800_000],
                ],
            ],
            [
                'fromDay',
                [
                    [0, 0],
                    [1, 86_400_000],
                    [7, 604_800_000],
                    [0.5, 43_200_000],
                ],
            ],
            [
                'fromWeek',
                [
                    [0, 0],
                    [1, 604_800_000],
                    [2, 1_209_600_000],
                    [0.5, 302_400_000],
                ],
            ],
        ] as const)('Ms.%s', (fn, cases) => {
            it.each(cases)(`${fn}(%d) should return %d ms`, (input: number, expected: number) => {
                expect(Units.Ms[fn](input)).toBe(expected)
            })
        })

        describe('chaining consistency', () => {
            it.each([
                ['1 min = 60 sec', Units.Ms.fromMin(1), Units.Ms.fromSec(60)],
                ['1 hour = 60 min', Units.Ms.fromHour(1), Units.Ms.fromMin(60)],
                ['1 day = 24 hours', Units.Ms.fromDay(1), Units.Ms.fromHour(24)],
                ['1 week = 7 days', Units.Ms.fromWeek(1), Units.Ms.fromDay(7)],
            ])('%s', (_, actual, expected) => {
                expect(actual).toBe(expected)
            })
        })
    })
})
