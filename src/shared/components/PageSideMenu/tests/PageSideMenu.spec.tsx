import { screen, waitFor } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { PageSideMenuMocks } from './PageSideMenu.mocks'
import { PageSideMenuMockHandlers } from './PageSideMenu.mockHandlers'
import { PageSideMenuTestUtils } from './PageSideMenu.spec.utils'
import { Test } from '../../Screen/tests'

const { likesWithCount, visitsWithCount } = PageSideMenuMocks

describe('PageSideMenu', () => {
    beforeEach(() => vi.clearAllMocks())

    describe('Layout', () => {
        it('should render the side menu', () => {
            PageSideMenuTestUtils.render()
            expect(PageSideMenuTestUtils.sideMenu()).toBeDefined()
        })

        it('should render all menu items', () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()
            expect(menu.Get.item('Share')).toBeInTheDocument()
            expect(menu.Get.item('Views')).toBeInTheDocument()
            expect(menu.Get.item('Like')).toBeInTheDocument()
            expect(menu.Get.item('Go to the Top of the Page')).toBeInTheDocument()
        })

        it('should render the close button', () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()
            expect(menu.Get.closeButton()).toBeInTheDocument()
        })

        it('should not show share menu by default', () => {
            PageSideMenuTestUtils.render()
            expect(document.querySelector('.ShareMenu')).not.toBeInTheDocument()
        })
    })

    describe('Likes and visits', () => {
        it('should fetch and display likes count', async () => {
            PageSideMenuTestUtils.render()
            Test.Screen.Set.handlers(
                PageSideMenuMockHandlers.Likes.Get.updateResponse((builder) =>
                    builder.modify(likesWithCount),
                ),
            )

            const menu = PageSideMenuTestUtils.sideMenu()
            await waitFor(() => expect(menu.Get.badge()).toBeInTheDocument())
        })

        it('should fetch and display visits count', async () => {
            PageSideMenuTestUtils.render()
            Test.Screen.Set.handlers(
                PageSideMenuMockHandlers.Visits.Get.updateResponse((builder) =>
                    builder.modify(visitsWithCount),
                ),
            )

            const menu = PageSideMenuTestUtils.sideMenu()
            await waitFor(() => expect(menu.Get.badge()).toBeInTheDocument())
        })

        it('should not show badge when likes and visits are zero', async () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()
            await waitFor(() => expect(menu.Get.badges().length).toBe(0))
        })
    })

    describe('Share menu', () => {
        it('should show share menu when Share item is clicked', async () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()
            await menu.Do.clickItem('Share')

            expect(document.querySelector('.ShareMenu')).toBeInTheDocument()
        })

        it('should hide share menu when Share item is clicked again', async () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()

            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).toBeInTheDocument()

            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).not.toBeInTheDocument()
        })
    })

    describe('Like interaction', () => {
        it('should highlight Like item after clicking', async () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()
            await menu.Do.clickItem('Like')
            await waitFor(() => expect(menu.Get.highlighted()).toBeInTheDocument())
        })

        it('should show like count badge after clicking', async () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()

            Test.Screen.Set.handlers(
                PageSideMenuMockHandlers.Likes.Get.updateResponse((builder) =>
                    builder.modify(likesWithCount),
                ),
            )
            await menu.Do.clickItem('Like')
            await waitFor(() => expect(menu.Get.badge()).toBeInTheDocument())
        })

        it('should not highlight Like item before clicking', () => {
            PageSideMenuTestUtils.render()
            const menu = PageSideMenuTestUtils.sideMenu()

            expect(menu.Get.highlighted()).toBeNull()
        })
    })
})

describe('Close menu', () => {
    it('should hide the side menu when close button is clicked', async () => {
        PageSideMenuTestUtils.render()
        const menu = PageSideMenuTestUtils.sideMenu()
        await menu.Do.close()

        await waitFor(() => expect(screen.queryByRole('complementary')).not.toBeInTheDocument())
    })

    it('should show reopen button when side menu is closed', async () => {
        PageSideMenuTestUtils.render()
        const menu = PageSideMenuTestUtils.sideMenu()
        await menu.Do.close()

        await waitFor(() =>
            expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument(),
        )
    })

    it('should reopen the side menu when reopen button is clicked', async () => {
        PageSideMenuTestUtils.render()
        const menu = PageSideMenuTestUtils.sideMenu()
        await menu.Do.close()
        await waitFor(() => expect(screen.queryByRole('complementary')).not.toBeInTheDocument())
        await Accessor.user.click(screen.getByRole('button', { name: 'Open Menu' }))
        await waitFor(() => expect(screen.getByRole('complementary')).toBeInTheDocument())
    })

    it('should hide reopen button when side menu is reopened', async () => {
        PageSideMenuTestUtils.render()
        const menu = PageSideMenuTestUtils.sideMenu()
        await menu.Do.close()

        await waitFor(() =>
            expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument(),
        )

        await Accessor.user.click(screen.getByRole('button', { name: 'Open Menu' }))

        await waitFor(() =>
            expect(screen.queryByRole('button', { name: 'Open Menu' })).not.toBeInTheDocument(),
        )
    })
})

describe('Loading state', () =>
    it('should not show loading indicator', () => {
        PageSideMenuTestUtils.render()
        expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
    }))
