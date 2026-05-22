import { Set, selectBackground, selectBorderRadius } from './Box.spec.utils'

describe('Box', () => {
    describe('selectBackground', () => {
        it('should return undefined when no background is provided', () => {
            expect(selectBackground()).toBeUndefined()
        })

        it('should map "surface" to --black-2', () => {
            expect(selectBackground('surface')).toBe('var(--black-2)')
        })

        it('should map "raised" to --black-3', () => {
            expect(selectBackground('raised')).toBe('var(--black-3)')
        })

        it('should map "transparent" to transparent', () => {
            expect(selectBackground('transparent')).toBe('transparent')
        })
    })

    describe('selectBorderRadius', () => {
        it('should return undefined when no radius is provided', () => {
            expect(selectBorderRadius()).toBeUndefined()
        })

        it('should map "sm" to --radius-sm', () => {
            expect(selectBorderRadius('sm')).toBe('var(--radius-sm)')
        })

        it('should map "full" to --radius-full', () => {
            expect(selectBorderRadius('full')).toBe('var(--radius-full)')
        })
    })

    describe('rendering', () => {
        it('should render children', () => {
            const box = Set.box({ ariaLabel: 'children', children: <span>child</span> })
            expect(box.Get.byText('child')).toBeInTheDocument()
        })

        it('should render as div by default', () => {
            const box = Set.box({ ariaLabel: 'def' })
            expect(box.Get.tagName()).toBe('DIV')
        })

        it('should render as a custom element via "as" prop', () => {
            const box = Set.box({ as: 'section', ariaLabel: 'sec' })
            expect(box.Get.tagName()).toBe('SECTION')
        })
    })

    describe('padding', () => {
        it('should not set padding when not provided', () => {
            const box = Set.box({ ariaLabel: 'np' })
            expect(box.Get.style().padding).toBe('')
        })

        it('should apply padding', () => {
            const box = Set.box({ padding: '16', ariaLabel: 'p16' })
            expect(box.Get.style().paddingTop).toBe('16px')
            expect(box.Get.style().paddingLeft).toBe('16px')
        })

        it('should apply paddingX', () => {
            const box = Set.box({ paddingX: '8', ariaLabel: 'px8' })
            expect(box.Get.style().paddingLeft).toBe('8px')
            expect(box.Get.style().paddingRight).toBe('8px')
        })

        it('should apply paddingY', () => {
            const box = Set.box({ paddingY: '12', ariaLabel: 'py12' })
            expect(box.Get.style().paddingTop).toBe('12px')
            expect(box.Get.style().paddingBottom).toBe('12px')
        })
    })

    describe('margin', () => {
        it('should not set margin when not provided', () => {
            const box = Set.box({ ariaLabel: 'nm' })
            expect(box.Get.style().margin).toBe('')
        })

        it('should apply margin', () => {
            const box = Set.box({ margin: '24', ariaLabel: 'm24' })
            expect(box.Get.style().margin).toBe('24px')
        })
    })

    describe('background', () => {
        it('should not set background when not provided', () => {
            const box = Set.box({ ariaLabel: 'nbg' })
            expect(box.Get.style().background).toBe('')
        })

        it('should apply background', () => {
            const box = Set.box({ background: 'surface', ariaLabel: 'bg' })
            expect(box.Get.style().background).toBe('var(--black-2)')
        })
    })

    describe('borderRadius', () => {
        it('should not set borderRadius when not provided', () => {
            const box = Set.box({ ariaLabel: 'nbr' })
            expect(box.Get.style().borderRadius).toBe('')
        })

        it('should apply borderRadius', () => {
            const box = Set.box({ borderRadius: 'md', ariaLabel: 'br' })
            expect(box.Get.style().borderRadius).toBe('var(--radius-md)')
        })
    })

    describe('display', () => {
        it('should not set display when not provided', () => {
            const box = Set.box({ ariaLabel: 'nd' })
            expect(box.Get.style().display).toBe('')
        })

        it('should apply display', () => {
            const box = Set.box({ display: 'flex', ariaLabel: 'df' })
            expect(box.Get.style().display).toBe('flex')
        })
    })

    describe('html attributes', () => {
        it('should apply ariaLabel', () => {
            const box = Set.box({ ariaLabel: 'test-label' })
            expect(box.Get.attribute('aria-label')).toBe('test-label')
        })

        it('should apply className', () => {
            const box = Set.box({ className: 'custom', ariaLabel: 'cls' })
            expect(box.Get.className()).toBe('custom')
        })

        it('should apply custom style', () => {
            const box = Set.box({ style: { color: 'red' }, ariaLabel: 'st' })
            expect(box.Get.style().color).toBe('red')
        })
    })
})
