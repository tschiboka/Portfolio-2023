import { Set } from './Link.spec.utils'

describe('Link', () => {
    describe('as route (internal)', () => {
        it('should render a link element', () => {
            const link = Set.route()
            expect(link.Get.tagName()).toBe('A')
        })

        it('should render children', () => {
            const link = Set.route({ children: 'Go home' })
            expect(link.Get.textContent()).toBe('Go home')
        })

        it('should set the route path as href', () => {
            const link = Set.route({ to: '/about' })
            expect(link.Get.href()).toContain('/about')
        })

        it('should not set target or rel', () => {
            const link = Set.route({ to: '/about' })
            expect(link.Get.target()).toBeNull()
            expect(link.Get.rel()).toBeNull()
        })

        it('should apply ariaLabel', () => {
            const link = Set.route({ ariaLabel: 'Home page' })
            expect(link.Get.attribute('aria-label')).toBe('Home page')
        })

        it('should apply className', () => {
            const link = Set.route({ className: 'nav-link' })
            expect(link.Get.className()).toContain('nav-link')
            expect(link.Get.className()).toContain('link')
        })

        it('should apply title', () => {
            const link = Set.route({ title: 'Navigate home' })
            expect(link.Get.attribute('title')).toBe('Navigate home')
        })

        it('should apply custom style', () => {
            const link = Set.route({ style: { color: 'red' } })
            expect(link.Get.style().color).toBe('red')
        })
    })

    describe('as anchor (external)', () => {
        it('should render an anchor element', () => {
            const link = Set.anchor()
            expect(link.Get.tagName()).toBe('A')
        })

        it('should render children', () => {
            const link = Set.anchor({ children: 'GitHub' })
            expect(link.Get.textContent()).toBe('GitHub')
        })

        it('should set href', () => {
            const link = Set.anchor({ href: 'https://github.com' })
            expect(link.Get.href()).toContain('https://github.com')
        })

        it('should auto-add target and rel for external URLs', () => {
            const link = Set.anchor({ href: 'https://github.com' })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(link.Get.isExternal()).toBe(true)
            expect(link.Get.target()).toBe('_blank')
            expect(link.Get.rel()).toBe('noopener noreferrer')
        })

        it('should not add target and rel for non-http URLs', () => {
            const link = Set.anchor({ href: 'mailto:test@example.com' })
            expect(link.Get.target()).toBeNull()
            expect(link.Get.rel()).toBeNull()
        })

        it('should not add target and rel for hash links', () => {
            const link = Set.anchor({ href: '#section' })
            expect(link.Get.target()).toBeNull()
            expect(link.Get.rel()).toBeNull()
        })

        it('should support download attribute', () => {
            const link = Set.anchor({ href: '/file.pdf', download: true })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(link.Get.hasDownload()).toBe(true)
        })

        it('should apply ariaLabel', () => {
            const link = Set.anchor({ ariaLabel: 'External site' })
            expect(link.Get.attribute('aria-label')).toBe('External site')
        })

        it('should apply className', () => {
            const link = Set.anchor({ className: 'social' })
            expect(link.Get.className()).toContain('social')
            expect(link.Get.className()).toContain('link')
        })

        it('should always include base link class', () => {
            const link = Set.anchor()
            expect(link.Get.className()).toContain('link')
        })
    })
})
