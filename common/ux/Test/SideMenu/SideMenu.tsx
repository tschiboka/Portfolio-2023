import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SideMenu as SideMenuComponent } from '../../SideMenu/SideMenu'
import type { SideMenuProps } from '../../SideMenu/SideMenu.types'

export const SideMenu = {
    Get: {
        aside: () => screen.getByRole('complementary'),
        items: () => document.querySelectorAll('.SideMenu__item'),
        item: (title: string) => screen.getByTitle(title),
        badge: () => document.querySelector('.SideMenu__badge'),
        badges: () => document.querySelectorAll('.SideMenu__badge'),
        closeButton: () => screen.getByTitle('Close Menu'),
        highlighted: () => document.querySelector('.SideMenu__item--highlighted'),
    },

    Query: {
        aside: () => screen.queryByRole('complementary'),
        closeButton: () => screen.queryByTitle('Close Menu'),
        badge: () => document.querySelector('.SideMenu__badge'),
        highlighted: () => document.querySelector('.SideMenu__item--highlighted'),
    },

    Click: {
        item: async (title: string) => {
            const user = userEvent.setup()
            await user.click(SideMenu.Get.item(title))
            return user
        },
        close: async () => {
            const user = userEvent.setup()
            await user.click(SideMenu.Get.closeButton())
            return user
        },
    },

    Set: {
        mock: (props: SideMenuProps) => render(<SideMenuComponent {...props} />),
    },
}
