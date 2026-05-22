import { screen } from '@testing-library/react'
import { Browser } from '@common/utils/Browser'
import { Test } from '@common/ux/Test'

// Mock useIsVisible — return all elements as visible by default
let mockVisibility: { element: Element; isVisible: boolean }[] = []
vi.spyOn(Browser, 'useIsVisible').mockImplementation((elements: Element[]) => {
    mockVisibility = elements.map((element) => ({ element, isVisible: true }))
    return mockVisibility
})

// Mock IntersectionObserver (jsdom doesn't have it)
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()
vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
    })),
)

// scrollIntoView is not available in jsdom
const mockScrollIntoView = vi.fn()
Element.prototype.scrollIntoView = mockScrollIntoView

const Set = {
    navigator: (overrides: { depth?: number; showNavigator?: boolean; ariaLabel?: string } = {}) =>
        Test.ContentNavigator.Set.mock({
            ariaLabel: overrides.ariaLabel ?? 'TOC',
            children: (
                <>
                    <h1 data-toc="">Introduction</h1>
                    <p>Intro content</p>
                    <h2 data-toc="">Getting Started</h2>
                    <p>Getting started content</p>
                    <h2 data-toc="">Advanced Usage</h2>
                    <p>Advanced content</p>
                    <h3 data-toc="">Configuration</h3>
                    <p>Config content</p>
                </>
            ),
            ...overrides,
        }),
    empty: (overrides: { ariaLabel?: string } = {}) =>
        Test.ContentNavigator.Set.mock({
            ariaLabel: overrides.ariaLabel ?? 'TOC',
            children: <p>No headings here</p>,
            ...overrides,
        }),
    noTocAttr: (overrides: { ariaLabel?: string } = {}) =>
        Test.ContentNavigator.Set.mock({
            ariaLabel: overrides.ariaLabel ?? 'TOC',
            children: (
                <>
                    <h1>No data-toc</h1>
                    <h2>Also no data-toc</h2>
                </>
            ),
            ...overrides,
        }),
}

describe('ContentNavigator', () => {
    describe('rendering', () => {
        it('should render the nav element', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.tagName()).toBe('NAV')
        })

        it('should render the title "On this page"', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.title()).toHaveTextContent('On this page')
        })

        it('should render a link for each heading with data-toc', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.links()).toHaveLength(4)
        })

        it('should render link text matching heading content', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            const links = navigator.Get.links()
            expect(links[0]).toHaveTextContent('Introduction')
            expect(links[1]).toHaveTextContent('Getting Started')
            expect(links[2]).toHaveTextContent('Advanced Usage')
            expect(links[3]).toHaveTextContent('Configuration')
        })

        it('should render the close button', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.closeButton()).toBeInTheDocument()
        })

        it('should not render the open button when nav is open', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.openButton()).not.toBeInTheDocument()
        })

        it('should render the SVG tree', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            const treeSvg = navigator.Get.className()
                ? document.querySelector('.ContentNavigator__tree-svg')
                : null
            expect(treeSvg).toBeInTheDocument()
        })

        it('should render content alongside nav', () => {
            Set.navigator()
            expect(screen.getByText('Intro content')).toBeInTheDocument()
            expect(screen.getByText('Getting started content')).toBeInTheDocument()
        })
    })

    describe('empty content', () => {
        it('should render no links when there are no headings', () => {
            Set.empty()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.links()).toHaveLength(0)
        })

        it('should not render the open button when there are no headings', () => {
            Set.empty()
            Test.ContentNavigator('TOC')
            expect(screen.queryByLabelText('Open table of contents')).not.toBeInTheDocument()
        })
    })

    describe('data-toc filtering', () => {
        it('should not include headings without data-toc attribute', () => {
            Set.noTocAttr()
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.links()).toHaveLength(0)
        })
    })

    describe('showNavigator=false', () => {
        it('should not render the nav element', () => {
            Set.navigator({ showNavigator: false })
            expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
        })

        it('should still render content', () => {
            Set.navigator({ showNavigator: false })
            expect(screen.getByText('Intro content')).toBeInTheDocument()
        })
    })

    describe('depth', () => {
        it('should only include headings up to the specified depth', () => {
            Set.navigator({ depth: 2 })
            const navigator = Test.ContentNavigator('TOC')
            const links = navigator.Get.links()
            // depth=2 → h1 + h2 only, no h3
            expect(links).toHaveLength(3)
            expect(links[0]).toHaveTextContent('Introduction')
            expect(links[1]).toHaveTextContent('Getting Started')
            expect(links[2]).toHaveTextContent('Advanced Usage')
        })

        it('should include all levels when depth covers them', () => {
            Set.navigator({ depth: 3 })
            const navigator = Test.ContentNavigator('TOC')
            expect(navigator.Get.links()).toHaveLength(4)
        })
    })

    describe('auto-generated IDs', () => {
        it('should generate slug IDs for headings without IDs', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            const links = navigator.Get.links()
            expect(links[0].getAttribute('href')).toBe('#introduction')
            expect(links[1].getAttribute('href')).toBe('#getting-started')
            expect(links[2].getAttribute('href')).toBe('#advanced-usage')
            expect(links[3].getAttribute('href')).toBe('#configuration')
        })
    })

    describe('active state', () => {
        it('should render data-active attribute on all links', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            const links = navigator.Get.links()
            // Every link should have the data-active attribute (either "true" or "false")
            Array.from(links).forEach((link) => {
                expect(link.hasAttribute('data-active')).toBe(true)
            })
        })
    })

    describe('close / open toggle', () => {
        it('should hide the nav when close button is clicked', async () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')

            await navigator.Do.close()
            expect(navigator.Get.isHidden()).toBe(true)
        })

        it('should show the open button after closing', async () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')

            await navigator.Do.close()
            expect(navigator.Get.openButton()).toBeInTheDocument()
        })

        it('should re-open the nav when open button is clicked', async () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')

            await navigator.Do.close()
            expect(navigator.Get.isHidden()).toBe(true)

            await navigator.Do.open()
            expect(navigator.Get.isHidden()).toBe(false)
        })

        it('should hide the open button after reopening', async () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')

            await navigator.Do.close()
            await navigator.Do.open()
            expect(navigator.Get.openButton()).not.toBeInTheDocument()
        })
    })

    describe('link interaction', () => {
        it('should call scrollIntoView when a link is clicked', async () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')

            await navigator.Do.clickLink(1)
            expect(mockScrollIntoView).toHaveBeenCalled()
        })
    })

    describe('indentation', () => {
        it('should indent deeper headings with paddingInlineStart', () => {
            Set.navigator()
            const navigator = Test.ContentNavigator('TOC')
            const links = navigator.Get.links()

            // h1 = base level → 0 padding
            expect((links[0] as HTMLElement).style.paddingInlineStart).toBe('0px')
            // h2 → 1 level deeper → 16px
            expect((links[1] as HTMLElement).style.paddingInlineStart).toBe('16px')
            // h3 → 2 levels deeper → 32px
            expect((links[3] as HTMLElement).style.paddingInlineStart).toBe('32px')
        })
    })
})
