import { screen } from '@testing-library/react'
import { Button } from '@common-ux'
import { NavTestUtils } from './Nav.spec.utils'
import '@testing-library/jest-dom'

const Set = NavTestUtils.Set

describe('Nav', () => {
    describe('Visibility', () => {
        it('should render a header element when visible (default)', () => {
            Set.mock({ children: [<li key="home">Home</li>] })
            expect(NavTestUtils().Has.textContent()).toBe(true)
        })

        it('should return null when visible is false', () => {
            Set.mock({ visible: false, children: [<li key="home">Home</li>] })
            expect(screen.queryByRole('banner')).not.toBeInTheDocument()
        })
    })

    describe('Content', () => {
        it('should render children inside the nav_links list', () => {
            Set.mock({
                children: [<li key="home">Home</li>, <li key="about">About</li>],
            })

            const nav = NavTestUtils()
            const linksList = nav.Get.linksList()
            expect(linksList).toBeInTheDocument()
            expect(linksList!.querySelectorAll('li')).toHaveLength(2)
        })

        it('should render a custom logo element', () => {
            Set.mock({
                children: [<li key="home">Home</li>],
                logo: <img src="logo.png" alt="Logo" />,
            })

            expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument()
        })
    })

    describe('Styling', () => {
        it('should apply custom className alongside the Header class', () => {
            Set.mock({ children: [<li key="home">Home</li>], className: 'CustomNav' })
            const nav = NavTestUtils()
            expect(nav.Get.className()).toContain('Header')
            expect(nav.Get.className()).toContain('CustomNav')
        })

        it('should set aria-label on the header', () => {
            Set.mock({
                children: [<li key="home">Home</li>],
                ariaLabel: 'Main navigation',
            })

            expect(NavTestUtils('Main navigation').Get.attribute('aria-label')).toBe(
                'Main navigation',
            )
        })

        it('should apply inline style to the header', () => {
            Set.mock({
                children: [<li key="home">Home</li>],
                style: { backgroundColor: 'var(--accent)' },
            })

            expect(NavTestUtils().Get.style().backgroundColor).toBe('var(--accent)')
        })
    })

    describe('Burger', () => {
        it('should render the default burger icon when no burger prop is provided', () => {
            Set.mock({ children: [<li key="home">Home</li>] })
            expect(NavTestUtils().Has.burger('Extend Mobile Menu')).toBe(true)
        })

        it('should render a custom burger element instead of the default', () => {
            Set.mock({
                children: [<li key="home">Home</li>],
                burger: <Button ariaLabel="Custom Burger">☰</Button>,
            })

            expect(NavTestUtils().Has.burger('Custom Burger')).toBe(true)
        })

        it('should toggle the default burger from open to close icon on click', async () => {
            Set.mock({ children: [<li key="home">Home</li>] })
            const nav = NavTestUtils()

            await nav.Do.toggle('Extend Mobile Menu')

            expect(nav.Has.burger('Close Mobile Menu')).toBe(true)
        })

        it('should toggle the default burger back to open icon on second click', async () => {
            Set.mock({ children: [<li key="home">Home</li>] })
            const nav = NavTestUtils()

            await nav.Do.toggle('Extend Mobile Menu')
            await nav.Do.toggle('Close Mobile Menu')

            expect(nav.Has.burger('Extend Mobile Menu')).toBe(true)
        })
    })
})
