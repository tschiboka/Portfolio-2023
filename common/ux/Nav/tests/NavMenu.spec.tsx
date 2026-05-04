import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { Nav as TestNav } from '../../Test/Nav/Nav'
import type { MenuItem } from '../Nav.types'
import type { NavMenuProps } from '../NavMenu'

const baseItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
]

const defaultProps: NavMenuProps = {
    items: baseItems,
    pageName: 'Home',
}

describe('NavMenu', () => {
    describe('Rendering', () => {
        it('renders all menu items as links', () => {
            TestNav.Set.mockMenu(defaultProps)

            const links = screen.getAllByRole('link')
            expect(links).toHaveLength(3)
        })

        it('renders each item label', () => {
            TestNav.Set.mockMenu(defaultProps)

            expect(screen.getByText('Home')).toBeInTheDocument()
            expect(screen.getByText('About')).toBeInTheDocument()
            expect(screen.getByText('Projects')).toBeInTheDocument()
        })

        it('links point to the correct paths', () => {
            TestNav.Set.mockMenu(defaultProps)

            const links = screen.getAllByRole('link')
            expect(links[0]).toHaveAttribute('href', '/')
            expect(links[1]).toHaveAttribute('href', '/about')
            expect(links[2]).toHaveAttribute('href', '/projects')
        })
    })

    describe('Active highlighting', () => {
        it('applies "active" class to the current page item', () => {
            TestNav.Set.mockMenu({ ...defaultProps, pageName: 'About' })

            const aboutItem = screen.getByText('About').closest('li')
            expect(aboutItem).toHaveClass('active')
        })

        it('does not apply "active" class to non-current items', () => {
            TestNav.Set.mockMenu({ ...defaultProps, pageName: 'About' })

            const homeItem = screen.getByText('Home').closest('li')
            expect(homeItem).not.toHaveClass('active')
        })
    })

    describe('Loading state', () => {
        it('renders empty nav when isLoading is true', () => {
            TestNav.Set.mockMenu({ ...defaultProps, isLoading: true })

            expect(screen.queryByText('Home')).not.toBeInTheDocument()
            expect(screen.queryByText('About')).not.toBeInTheDocument()
        })

        it('renders items when isLoading is false', () => {
            TestNav.Set.mockMenu({ ...defaultProps, isLoading: false })

            expect(screen.getByText('Home')).toBeInTheDocument()
        })
    })

    describe('Interactions', () => {
        it('calls onItemClick with the clicked item', async () => {
            const onItemClick = vi.fn()
            TestNav.Set.mockMenu({ ...defaultProps, onItemClick })

            await TestNav.Click.text('About')

            expect(onItemClick).toHaveBeenCalledWith(baseItems[1])
        })

        it('renders submenu toggle and calls onSubmenuToggle when clicked', async () => {
            const itemsWithToggle: MenuItem[] = [
                ...baseItems,
                { label: 'toggle', showSubmenuToggle: true },
            ]
            const onSubmenuToggle = vi.fn()
            TestNav.Set.mockMenu({
                ...defaultProps,
                items: itemsWithToggle,
                onSubmenuToggle,
            })

            const toggle = screen.getByTitle('Toggle Submenu Visibility')
            expect(toggle).toBeInTheDocument()

            await TestNav.Click.text('Toggle Submenu Visibility')

            expect(onSubmenuToggle).toHaveBeenCalled()
        })
    })

    describe('Images', () => {
        it('renders image when renderImage is provided and item has image', () => {
            const itemsWithImage: MenuItem[] = [{ label: 'Home', path: '/', image: 'home-icon' }]
            const renderImage = vi.fn((name: string) => <img src={`/${name}.png`} alt={name} />)

            TestNav.Set.mockMenu({
                ...defaultProps,
                items: itemsWithImage,
                renderImage,
            })

            expect(renderImage).toHaveBeenCalledWith('home-icon')
            expect(screen.getByAltText('home-icon')).toBeInTheDocument()
        })
    })

    describe('Submenu chevrons', () => {
        it('renders a chevron-down for items with submenu', () => {
            const itemsWithSub: MenuItem[] = [
                {
                    label: 'Projects',
                    path: '/projects',
                    submenu: [{ label: 'Sub1', path: '/sub1' }],
                },
            ]

            const { container } = TestNav.Set.mockMenu({
                ...defaultProps,
                items: itemsWithSub,
            })

            expect(container.querySelector('.chevron')).toBeInTheDocument()
        })
    })
})
