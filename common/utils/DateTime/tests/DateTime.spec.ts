import { DateTime } from '../index'

const { Formats, Units, Format } = DateTime

describe('DateTime', () => {
    describe('Formats', () => {
        it.each([
            ['DisplayDate', 'DD/MM/YYYY'],
            ['DisplayDateTime', 'DD/MM/YYYY HH:mm'],
            ['DisplayLongDate', 'ddd, DD. MMM. YYYY'],
            ['ApiDate', 'YYYY-MM-DD'],
            ['ApiDateTime', 'YYYY-MM-DDTHH:mm:ssZ'],
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

    describe('Format.to', () => {
        describe('valid inputs', () => {
            it('should format a Date object with DisplayDate', () => {
                const date = new Date(2023, 7, 6)
                expect(Format.to('DisplayDate', date)).toBe('06/08/2023')
            })

            it('should format a Date object with DisplayDateTime', () => {
                const date = new Date(2023, 7, 6, 14, 30)
                expect(Format.to('DisplayDateTime', date)).toBe('06/08/2023 14:30')
            })

            it('should format a Date object with DisplayLongDate', () => {
                const date = new Date(2026, 5, 12)
                expect(Format.to('DisplayLongDate', date)).toBe('Fri, 12. Jun. 2026')
            })

            it('should format a timestamp number', () => {
                const date = new Date(2023, 7, 6)
                expect(Format.to('DisplayDate', date.getTime())).toBe('06/08/2023')
            })

            it('should format an ISO date string', () => {
                expect(Format.to('DisplayDate', '2023-08-06')).toBe('06/08/2023')
            })

            it('should format a DD/MM/YYYY date string', () => {
                expect(Format.to('DisplayDate', '06/08/2023')).toBe('06/08/2023')
            })
        })

        describe('edge cases', () => {
            it('should return undefined for undefined', () => {
                expect(Format.to('DisplayDate', undefined)).toBeUndefined()
            })

            it('should return undefined for null', () => {
                expect(Format.to('DisplayDate', null)).toBeUndefined()
            })

            it('should return undefined for empty string', () => {
                expect(Format.to('DisplayDate', '')).toBeUndefined()
            })

            it('should return undefined for an unparseable string', () => {
                expect(Format.to('DisplayDate', 'not-a-date')).toBeUndefined()
            })
        })
    })

    describe('Format.parse', () => {
        it('should parse a DD/MM/YYYY string', () => {
            const result = Format.parse('06/08/2023')
            expect(result).toBeInstanceOf(Date)
            expect(result!.getFullYear()).toBe(2023)
            expect(result!.getMonth()).toBe(7)
            expect(result!.getDate()).toBe(6)
        })

        it('should parse an ISO date string', () => {
            const result = Format.parse('2023-08-06')
            expect(result).toBeInstanceOf(Date)
            expect(result!.getFullYear()).toBe(2023)
            expect(result!.getMonth()).toBe(7)
            expect(result!.getDate()).toBe(6)
        })

        it('should parse a Date object', () => {
            const input = new Date(2023, 7, 6)
            const result = Format.parse(input)
            expect(result).toStrictEqual(input)
        })

        it('should parse a timestamp number', () => {
            const timestamp = new Date(2023, 7, 6).getTime()
            const result = Format.parse(timestamp)
            expect(result!.getFullYear()).toBe(2023)
            expect(result!.getMonth()).toBe(7)
        })

        it('should return undefined for undefined', () => {
            expect(Format.parse(undefined)).toBeUndefined()
        })

        it('should return undefined for null', () => {
            expect(Format.parse(null)).toBeUndefined()
        })

        it('should return undefined for empty string', () => {
            expect(Format.parse('')).toBeUndefined()
        })

        it('should return undefined for an unparseable string', () => {
            expect(Format.parse('not-a-date')).toBeUndefined()
        })
    })

    describe('Format.ms', () => {
        it('should return timestamp for a DD/MM/YYYY string', () => {
            const result = Format.ms('06/08/2023')
            expect(result).toBe(new Date(2023, 7, 6).getTime())
        })

        it('should return timestamp for an ISO string', () => {
            const result = Format.ms('2023-08-06')
            expect(result).toBe(new Date(2023, 7, 6).getTime())
        })

        it('should return 0 for undefined', () => {
            expect(Format.ms(undefined)).toBe(0)
        })

        it('should return 0 for null', () => {
            expect(Format.ms(null)).toBe(0)
        })

        it('should return 0 for empty string', () => {
            expect(Format.ms('')).toBe(0)
        })

        it('should return 0 for an unparseable string', () => {
            expect(Format.ms('not-a-date')).toBe(0)
        })
    })
})
