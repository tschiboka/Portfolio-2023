import { Set, selectRatio } from './Split.spec.utils'

describe('Split', () => {
    describe('selectRatio', () => {
        const cases: { input: Parameters<typeof selectRatio>[0]; expected: string }[] = [
            { input: '1/1', expected: '1fr 1fr' },
            { input: '1/2', expected: '1fr 2fr' },
            { input: '2/1', expected: '2fr 1fr' },
            { input: '1/3', expected: '1fr 3fr' },
            { input: '3/1', expected: '3fr 1fr' },
            { input: '1/4', expected: '1fr 4fr' },
            { input: '4/1', expected: '4fr 1fr' },
            { input: undefined, expected: '1fr 1fr' },
        ]

        cases.forEach(({ input, expected }) => {
            it(`should map "${String(input)}" to "${expected}"`, () => {
                expect(selectRatio(input)).toBe(expected)
            })
        })
    })

    describe('rendering', () => {
        it('should render left and right content', () => {
            const split = Set.split({
                ariaLabel: 'content',
                left: <span>Left pane</span>,
                right: <span>Right pane</span>,
            })
            expect(split.Get.byText('Left pane')).toBeInTheDocument()
            expect(split.Get.byText('Right pane')).toBeInTheDocument()
        })

        it('should render as div by default', () => {
            const split = Set.split({ ariaLabel: 'def' })
            expect(split.Get.tagName()).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            const split = Set.split({ as: 'section', ariaLabel: 'sec' })
            expect(split.Get.tagName()).toBe('SECTION')
        })

        it('should use grid display', () => {
            const split = Set.split({ ariaLabel: 'disp' })
            expect(split.Get.style().display).toBe('grid')
        })
    })

    describe('ratio', () => {
        it('should default to equal split', () => {
            const split = Set.split({ ariaLabel: 'eq' })
            expect(split.Get.style().gridTemplateColumns).toBe('1fr 1fr')
        })

        it('should apply custom ratio', () => {
            const split = Set.split({ ratio: '2/1', ariaLabel: 'r21' })
            expect(split.Get.style().gridTemplateColumns).toBe('2fr 1fr')
        })

        it('should apply 1/3 ratio', () => {
            const split = Set.split({ ratio: '1/3', ariaLabel: 'r13' })
            expect(split.Get.style().gridTemplateColumns).toBe('1fr 3fr')
        })
    })

    describe('gap', () => {
        it('should not set gap when not provided', () => {
            const split = Set.split({ ariaLabel: 'ng' })
            expect(split.Get.style().gap).toBe('')
        })

        it('should apply gap', () => {
            const split = Set.split({ gap: '16', ariaLabel: 'g16' })
            expect(split.Get.style().gap).toBe('16px')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            const split = Set.split({ ariaLabel: 'test-label' })
            expect(split.Get.attribute('aria-label')).toBe('test-label')
        })

        it('should apply className', () => {
            const split = Set.split({ className: 'custom', ariaLabel: 'cls' })
            expect(split.Get.className()).toBe('custom')
        })

        it('should apply custom style', () => {
            const split = Set.split({ style: { background: 'red' }, ariaLabel: 'st' })
            expect(split.Get.style().background).toBe('red')
        })
    })
})
