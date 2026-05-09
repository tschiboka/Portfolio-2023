import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { Nav } from '../../Test/Nav/Nav'

const Set = Nav.Set

describe('Nav', () => {
    describe('Visibility', () => {
        it('renders a header element when visible (default)', () => {
            Set.mock({ children: <li>Home</li> })
            expect(Nav().Has.textContent()).toBe(true)
        })

        it('returns null when visible is false', () => {
            Set.mock({ visible: false, children: <li>Home</li> })
            expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        })
    })

    describe('Content', () => {
        it('renders children inside the nav_links list', () => {
            Set.mock({
                children: (
                    <>
                        <li>Home</li>
                        <li>About</li>
                    </>
                ),
            })

            const nav = Nav()
            const linksList = nav.Get.linksList()
            expect(linksList).toBeInTheDocument()
            expect(linksList!.querySelectorAll('li')).toHaveLength(2)
        })

        it('renders a custom logo element', () => {
            Set.mock({
                children: <li>Home</li>,
                logo: <img src="logo.png" alt="Logo" />,
            })

            expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument()
        })
    })

    describe('Styling', () => {
        it('applies custom className alongside Header class', () => {
            Set.mock({ children: <li>Home</li>, className: 'CustomNav' })
            const nav = Nav()
            expect(nav.Get.className()).toContain('Header')
            expect(nav.Get.className()).toContain('CustomNav')
        })

        it('sets aria-label on the header', () => {
            Set.mock({
                children: <li>Home</li>,
                ariaLabel: 'Main navigation',
            })

            expect(Nav('Main navigation').Get.attribute('aria-label')).toBe('Main navigation')
        })

        it('applies inline style to the header', () => {
            Set.mock({
                children: <li>Home</li>,
                style: { backgroundColor: 'red' },
            })

            expect(Nav().Get.style().backgroundColor).toBe('red')
        })
    })

    describe('Burger', () => {
        it('renders the default burger icon when no burger prop is provided', () => {
            Set.mock({ children: <li>Home</li> })
            expect(Nav().Has.burger('Extend Mobile Menu')).toBe(true)
        })

        it('renders a custom burger element instead of default', () => {
            Set.mock({
                children: <li>Home</li>,
                burger: <button title="Custom Burger">☰</button>,
            })

            expect(Nav().Has.burger('Custom Burger')).toBe(true)
        })

        it('toggles default burger from open to close icon on click', async () => {
            Set.mock({ children: <li>Home</li> })
            const nav = Nav()

            await nav.Do.toggle('Extend Mobile Menu')

            expect(nav.Has.burger('Close Mobile Menu')).toBe(true)
        })

        it('toggles default burger back to open icon on second click', async () => {
            Set.mock({ children: <li>Home</li> })
            const nav = Nav()

            await nav.Do.toggle('Extend Mobile Menu')
            await nav.Do.toggle('Close Mobile Menu')

            expect(nav.Has.burger('Extend Mobile Menu')).toBe(true)
        })
    })
})
