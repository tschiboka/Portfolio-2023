import { Set } from './Inline.spec.utils'

describe('Inline', () => {
    describe('rendering', () => {
        it('should render children', () => {
            const inline = Set.inline({ ariaLabel: 'children', children: <span>child</span> })
            expect(inline.Get.byText('child')).toBeInTheDocument()
        })

        it('should render as div by default', () => {
            const inline = Set.inline({ ariaLabel: 'def' })
            expect(inline.Get.tagName()).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            const inline = Set.inline({ as: 'nav', ariaLabel: 'nav' })
            expect(inline.Get.tagName()).toBe('NAV')
        })

        it('should always use row direction', () => {
            const inline = Set.inline({ ariaLabel: 'row' })
            expect(inline.Get.style().flexDirection).toBe('row')
        })

        it('should use flex display', () => {
            const inline = Set.inline({ ariaLabel: 'flex' })
            expect(inline.Get.style().display).toBe('flex')
        })
    })

    describe('alignment', () => {
        it('should set alignItems when align is provided', () => {
            const inline = Set.inline({ align: 'center', ariaLabel: 'ac' })
            expect(inline.Get.style().alignItems).toBe('center')
        })

        it('should set justifyContent when justify is provided', () => {
            const inline = Set.inline({ justify: 'between', ariaLabel: 'jb' })
            expect(inline.Get.style().justifyContent).toBe('space-between')
        })
    })

    describe('gap', () => {
        it('should not set gap when not provided', () => {
            const inline = Set.inline({ ariaLabel: 'ng' })
            expect(inline.Get.style().gap).toBe('')
        })

        it('should apply gap', () => {
            const inline = Set.inline({ gap: '12', ariaLabel: 'g12' })
            expect(inline.Get.style().gap).toBe('12px')
        })
    })

    describe('wrap', () => {
        it('should apply wrap', () => {
            const inline = Set.inline({ wrap: true, ariaLabel: 'w' })
            expect(inline.Get.style().flexWrap).toBe('wrap')
        })

        it('should not set flexWrap when wrap is false', () => {
            const inline = Set.inline({ ariaLabel: 'nw' })
            expect(inline.Get.style().flexWrap).toBe('')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            const inline = Set.inline({ ariaLabel: 'test-label' })
            expect(inline.Get.attribute('aria-label')).toBe('test-label')
        })

        it('should apply className', () => {
            const inline = Set.inline({ className: 'custom', ariaLabel: 'cls' })
            expect(inline.Get.className()).toBe('custom')
        })

        it('should apply custom style', () => {
            const inline = Set.inline({ style: { background: 'red' }, ariaLabel: 'st' })
            expect(inline.Get.style().background).toBe('red')
        })
    })
})
