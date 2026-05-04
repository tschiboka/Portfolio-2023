import '@testing-library/jest-dom'
import { Nav as TestNav } from '../../Test/Nav/Nav'

describe('Nav', () => {
    describe('Visibility', () => {
        it('renders a header element when visible (default)', () => {
            TestNav.Set.mock({ children: <li>Home</li> })

            expect(TestNav.Get.header()).toBeInTheDocument()
        })

        it('returns null when visible is false', () => {
            TestNav.Set.mock({ visible: false, children: <li>Home</li> })

            expect(TestNav.Query.header()).not.toBeInTheDocument()
        })
    })

    describe('Content', () => {
        it('renders children inside the nav_links list', () => {
            TestNav.Set.mock({
                children: (
                    <>
                        <li>Home</li>
                        <li>About</li>
                    </>
                ),
            })

            const linksList = TestNav.Get.linksList()
            expect(linksList).toBeInTheDocument()
            expect(linksList!.querySelectorAll('li')).toHaveLength(2)
        })

        it('renders a custom logo element', () => {
            TestNav.Set.mock({
                children: <li>Home</li>,
                logo: <img src="logo.png" alt="Logo" />,
            })

            expect(TestNav.Get.header().querySelector('img[alt="Logo"]')).toBeInTheDocument()
        })
    })

    describe('Styling', () => {
        it('applies custom className alongside Header class', () => {
            TestNav.Set.mock({
                children: <li>Home</li>,
                className: 'CustomNav',
            })

            const header = TestNav.Get.header()
            expect(header).toHaveClass('Header')
            expect(header).toHaveClass('CustomNav')
        })

        it('sets aria-label on the header', () => {
            TestNav.Set.mock({
                children: <li>Home</li>,
                ariaLabel: 'Main navigation',
            })

            expect(TestNav.Get.header()).toHaveAttribute('aria-label', 'Main navigation')
        })

        it('applies inline style to the header', () => {
            TestNav.Set.mock({
                children: <li>Home</li>,
                style: { backgroundColor: 'red' },
            })

            expect(TestNav.Get.header().style.backgroundColor).toBe('red')
        })
    })

    describe('Burger', () => {
        it('renders the default burger icon when no burger prop is provided', () => {
            TestNav.Set.mock({ children: <li>Home</li> })

            expect(TestNav.Get.burger('Extend Mobile Menu')).toBeInTheDocument()
        })

        it('renders a custom burger element instead of default', () => {
            TestNav.Set.mock({
                children: <li>Home</li>,
                burger: <button title="Custom Burger">☰</button>,
            })

            expect(TestNav.Get.burger('Custom Burger')).toBeInTheDocument()
        })

        it('toggles default burger from open to close icon on click', async () => {
            TestNav.Set.mock({ children: <li>Home</li> })

            await TestNav.Click.burger('Extend Mobile Menu')

            expect(TestNav.Get.burger('Close Mobile Menu')).toBeInTheDocument()
        })

        it('toggles default burger back to open icon on second click', async () => {
            TestNav.Set.mock({ children: <li>Home</li> })

            await TestNav.Click.burger('Extend Mobile Menu')
            await TestNav.Click.burger('Close Mobile Menu')

            expect(TestNav.Get.burger('Extend Mobile Menu')).toBeInTheDocument()
        })
    })
})
