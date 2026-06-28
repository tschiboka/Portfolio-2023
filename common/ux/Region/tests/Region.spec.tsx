import { Set } from './Region.spec.utils'

describe('Region', () => {
    describe('default variant', () => {
        it('should render children', () => {
            const region = Set.region({ ariaLabel: 'children' })
            expect(region.Get.textContent()).toContain('Region content')
        })

        it('should render as a div by default', () => {
            const region = Set.region({ ariaLabel: 'tag' })
            expect(region.Get.tagName()).toBe('DIV')
        })

        it('should apply ariaLabel', () => {
            const region = Set.region({ ariaLabel: 'Details' })
            expect(region.Get.attribute('aria-label')).toBe('Details')
        })

        it('should apply className', () => {
            const region = Set.region({ ariaLabel: 'cls', className: 'custom' })
            expect(region.Get.className()).toContain('custom')
        })

        it('should apply custom style', () => {
            const region = Set.region({ ariaLabel: 'st', style: { margin: '10px' } })
            expect(region.Get.style().margin).toBe('10px')
        })

        it('should include default variant class', () => {
            const region = Set.region({ ariaLabel: 'def' })
            expect(region.Get.className()).toContain('region--default')
        })

        it('should render a static title when not collapsible', () => {
            const region = Set.region({ ariaLabel: 'Info', title: 'Info' })
            expect(region.Get.title()).toBe('Info')
            expect(region.Get.isCollapsible()).toBe(false)
        })

        it('should always show content when not collapsible', () => {
            const region = Set.region({ ariaLabel: 'Static', title: 'Static' })
            expect(region.Get.content()).not.toBeNull()
        })

        it('should render without a title', () => {
            const region = Set.region({ ariaLabel: 'NoTitle' })
            expect(region.Get.title()).toBeNull()
        })

        it('should render an icon next to the title', () => {
            const region = Set.region({ ariaLabel: 'Icon', title: 'Icon', icon: <span>★</span> })
            expect(region.Get.icon()).not.toBeNull()
        })

        it('should render without an icon by default', () => {
            const region = Set.region({ ariaLabel: 'NoIcon', title: 'NoIcon' })
            expect(region.Get.icon()).toBeNull()
        })
    })

    describe('collapsible', () => {
        it('should render as a section element when collapsible', () => {
            const region = Set.region({ ariaLabel: 'Col', title: 'Col', collapsible: true })
            expect(region.Get.tagName()).toBe('SECTION')
        })

        it('should be collapsed when defaultOpen is false', () => {
            const region = Set.region({
                ariaLabel: 'Closed',
                title: 'Closed',
                collapsible: true,
                defaultOpen: false,
            })
            expect(region.Get.isOpen()).toBe(false)
        })

        it('should not render content when collapsed', () => {
            const region = Set.region({
                ariaLabel: 'Hidden',
                title: 'Hidden',
                collapsible: true,
                defaultOpen: false,
            })
            expect(region.Get.content()).toBeNull()
        })

        it('should expand when header is clicked', async () => {
            const region = Set.region({
                ariaLabel: 'Toggle',
                title: 'Toggle',
                collapsible: true,
                defaultOpen: false,
            })
            await region.Do.toggle()
            expect(region.Get.isOpen()).toBe(true)
        })

        it('should render content when expanded', async () => {
            const region = Set.region({
                ariaLabel: 'Expand',
                title: 'Expand',
                collapsible: true,
                defaultOpen: false,
            })
            await region.Do.toggle()
            expect(region.Get.content()).not.toBeNull()
        })

        it('should collapse when header is clicked again', async () => {
            const region = Set.region({
                ariaLabel: 'Collapse',
                title: 'Collapse',
                collapsible: true,
                defaultOpen: false,
            })
            await region.Do.toggle()
            await region.Do.toggle()
            expect(region.Get.isOpen()).toBe(false)
        })

        it('should start open when defaultOpen is true', () => {
            const region = Set.region({
                ariaLabel: 'Open',
                title: 'Open',
                collapsible: true,
                defaultOpen: true,
            })
            expect(region.Get.isOpen()).toBe(true)
            expect(region.Get.content()).not.toBeNull()
        })
    })

    describe('dialog variant', () => {
        it('should render with role dialog', () => {
            const region = Set.region({ ariaLabel: 'Dialog', variant: 'dialog' })
            expect(region.Get.attribute('role')).toBe('dialog')
        })

        it('should render with aria-label', () => {
            const region = Set.region({ ariaLabel: 'DialogTag', variant: 'dialog' })
            expect(region.Get.attribute('aria-label')).toBe('DialogTag')
        })

        it('should include dialog variant class', () => {
            const region = Set.region({ ariaLabel: 'DialogCls', variant: 'dialog' })
            expect(region.Get.className()).toContain('region--dialog')
        })
    })

    describe('sidebar variant', () => {
        it('should render as an aside element', () => {
            const region = Set.region({ ariaLabel: 'SidebarTag', variant: 'sidebar' })
            expect(region.Get.tagName()).toBe('ASIDE')
        })

        it('should include sidebar variant class', () => {
            const region = Set.region({ ariaLabel: 'SidebarCls', variant: 'sidebar' })
            expect(region.Get.className()).toContain('region--sidebar')
        })
    })

    describe('header variant', () => {
        it('should render as a header element', () => {
            const region = Set.region({ ariaLabel: 'HeaderTag', variant: 'header' })
            expect(region.Get.tagName()).toBe('HEADER')
        })

        it('should include header variant class', () => {
            const region = Set.region({ ariaLabel: 'HeaderCls', variant: 'header' })
            expect(region.Get.className()).toContain('region--header')
        })
    })

    describe('main variant', () => {
        it('should render as a main element', () => {
            const region = Set.region({ ariaLabel: 'MainTag', variant: 'main' })
            expect(region.Get.tagName()).toBe('MAIN')
        })

        it('should include main variant class', () => {
            const region = Set.region({ ariaLabel: 'MainCls', variant: 'main' })
            expect(region.Get.className()).toContain('region--main')
        })
    })
})
