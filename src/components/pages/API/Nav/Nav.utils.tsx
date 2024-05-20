import { Maybe } from 'monet'
import { Menu, Submenu } from '.'

export const manageRecordsMenu: Array<Menu> = [
    {
        label: 'View records',
        path: '/api/view-records',
    },
    {
        label: 'Add records',
        path: '/api/add-records',
    },
    {
        label: 'Update records',
        path: '/api/update-records',
    },
]

export const recordsMenu: Array<Menu> = [
    {
        label: 'Stats',
        path: '/api/stats',
    },
    {
        label: 'Record',
        submenu: manageRecordsMenu,
    },
    {
        label: 'Remote',
        path: '/api/remote',
    },
]

export const manageMenu: Array<Menu> = [
    {
        label: 'Tasks',
        path: '/api/tasks',
    },
    {
        label: 'Activities',
        path: '/api/activities',
    },
    {
        label: 'Events',
        path: '/api/events',
    },
    {
        label: 'Topics',
        path: '/api/topics',
    },
]

export const settingsMenu: Array<Menu> = [
    {
        label: 'User',
        path: '/api/user',
    },
    {
        label: 'Admin',
        path: '/api/admin',
    },
]

export const menu: Array<Menu> = [
    {
        label: 'Home',
        path: '/api/index',
    },
    {
        label: 'Records',
        submenu: recordsMenu,
    },
    {
        label: 'Manager',
        submenu: manageMenu,
    },
    {
        label: 'Settings',
        submenu: settingsMenu,
    },
    {
        label: 'Logout',
        path: '/api/logout',
    },
]

export const isHighlighted = (
    item: Menu,
    pageName: string,
    submenu?: Submenu,
) =>
    Maybe.fromNull(submenu)
        .map((sub) => (sub?.parentLabel === item?.label ? 'active' : ''))
        .orSome(pageName === item.label && !submenu ? 'active' : '')
