import { NavUtils } from '../Nav.utils'
import type { MenuItem, SubmenuState } from '../Nav.types'

describe('NavUtils.isArticle', () => {
    it('returns true for a blog path', () => {
        expect(NavUtils.isArticle('/blog/my-article')).toBe(true)
    })

    it('returns true for the blog root', () => {
        expect(NavUtils.isArticle('/blog/')).toBe(true)
    })

    it('returns false for a non-blog path', () => {
        expect(NavUtils.isArticle('/about')).toBe(false)
    })

    it('returns false for undefined', () => {
        expect(NavUtils.isArticle(undefined)).toBe(false)
    })

    it('returns false for an empty string', () => {
        expect(NavUtils.isArticle('')).toBe(false)
    })
})

describe('NavUtils.isActive', () => {
    it('returns "active" when label matches pageName', () => {
        expect(NavUtils.isActive('Home', 'Home')).toBe('active')
    })

    it('is case-insensitive', () => {
        expect(NavUtils.isActive('home', 'Home')).toBe('active')
        expect(NavUtils.isActive('HOME', 'home')).toBe('active')
    })

    it('returns empty string when label does not match', () => {
        expect(NavUtils.isActive('About', 'Home')).toBe('')
    })
})

describe('NavUtils.isHighlighted', () => {
    const item: MenuItem = { label: 'Projects', path: '/projects' }
    const otherItem: MenuItem = { label: 'About', path: '/about' }

    it('returns "active" when submenu parentLabel matches item label', () => {
        const submenu: SubmenuState = {
            parentLabel: 'Projects',
            options: [],
            extended: false,
        }

        expect(NavUtils.isHighlighted(item, 'Home', submenu)).toBe('active')
    })

    it('returns empty string when submenu parentLabel does not match', () => {
        const submenu: SubmenuState = {
            parentLabel: 'Other',
            options: [],
            extended: false,
        }

        expect(NavUtils.isHighlighted(item, 'Home', submenu)).toBe('')
    })

    it('falls back to isActive when no submenu is provided', () => {
        expect(NavUtils.isHighlighted(item, 'Projects')).toBe('active')
        expect(NavUtils.isHighlighted(item, 'Home')).toBe('')
    })

    it('returns empty string for non-matching item when submenu is present', () => {
        const submenu: SubmenuState = {
            parentLabel: 'Projects',
            options: [],
            extended: false,
        }

        expect(NavUtils.isHighlighted(otherItem, 'About', submenu)).toBe('')
    })
})

describe('NavUtils.collectMenuGroups', () => {
    it('returns a single group for a flat menu', () => {
        const menu: MenuItem[] = [
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
        ]

        const groups = NavUtils.collectMenuGroups(menu)
        expect(groups).toHaveLength(1)
        expect(groups[0]).toBe(menu)
    })

    it('collects nested submenu groups recursively', () => {
        const submenu: MenuItem[] = [
            { label: 'Sub1', path: '/sub1' },
            { label: 'Sub2', path: '/sub2' },
        ]
        const menu: MenuItem[] = [
            { label: 'Home', path: '/' },
            { label: 'Projects', submenu },
        ]

        const groups = NavUtils.collectMenuGroups(menu)
        expect(groups).toHaveLength(2)
        expect(groups[0]).toBe(menu)
        expect(groups[1]).toBe(submenu)
    })

    it('collects deeply nested submenu groups', () => {
        const deepSubmenu: MenuItem[] = [{ label: 'Deep', path: '/deep' }]
        const submenu: MenuItem[] = [{ label: 'Sub', submenu: deepSubmenu }]
        const menu: MenuItem[] = [{ label: 'Top', submenu }]

        const groups = NavUtils.collectMenuGroups(menu)
        expect(groups).toHaveLength(3)
        expect(groups[0]).toBe(menu)
        expect(groups[1]).toBe(submenu)
        expect(groups[2]).toBe(deepSubmenu)
    })
})
