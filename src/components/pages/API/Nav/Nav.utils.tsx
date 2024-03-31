import { Menu } from '.'

export const recordsMenu: Array<Menu> = [
    {
        label: 'Stats',
        path: '/api/stats',
    },
    {
        label: 'Record',
        path: '/api/record',
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
