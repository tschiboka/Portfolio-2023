import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { PageSideMenu } from '../PageSideMenu'
import {
    pageSideMenuHandlers,
    handleGetLikes,
    handleGetVisits,
    handlePostLike,
} from './PageSideMenu.mockHandles'
import { mockLikesWithCount, mockVisitsWithCount } from './PageSideMenu.mocks'

const setupPageSideMenu = () => {
    Test.Page.Do.render({
        path: '/projects',
        children: <PageSideMenu />,
        handlers: [...pageSideMenuHandlers, handlePostLike],
    })
}

const getSideMenu = () => Test.SideMenu('Side menu')

describe('PageSideMenu', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the side menu', () => {
            setupPageSideMenu()
            expect(getSideMenu()).toBeDefined()
        })

        it('should render all menu items', () => {
            setupPageSideMenu()
            const menu = getSideMenu()
            expect(menu.Get.item('Share')).toBeInTheDocument()
            expect(menu.Get.item('Views')).toBeInTheDocument()
            expect(menu.Get.item('Like')).toBeInTheDocument()
            expect(menu.Get.item('Go to the Top of the Page')).toBeInTheDocument()
        })

        it('should render the close button', () => {
            setupPageSideMenu()
            const menu = getSideMenu()
            expect(menu.Get.closeButton()).toBeInTheDocument()
        })

        it('should not show share menu by default', () => {
            setupPageSideMenu()
            expect(document.querySelector('.ShareMenu')).not.toBeInTheDocument()
        })
    })

    describe('Likes and visits', () => {
        it('should fetch and display likes count', async () => {
            setupPageSideMenu()
            Test.Page.Set.handlers(
                handleGetLikes.updateResponse((builder) => builder.modify(mockLikesWithCount)),
            )

            const menu = getSideMenu()
            await waitFor(() => {
                expect(menu.Get.badge()).toBeInTheDocument()
            })
        })

        it('should fetch and display visits count', async () => {
            setupPageSideMenu()
            Test.Page.Set.handlers(
                handleGetVisits.updateResponse((builder) => builder.modify(mockVisitsWithCount)),
            )

            const menu = getSideMenu()
            await waitFor(() => {
                expect(menu.Get.badge()).toBeInTheDocument()
            })
        })

        it('should not show badge when likes and visits are zero', async () => {
            setupPageSideMenu()
            const menu = getSideMenu()
            await waitFor(() => {
                expect(menu.Get.badges().length).toBe(0)
            })
        })
    })

    describe('Share menu', () => {
        it('should show share menu when Share item is clicked', async () => {
            setupPageSideMenu()
            const menu = getSideMenu()
            await menu.Do.clickItem('Share')

            expect(document.querySelector('.ShareMenu')).toBeInTheDocument()
        })

        it('should hide share menu when Share item is clicked again', async () => {
            setupPageSideMenu()
            const menu = getSideMenu()

            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).toBeInTheDocument()

            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).not.toBeInTheDocument()
        })
    })

    describe('Like interaction', () => {
        it('should highlight Like item after clicking', async () => {
            setupPageSideMenu()
            const menu = getSideMenu()
            await menu.Do.clickItem('Like')

            await waitFor(() => {
                expect(menu.Get.highlighted()).toBeInTheDocument()
            })
        })

        it('should show like count badge after clicking', async () => {
            setupPageSideMenu()
            const menu = getSideMenu()

            Test.Page.Set.handlers(
                handleGetLikes.updateResponse((builder) => builder.modify(mockLikesWithCount)),
            )
            await menu.Do.clickItem('Like')

            await waitFor(() => {
                expect(menu.Get.badge()).toBeInTheDocument()
            })
        })

        it('should not highlight Like item before clicking', () => {
            setupPageSideMenu()
            const menu = getSideMenu()

            expect(menu.Get.highlighted()).toBeNull()
        })
    })
})

describe('Close menu', () => {
    it('should hide the side menu when close button is clicked', async () => {
        setupPageSideMenu()
        const menu = getSideMenu()
        await menu.Do.close()

        await waitFor(() => expect(screen.queryByRole('complementary')).not.toBeInTheDocument())
    })
})

describe('Loading state', () => {
    it('should not show loading indicator', () => {
        setupPageSideMenu()
        expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
    })
})
