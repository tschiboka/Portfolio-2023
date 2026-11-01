import { BrowserHooks } from '@common-utils'
import { Test } from '@common-ux/Test'
import type { ContentNavigatorProps } from '../ContentNavigator.types'

const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()
const scrollIntoView = vi.fn()

vi.spyOn(BrowserHooks, 'useIsVisible').mockImplementation((elements: Element[]) =>
    elements.map((element) => ({ element, isVisible: true })),
)

vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({ observe, unobserve, disconnect })),
)

Element.prototype.scrollIntoView = scrollIntoView

type Overrides = Omit<ContentNavigatorProps, 'children'>

const Set = {
    navigator: (overrides: Overrides = {}) =>
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
    empty: (overrides: Overrides = {}) =>
        Test.ContentNavigator.Set.mock({
            ariaLabel: overrides.ariaLabel ?? 'TOC',
            children: <p>No headings here</p>,
            ...overrides,
        }),
    noTocAttr: (overrides: Overrides = {}) =>
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

export const ContentNavigatorTestUtils = { Set, scrollIntoView }
