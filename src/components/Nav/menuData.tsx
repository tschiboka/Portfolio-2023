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
                        path: 'https://tschiboka.com/projects/riffmaster/src/pages/chords.html',
                        parent: 'Projects',
                    },
                    {
                        label: 'RiffMaster',
                        path: 'https://tschiboka.com/projects/riffmaster/index.html',
                        parent: 'Projects',
                    },
                ],
                parent: 'Projects',
            },
            {
                submenu: [
                    {
                        label: 'Adrika Clock',
                        path: 'https://tschiboka.com/projects/adrika_clock/index.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Alien Chars',
                        path: 'https://tschiboka.com/projects/alien_chars/index.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Crayons',
                        path: 'https://tschiboka.com/projects/crayons/crayons.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Patterns',
                        path: 'https://tschiboka.com/projects/pattern_generator/index.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Pocket Tutor',
                        path: 'https://tschiboka.com/projects/pocket_tutor/index.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Simon',
                        path: 'https://tschiboka.com/projects/simon/simon.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Tic Tac Toe',
                        path: 'https://tschiboka.com/projects/tictactoe/tictactoe.html',
                        parent: 'Old Projects',
                    },
                    {
                        label: 'Xmas 2025',
                        path: '/projects/xmas2025',
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
