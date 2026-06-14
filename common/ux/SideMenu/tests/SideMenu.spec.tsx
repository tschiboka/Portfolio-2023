import '@testing-library/jest-dom'
import { Test, Accessor } from '../../Test'
import { CounterBadge } from '../../CounterBadge/CounterBadge'
import type { SideMenuItem, SideMenuProps } from '../SideMenu.types'

const mockItems: SideMenuItem[] = [
    { icon: <span data-testid="icon-home" />, label: 'Home' },
    { icon: <span data-testid="icon-settings" />, label: 'Settings', onClick: vi.fn() },
    {
        icon: <span data-testid="icon-notifications" />,
        label: 'Notifications',
        highlighted: true,
        badge: <span>3</span>,
    },
]

const defaultProps: SideMenuProps = { items: mockItems }

describe('SideMenu', () => {
    describe('Visibility', () => {
        it('renders the aside element when visible (default)', () => {
            Test.SideMenu.Set.mock(defaultProps)
            expect(Test.SideMenu().Get.tagName()).toBe('ASIDE')
        })

        it('returns null when visible is false', () => {
            Test.SideMenu.Set.mock({ ...defaultProps, visible: false })
            expect(Accessor.screen.queryByRole('complementary')).not.toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('uses default aria-label "Side menu" when not specified', () => {
            Test.SideMenu.Set.mock(defaultProps)
            expect(Test.SideMenu().Get.attribute('aria-label')).toBe('Side menu')
        })

        it('applies custom aria-label', () => {
            Test.SideMenu.Set.mock({ ...defaultProps, ariaLabel: 'Tools' })
            expect(Test.SideMenu('Tools').Get.attribute('aria-label')).toBe('Tools')
        })

        it('sets title attribute on each item', () => {
            Test.SideMenu.Set.mock(defaultProps)
            expect(Test.SideMenu().Has.item('Home')).toBe(true)
            expect(Test.SideMenu().Has.item('Settings')).toBe(true)
            expect(Test.SideMenu().Has.item('Notifications')).toBe(true)
        })
    })

    describe('Styling', () => {
        it('applies custom className alongside SideMenu class', () => {
            Test.SideMenu.Set.mock({ ...defaultProps, className: 'CustomSide' })
            const menu = Test.SideMenu()

            expect(menu.Get.className()).toContain('SideMenu')
            expect(menu.Get.className()).toContain('CustomSide')
        })

        it('applies inline style', () => {
            Test.SideMenu.Set.mock({ ...defaultProps, style: { width: '60px' } })
            expect(Test.SideMenu().Get.style().width).toBe('60px')
        })

        it('applies highlighted class to highlighted items', () => {
            Test.SideMenu.Set.mock(defaultProps)
            expect(Test.SideMenu().Has.highlighted()).toBe(true)
        })
    })

    describe('Content', () => {
        it('renders icons for each item', () => {
            Test.SideMenu.Set.mock(defaultProps)

            expect(Accessor.screen.getByTestId('icon-home')).toBeInTheDocument()
            expect(Accessor.screen.getByTestId('icon-settings')).toBeInTheDocument()
            expect(Accessor.screen.getByTestId('icon-notifications')).toBeInTheDocument()
        })

        it('renders badge when item has a badge', () => {
            Test.SideMenu.Set.mock(defaultProps)
            const menu = Test.SideMenu()

            expect(menu.Has.badge()).toBe(true)
            expect(menu.Get.badge()).toHaveTextContent('3')
        })

        it('does not render badge when item has no badge', () => {
            const noBadgeItems: SideMenuItem[] = [{ icon: <span />, label: 'Home' }]
            Test.SideMenu.Set.mock({ items: noBadgeItems })

            expect(Test.SideMenu().Has.badge()).toBe(false)
        })

        it('renders CounterBadge when CounterBadge is used as badge', () => {
            const items: SideMenuItem[] = [
                { icon: <span />, label: 'Views', badge: <CounterBadge count={42} /> },
            ]
            Test.SideMenu.Set.mock({ items })

            const badge = Test.CounterBadge()
            expect(badge).not.toBeNull()
            expect(badge!.Get.text()).toBe('42')
        })
    })

    describe('Close button', () => {
        it('renders close button when onClose is provided', () => {
            const onClose = vi.fn()
            Test.SideMenu.Set.mock({ ...defaultProps, onClose })
            expect(Test.SideMenu().Has.closeButton()).toBe(true)
        })

        it('does not render close button when onClose is not provided', () => {
            Test.SideMenu.Set.mock(defaultProps)
            expect(Test.SideMenu().Has.closeButton()).toBe(false)
        })

        it('calls onClose when close button is clicked', async () => {
            const onClose = vi.fn()
            Test.SideMenu.Set.mock({ ...defaultProps, onClose })

            await Test.SideMenu().Do.close()
            expect(onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('Item interactions', () => {
        it('calls onClick when an item is clicked', async () => {
            const onClick = vi.fn()
            const items: SideMenuItem[] = [{ icon: <span />, label: 'Files', onClick }]
            Test.SideMenu.Set.mock({ items })

            await Test.SideMenu().Do.clickItem('Files')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not throw when clicking an item without onClick', async () => {
            const items: SideMenuItem[] = [{ icon: <span />, label: 'Files' }]
            Test.SideMenu.Set.mock({ items })
            await expect(Test.SideMenu().Do.clickItem('Files')).resolves.not.toThrow()
        })
    })
})
