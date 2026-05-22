import { Set } from './Grid.spec.utils'

describe('Grid', () => {
    describe('rendering', () => {
        it('should render children', () => {
            const grid = Set.grid({ ariaLabel: 'children', children: <span>child</span> })
            expect(grid.Get.byText('child')).toBeInTheDocument()
        })

        it('should render as div by default', () => {
            const grid = Set.grid({ ariaLabel: 'def' })
            expect(grid.Get.tagName()).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            const grid = Set.grid({ as: 'section', ariaLabel: 'sec' })
            expect(grid.Get.tagName()).toBe('SECTION')
        })

        it('should use grid display', () => {
            const grid = Set.grid({ ariaLabel: 'disp' })
            expect(grid.Get.style().display).toBe('grid')
        })

        it('should always include "grid" in className', () => {
            const grid = Set.grid({ ariaLabel: 'cls' })
            expect(grid.Get.className()).toContain('grid')
        })
    })

    describe('columns', () => {
        it('should not set gridTemplateColumns when not provided', () => {
            const grid = Set.grid({ ariaLabel: 'nc' })
            expect(grid.Get.style().gridTemplateColumns).toBe('')
        })

        it('should set gridTemplateColumns with repeat', () => {
            const grid = Set.grid({ columns: 3, ariaLabel: 'c3' })
            expect(grid.Get.style().gridTemplateColumns).toBe('repeat(3, 1fr)')
        })

        it('should support 12-column grid', () => {
            const grid = Set.grid({ columns: 12, ariaLabel: 'c12' })
            expect(grid.Get.style().gridTemplateColumns).toBe('repeat(12, 1fr)')
        })
    })

    describe('responsive columns', () => {
        it('should apply base column class', () => {
            const grid = Set.grid({ columns: { base: 2 }, ariaLabel: 'rb' })
            expect(grid.Get.className()).toContain('grid-cols-2')
        })

        it('should apply breakpoint column classes', () => {
            const grid = Set.grid({
                columns: { base: 1, sm: 2, md: 3, lg: 4 },
                ariaLabel: 'rbp',
            })
            const cls = grid.Get.className()
            expect(cls).toContain('grid-cols-1')
            expect(cls).toContain('grid-cols-sm-2')
            expect(cls).toContain('grid-cols-md-3')
            expect(cls).toContain('grid-cols-lg-4')
        })

        it('should not set inline gridTemplateColumns when responsive', () => {
            const grid = Set.grid({ columns: { base: 2, md: 3 }, ariaLabel: 'rni' })
            expect(grid.Get.style().gridTemplateColumns).toBe('')
        })

        it('should support all breakpoints', () => {
            const grid = Set.grid({
                columns: { base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6, '2xl': 12 },
                ariaLabel: 'rall',
            })
            const cls = grid.Get.className()
            expect(cls).toContain('grid-cols-1')
            expect(cls).toContain('grid-cols-xs-2')
            expect(cls).toContain('grid-cols-sm-3')
            expect(cls).toContain('grid-cols-md-4')
            expect(cls).toContain('grid-cols-lg-5')
            expect(cls).toContain('grid-cols-xl-6')
            expect(cls).toContain('grid-cols-2xl-12')
        })

        it('should merge with custom className', () => {
            const grid = Set.grid({
                columns: { base: 2, md: 3 },
                className: 'custom',
                ariaLabel: 'rcls',
            })
            const cls = grid.Get.className()
            expect(cls).toContain('grid')
            expect(cls).toContain('grid-cols-2')
            expect(cls).toContain('grid-cols-md-3')
            expect(cls).toContain('custom')
        })
    })

    describe('gap', () => {
        it('should not set gap when not provided', () => {
            const grid = Set.grid({ ariaLabel: 'ng' })
            expect(grid.Get.style().gap).toBe('')
        })

        it('should apply gap', () => {
            const grid = Set.grid({ gap: '16', ariaLabel: 'g16' })
            expect(grid.Get.style().gap).toBe('16px')
        })

        it('should apply rowGap', () => {
            const grid = Set.grid({ rowGap: '8', ariaLabel: 'rg8' })
            expect(grid.Get.style().rowGap).toBe('8px')
        })

        it('should apply columnGap', () => {
            const grid = Set.grid({ columnGap: '24', ariaLabel: 'cg24' })
            expect(grid.Get.style().columnGap).toBe('24px')
        })
    })

    describe('alignment', () => {
        it('should set alignItems when align is provided', () => {
            const grid = Set.grid({ align: 'center', ariaLabel: 'ac' })
            expect(grid.Get.style().alignItems).toBe('center')
        })

        it('should set justifyItems when justify is provided', () => {
            const grid = Set.grid({ justify: 'end', ariaLabel: 'je' })
            expect(grid.Get.style().justifyItems).toBe('flex-end')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            const grid = Set.grid({ ariaLabel: 'test-label' })
            expect(grid.Get.attribute('aria-label')).toBe('test-label')
        })

        it('should apply className', () => {
            const grid = Set.grid({ className: 'custom', ariaLabel: 'cls' })
            expect(grid.Get.className()).toContain('custom')
        })

        it('should apply custom style', () => {
            const grid = Set.grid({ style: { background: 'red' }, ariaLabel: 'st' })
            expect(grid.Get.style().background).toBe('red')
        })
    })
})
