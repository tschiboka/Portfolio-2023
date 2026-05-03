import { Maybe } from 'monet'
import { MenuItem, SubmenuState } from './Nav.types'
import SantaHat from '../../../src/assets/images/projects/xmas/santa_hat.png'

export const isArticle = (path: string | undefined): boolean => /^\/blog\//.test(path || '')

export const isActive = (label: string, pageName: string) =>
    label.toLowerCase() === pageName.toLowerCase() ? 'active' : ''

export const isHighlighted = (item: MenuItem, pageName: string, submenu?: SubmenuState) =>
    Maybe.fromNull(submenu)
        .map((sub) => (sub?.parentLabel === item?.label ? 'active' : ''))
        .orSome(!submenu ? isActive(item.label, pageName) : '')

export const portfolioMenu: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: '', showSubmenuToggle: true },
]

export const apiMenu: MenuItem[] = [
    { label: 'Home', path: '/api/index' },
    { label: 'Xmas', path: '/projects/xmas2025', allowedFeatures: ['xmas2025'], image: 'xmas_hat' },
    {
        label: 'Dashboard',
        submenu: [
            { label: 'Stats', path: '/api/stats', parent: 'Dashboard' },
            {
                label: 'Record',
                submenu: [
                    { label: 'View records', path: '/api/view-records', parent: 'Record' },
                    { label: 'Add records', path: '/api/add-records', parent: 'Record' },
                    { label: 'Update records', path: '/api/update-records', parent: 'Record' },
                ],
                parent: 'Dashboard',
            },
            { label: 'Remote', path: '/api/remote', parent: 'Dashboard' },
        ],
        allowCapabilities: ['admin'],
    },
    {
        label: 'Manage',
        submenu: [
            { label: 'Tasks', path: '/api/tasks', parent: 'Manage' },
            { label: 'Activities', path: '/api/activities', parent: 'Manage' },
            { label: 'Events', path: '/api/events', parent: 'Manage' },
            { label: 'Categories', path: '/api/categories', parent: 'Manage' },
        ],
        allowCapabilities: ['admin'],
    },
    {
        label: 'Settings',
        submenu: [
            { label: 'User', path: '/api/user', parent: 'Settings', allowCapabilities: ['admin'] },
            {
                label: 'Admin',
                path: '/api/admin',
                parent: 'Settings',
                allowCapabilities: ['admin'],
            },
        ],
        allowCapabilities: ['admin'],
    },
    { label: 'Logout', path: '/api/logout' },
    { label: '', showSubmenuToggle: true },
]

export const getMenuItemImage = (imageName: string) => {
    switch (imageName) {
        case 'xmas_hat':
            return <img className="xmas-hat" src={SantaHat} alt="Xmas Hat" />
        default:
            return null
    }
}

const collectMenuGroups = (menu: MenuItem[]): MenuItem[][] => {
    const groups: MenuItem[][] = [menu]
    for (const item of menu) {
        if (item.submenu) groups.push(...collectMenuGroups(item.submenu))
    }
    return groups
}

export const apiMenuGroups: MenuItem[][] = collectMenuGroups(apiMenu)
export const portfolioMenuGroups: MenuItem[][] = collectMenuGroups(portfolioMenu)
