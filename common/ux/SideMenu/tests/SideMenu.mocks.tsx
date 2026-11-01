import type { SideMenuItem, SideMenuProps } from '../SideMenu.types'

const items: SideMenuItem[] = [
    { icon: <span data-testid="icon-home" />, label: 'Home' },
    { icon: <span data-testid="icon-settings" />, label: 'Settings', onClick: vi.fn() },
    {
        icon: <span data-testid="icon-notifications" />,
        label: 'Notifications',
        highlighted: true,
        badge: <span>3</span>,
    },
]

const defaultProps: SideMenuProps = { items }

export const SideMenuMocks = { defaultProps }
