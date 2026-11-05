import { screen } from '@testing-library/react'
import { NavTestUtils as TestNav } from './Nav.spec.utils'
import { NavMocks } from './Nav.mocks'
import type { MenuItem } from '../Nav.types'
import '@testing-library/jest-dom'

const { menuItems, menuProps } = NavMocks

describe('NavMenu', () => {
    describe('Rendering', () => {
        it('should render all menu items as links', () => {
            TestNav.Set.mockMenu(menuProps)

            const links = screen.getAllByRole('link')
            expect(links).toHaveLength(3)
        })

        it('should render each item label', () => {
            TestNav.Set.mockMenu(menuProps)

            expect(screen.getByText('Home')).toBeInTheDocument()
            expect(screen.getByText('About')).toBeInTheDocument()
            expect(screen.getByText('Projects')).toBeInTheDocument()
        })

        it('should point to the correct paths', () => {
            TestNav.Set.mockMenu(menuProps)

            const links = screen.getAllByRole('link')
            expect(links[0]).toHaveAttribute('href', '/')
            expect(links[1]).toHaveAttribute('href', '/about')
            expect(links[2]).toHaveAttribute('href', '/projects')
        })
    })

    describe('Active highlighting', () => {
        it('should apply the "active" class to the current page item', () => {
            TestNav.Set.mockMenu({ ...menuProps, pageName: 'About' })

            const aboutItem = screen.getByText('About').closest('li')
            expect(aboutItem).toHaveClass('active')
        })

        it('should not apply the "active" class to non-current items', () => {
            TestNav.Set.mockMenu({ ...menuProps, pageName: 'About' })

            const homeItem = screen.getByText('Home').closest('li')
            expect(homeItem).not.toHaveClass('active')
        })
    })

    describe('Loading state', () => {
        it('should render an empty nav when isLoading is true', () => {
            TestNav.Set.mockMenu({ ...menuProps, isLoading: true })

            expect(screen.queryByText('Home')).not.toBeInTheDocument()
            expect(screen.queryByText('About')).not.toBeInTheDocument()
        })

        it('should render items when isLoading is false', () => {
            TestNav.Set.mockMenu({ ...menuProps, isLoading: false })

            expect(screen.getByText('Home')).toBeInTheDocument()
        })
    })

    describe('Interactions', () => {
        it('should call onItemClick with the clicked item', async () => {
            const onItemClick = vi.fn()
            TestNav.Set.mockMenu({ ...menuProps, onItemClick })

            await TestNav().Do.clickLink('About')

            expect(onItemClick).toHaveBeenCalledWith(menuItems[1])
        })

        it('should render a submenu toggle and call onSubmenuToggle when clicked', async () => {
            const itemsWithToggle: MenuItem[] = [
                ...menuItems,
                { label: 'toggle', showSubmenuToggle: true },
            ]
            const onSubmenuToggle = vi.fn()
            TestNav.Set.mockMenu({
                ...menuProps,
                items: itemsWithToggle,
                onSubmenuToggle,
            })

            const toggle = screen.getByLabelText('Toggle Submenu Visibility')
            expect(toggle).toBeInTheDocument()

            await TestNav().Do.toggle('Toggle Submenu Visibility')

            expect(onSubmenuToggle).toHaveBeenCalled()
        })
    })

    describe('Images', () =>
        it('should render an image when renderImage is provided and the item has an image', () => {
            const itemsWithImage: MenuItem[] = [{ label: 'Home', path: '/', image: 'home-icon' }]
            const renderImage = vi.fn((name: string) => <img src={`/${name}.png`} alt={name} />)

            TestNav.Set.mockMenu({
                ...menuProps,
                items: itemsWithImage,
                renderImage,
            })

            expect(renderImage).toHaveBeenCalledWith('home-icon')
            expect(screen.getByAltText('home-icon')).toBeInTheDocument()
        }))

    describe('Submenu chevrons', () =>
        it('should render a chevron-down for items with submenu', () => {
            const itemsWithSub: MenuItem[] = [
                {
                    label: 'Projects',
                    path: '/projects',
                    submenu: [{ label: 'Sub1', path: '/sub1' }],
                },
            ]

            const { container } = TestNav.Set.mockMenu({
                ...menuProps,
                items: itemsWithSub,
            })

            expect(container.querySelector('.chevron')).toBeInTheDocument()
        }))
})
