import '@testing-library/jest-dom'
import { SideMenu as TestSideMenu } from '../../Test/SideMenu/SideMenu'
import type { SideMenuItem, SideMenuProps } from '../SideMenu.types'

const mockItems: SideMenuItem[] = [
    { icon: <span data-testid="icon-home">🏠</span>, label: 'Home' },
    { icon: <span data-testid="icon-settings">⚙️</span>, label: 'Settings', onClick: vi.fn() },
    {
        icon: <span data-testid="icon-notifications">🔔</span>,
        label: 'Notifications',
        highlighted: true,
        badge: <span>3</span>,
    },
]

const defaultProps: SideMenuProps = { items: mockItems }

describe('SideMenu', () => {
    describe('Visibility', () => {
        it('renders the aside element when visible (default)', () => {
            TestSideMenu.Set.mock(defaultProps)

            expect(TestSideMenu.Get.aside()).toBeInTheDocument()
        })

        it('returns null when visible is false', () => {
            TestSideMenu.Set.mock({ ...defaultProps, visible: false })

            expect(TestSideMenu.Query.aside()).not.toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('uses default aria-label "Side menu" when not specified', () => {
            TestSideMenu.Set.mock(defaultProps)

            expect(TestSideMenu.Get.aside()).toHaveAttribute('aria-label', 'Side menu')
        })

        it('applies custom aria-label', () => {
            TestSideMenu.Set.mock({ ...defaultProps, ariaLabel: 'Tools' })

            expect(TestSideMenu.Get.aside()).toHaveAttribute('aria-label', 'Tools')
        })

        it('sets title attribute on each item', () => {
            TestSideMenu.Set.mock(defaultProps)

            expect(TestSideMenu.Get.item('Home')).toBeInTheDocument()
            expect(TestSideMenu.Get.item('Settings')).toBeInTheDocument()
            expect(TestSideMenu.Get.item('Notifications')).toBeInTheDocument()
        })
    })

    describe('Styling', () => {
        it('applies custom className alongside SideMenu class', () => {
            TestSideMenu.Set.mock({ ...defaultProps, className: 'CustomSide' })

            const aside = TestSideMenu.Get.aside()
            expect(aside).toHaveClass('SideMenu')
            expect(aside).toHaveClass('CustomSide')
        })

        it('applies inline style', () => {
            TestSideMenu.Set.mock({ ...defaultProps, style: { width: '60px' } })

            expect(TestSideMenu.Get.aside()).toHaveStyle({ width: '60px' })
        })

        it('applies highlighted class to highlighted items', () => {
            TestSideMenu.Set.mock(defaultProps)

            expect(TestSideMenu.Get.highlighted()).toBeInTheDocument()
            expect(TestSideMenu.Get.item('Notifications').closest('.SideMenu__item')).toHaveClass(
                'SideMenu__item--highlighted',
            )
        })
    })

    describe('Content', () => {
        it('renders icons for each item', () => {
            const { getByTestId } = TestSideMenu.Set.mock(defaultProps)

            expect(getByTestId('icon-home')).toBeInTheDocument()
            expect(getByTestId('icon-settings')).toBeInTheDocument()
            expect(getByTestId('icon-notifications')).toBeInTheDocument()
        })

        it('renders badge when item has a badge', () => {
            TestSideMenu.Set.mock(defaultProps)

            const badge = TestSideMenu.Get.badge()
            expect(badge).toBeInTheDocument()
            expect(badge).toHaveTextContent('3')
        })

        it('does not render badge when item has no badge', () => {
            const noBadgeItems: SideMenuItem[] = [{ icon: <span>🏠</span>, label: 'Home' }]
            TestSideMenu.Set.mock({ items: noBadgeItems })

            expect(TestSideMenu.Query.badge()).not.toBeInTheDocument()
        })
    })

    describe('Close button', () => {
        it('renders close button when onClose is provided', () => {
            const onClose = vi.fn()
            TestSideMenu.Set.mock({ ...defaultProps, onClose })

            expect(TestSideMenu.Get.closeButton()).toBeInTheDocument()
        })

        it('does not render close button when onClose is not provided', () => {
            TestSideMenu.Set.mock(defaultProps)

            expect(TestSideMenu.Query.closeButton()).not.toBeInTheDocument()
        })

        it('calls onClose when close button is clicked', async () => {
            const onClose = vi.fn()
            TestSideMenu.Set.mock({ ...defaultProps, onClose })

            await TestSideMenu.Click.close()

            expect(onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('Item interactions', () => {
        it('calls onClick when an item is clicked', async () => {
            const onClick = vi.fn()
            const items: SideMenuItem[] = [{ icon: <span>📁</span>, label: 'Files', onClick }]
            TestSideMenu.Set.mock({ items })

            await TestSideMenu.Click.item('Files')

            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not throw when clicking an item without onClick', async () => {
            const items: SideMenuItem[] = [{ icon: <span>📁</span>, label: 'Files' }]
            TestSideMenu.Set.mock({ items })

            await expect(TestSideMenu.Click.item('Files')).resolves.not.toThrow()
        })
    })
})
