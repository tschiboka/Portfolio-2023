import { MenuItem } from '@common/ux/Nav/Nav.types'
import { collectMenuGroups } from '@common/ux/Nav/Nav.utils'
import SantaHat from '../../assets/images/projects/xmas/santa_hat.png'

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
    {
        label: 'Projects',
        submenu: [
            { label: 'UX Stories', path: '/api/ux-stories', parent: 'Projects' },
            {
                label: 'Word Duel Arena',
                submenu: [
                    {
                        label: 'Level Creator',
                        path: '/projects/wda-level-creator',
                        parent: 'Projects',
                    },
                    { label: 'Game', path: '/projects/word-duel-arena', parent: 'Projects' },
                ],
                parent: 'Projects',
            },
            {
                label: 'Guitar',
                submenu: [
                    {
                        label: 'Chords',
                        path: 'https://tschiboka.com/projects/adrika-clock-2/index.html',
                        parent: 'Projects',
                    },
                    {
                        label: 'RiffMaster',
                        path: '',
                        parent: 'Projects',
                    },
                ],
                parent: 'Projects',
            },
            {
                submenu: [
                    {
                        label: 'Xmas 2025',
                        path: '/projects/xmas2025',
                        parent: 'Old Projects',
                        image: 'xmas_hat',
                    },
                    {
                        label: 'Adrika Clock',
                        path: 'https://tschiboka.com/projects/adrika-clock/index.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Alien Text',
                        path: 'https://tschiboka.com/projects/alien-character-generator/index.html',
                        parent: 'Old Projects',
                    },
                ],
                label: 'Old Projects',
                parent: 'Projects',
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

export const apiMenuGroups: MenuItem[][] = collectMenuGroups(apiMenu)
export const portfolioMenuGroups: MenuItem[][] = collectMenuGroups(portfolioMenu)
