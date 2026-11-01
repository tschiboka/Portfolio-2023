import type { MenuItem } from '../Nav.types'
import type { NavMenuProps } from '../components'

const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
]

const menuProps: NavMenuProps = {
    items: menuItems,
    pageName: 'Home',
}

const projectsItem: MenuItem = { label: 'Projects', path: '/projects' }
const aboutItem: MenuItem = { label: 'About', path: '/about' }

export const NavMocks = { menuItems, menuProps, projectsItem, aboutItem }
