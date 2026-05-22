import { Set } from './Section.spec.utils'

describe('Section', () => {
    describe('as semantic section', () => {
        it('should render a <section> element', () => {
            const section = Set.section()
            expect(section.Get.tagName()).toBe('SECTION')
        })

        it('should render children', () => {
            const section = Set.section({ children: 'Hello world' })
            expect(section.Get.textContent()).toContain('Hello world')
        })

        it('should render without a title', () => {
            const section = Set.section({ ariaLabel: 'Plain' })
            expect(section.Get.title()).toBeNull()
        })

        it('should render a static title when not expandable', () => {
            const section = Set.section({ title: 'Info' })
            expect(section.Get.title()).toBe('Info')
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(section.Get.isExpandable()).toBe(false)
        })

        it('should always show content when not expandable', () => {
            const section = Set.section({ title: 'Info' })
            expect(section.Get.content()).not.toBeNull()
        })

        it('should render without an icon by default', () => {
            const section = Set.section({ title: 'Info' })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(section.Get.icon()).toBeNull()
        })

        it('should render an icon next to the title', () => {
            const section = Set.section({ title: 'Info', icon: <span>★</span> })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(section.Get.icon()).not.toBeNull()
        })

        it('should apply ariaLabel', () => {
            const section = Set.section({ ariaLabel: 'Details' })
            expect(section.Get.attribute('aria-label')).toBe('Details')
        })

        it('should apply className', () => {
            const section = Set.section({ className: 'custom' })
            expect(section.Get.className()).toContain('custom')
        })

        it('should apply custom style', () => {
            const section = Set.section({ style: { margin: '10px' } })
            expect(section.Get.style().margin).toBe('10px')
        })
    })

    describe('as expandable section', () => {
        it('should be collapsed by default', () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: false })
            expect(section.Get.isOpen()).toBe(false)
        })

        it('should not render content when collapsed', () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: false })
            expect(section.Get.content()).toBeNull()
        })

        it('should expand when header is clicked', async () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: false })
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
        })

        it('should render content when expanded', async () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: false })
            await section.Do.toggle()
            expect(section.Get.content()).not.toBeNull()
        })

        it('should collapse when header is clicked again', async () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: false })
            await section.Do.toggle()
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(false)
        })

        it('should start open when defaultOpen is true', () => {
            const section = Set.section({ title: 'Details', expandable: true, defaultOpen: true })
            expect(section.Get.isOpen()).toBe(true)
            expect(section.Get.content()).not.toBeNull()
        })
    })
})
