import { render, screen } from '@testing-library/react'
import { Accessor } from '../Accessor/Accessor'
import { SideMenu as SideMenuComponent } from '../../SideMenu/SideMenu'
import type { SideMenuProps } from '../../SideMenu/SideMenu.types'

class SideMenuAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            items: () => this.element.querySelectorAll('.SideMenu__item'),
            item: (title: string) => this.scope.getByTitle(title),
            badge: () => this.element.querySelector('.SideMenu__badge'),
            badges: () => this.element.querySelectorAll('.SideMenu__badge'),
            closeButton: () => this.scope.getByTitle('Close Menu'),
            highlighted: () => this.element.querySelector('.SideMenu__item--highlighted'),
        }
    }

    get Do() {
        return {
            ...super.Do,
            clickItem: async (title: string) => {
                await Accessor.user.click(this.Get.item(title))
            },
            close: async () => {
                await Accessor.user.click(this.Get.closeButton())
            },
        }
    }
}

// Set is static (renders the component), Get/Do are instance-level (require a rendered element)
export const SideMenu = Object.assign(
    (label?: string): SideMenuAccessor => {
        const element = label
            ? screen.getByRole('complementary', { name: label })
            : screen.getByRole('complementary')
        return new SideMenuAccessor(element, label ? `SideMenu('${label}')` : 'SideMenu()')
    },
    {
        Set: {
            mock: (props: SideMenuProps) => render(<SideMenuComponent {...props} />),
        },
    },
)
