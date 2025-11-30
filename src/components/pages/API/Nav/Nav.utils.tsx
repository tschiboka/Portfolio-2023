import { Maybe } from 'monet'
import { Menu, Submenu } from '.'
import SantaHat from '../../../../assets/images/projects/xmas/santa_hat.png'

export const getMenuItemImage = (imageName: string) => {
    switch (imageName) {
        case 'xmas_hat':
            return <img className="xmas-hat" src={SantaHat} alt="Xmas Hat" />
        default:
            return null
    }
}

// Third level menues

export const manageRecordsMenu: Array<Menu> = [
    {
        label: 'View records',
        path: '/api/view-records',
        parent: 'Record',
    },
    {
        label: 'Add records',
        path: '/api/add-records',
        parent: 'Record',
    },
    {
        label: 'Update records',
        path: '/api/update-records',
        parent: 'Record',
    },
]

// Second level menues

export const dashboardMenu: Array<Menu> = [
    {
        label: 'Stats',
        path: '/api/stats',
        parent: 'Dashboard',
    },
    {
        label: 'Record',
        submenu: manageRecordsMenu,
        parent: 'Dashboard',
    },
    {
        label: 'Remote',
        path: '/api/remote',
        parent: 'Dashboard',
    },
]

export const manageMenu: Array<Menu> = [
    {
        label: 'Tasks',
        path: '/api/tasks',
        parent: 'Manage',
    },
    {
        label: 'Activities',
        path: '/api/activities',
        parent: 'Manage',
    },
    {
        label: 'Events',
        path: '/api/events',
        parent: 'Manage',
    },
    {
        label: 'Categories',
        path: '/api/categories',
        parent: 'Manage',
    },
]

export const settingsMenu: Array<Menu> = [
    {
        label: 'User',
        path: '/api/user',
        parent: 'Settings',
        allowRoles: ['admin'],
    },
    {
        label: 'Admin',
        path: '/api/admin',
        parent: 'Settings',
        allowRoles: ['admin'],
    },
]

// First level menu

export const menu: Array<Menu> = [
    {
        label: 'Home',
        path: '/api/index',
    },
    {
        label: 'Xmas',
        path: '/projects/xmas2025',
        allowedFeatures: ['xmas2025'],
        image: 'xmas_hat',
    },
    {
        label: 'Dashboard',
        submenu: dashboardMenu,
        allowRoles: ['admin'],
    },
    {
        label: 'Manage',
        submenu: manageMenu,
        allowRoles: ['admin'],
    },
    {
        label: 'Settings',
        submenu: settingsMenu,
        allowRoles: ['admin'],
    },
    {
        label: 'Logout',
        path: '/api/logout',
    },
]

export const menuGroups: Menu[][] = [
    menu,
    settingsMenu,
    manageMenu,
    dashboardMenu,
    manageRecordsMenu,
]

export const isHighlighted = (
    item: Menu,
    pageName: string,
    submenu?: Submenu,
) =>
    Maybe.fromNull(submenu)
        .map((sub) => (sub?.parentLabel === item?.label ? 'active' : ''))
        .orSome(pageName === item.label && !submenu ? 'active' : '')
