import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { Accessor } from '@common/ux/Test/Accessor/Accessor'
import Home from '../Home'
import {
    pageSideMenuHandlers,
    handlePostLike,
} from '../../../sharedComponents/PageSideMenu/tests/PageSideMenu.mockHandles'

const setupHome = () => {
    Test.Page.Do.render({
        path: '/',
        children: <Home pageName="home" />,
        handlers: [...pageSideMenuHandlers, handlePostLike],
    })
}

describe('Home', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the Welcome section with a headshot image', () => {
            setupHome()
            expect(screen.getByRole('img', { name: /headshot/i })).toBeInTheDocument()
        })

        it('should render the name', () => {
            setupHome()
            expect(Test.Heading(/Tivadar Debnar/i).Get.textContent()).toBeDefined()
        })

        it('should render the title', () => {
            setupHome()
            expect(Test.Heading(/Tivadar Debnar/i).Get.byText(/Web Developer/i)).toBeInTheDocument()
        })

        it('should render the page side menu', () => {
            setupHome()
            expect(Test.SideMenu('Side menu')).toBeDefined()
        })

        it('should render all side menu items', () => {
            setupHome()
            const menu = Test.SideMenu('Side menu')
            expect(menu.Get.item('Share')).toBeInTheDocument()
            expect(menu.Get.item('Views')).toBeInTheDocument()
            expect(menu.Get.item('Like')).toBeInTheDocument()
            expect(menu.Get.item('Go to the Top of the Page')).toBeInTheDocument()
        })
    })

    describe('Intro section', () => {
        it('should render the greeting heading', () => {
            setupHome()
            expect(Test.Heading("Hello, I'm Tivadar!")).toBeDefined()
        })

        it('should render the "Who is Tivadar?" heading', () => {
            setupHome()
            expect(Test.Heading('Who is Tivadar?')).toBeDefined()
        })

        it('should render the "How can I help you?" heading', () => {
            setupHome()
            expect(Test.Heading('How can I help you?')).toBeDefined()
        })
    })

    describe('Collapsible sections', () => {
        it('should render "How I work" section collapsed by default', () => {
            setupHome()
            expect(Test.Section('How I work').Get.isOpen()).toBe(false)
        })

        it('should render "Looking for a programming buddy?" section collapsed by default', () => {
            setupHome()
            expect(Test.Section('Looking for a programming buddy?').Get.isOpen()).toBe(false)
        })

        it('should render "Just here to get to know me?" section collapsed by default', () => {
            setupHome()
            expect(Test.Section('Just here to get to know me?').Get.isOpen()).toBe(false)
        })

        it('should expand and collapse the "How I work" section', async () => {
            setupHome()
            const section = Test.Section('How I work')
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(false)
        })

        it('should expand and collapse the "Looking for a programming buddy?" section', async () => {
            setupHome()
            const section = Test.Section('Looking for a programming buddy?')
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(false)
        })

        it('should expand and collapse the "Just here to get to know me?" section', async () => {
            setupHome()
            const section = Test.Section('Just here to get to know me?')
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(false)
        })
    })

    describe('"How I work" section content', () => {
        it('should show skills table when expanded', async () => {
            setupHome()
            await Test.Section('How I work').Do.toggle()
            expect(
                screen.getByRole('table', { name: 'Skills and technologies' }),
            ).toBeInTheDocument()
        })

        it('should show contact and download buttons when expanded', async () => {
            setupHome()
            await Test.Section('How I work').Do.toggle()
            expect(Test.Link(/contact tivadar/i)).toBeDefined()
            expect(Test.Link(/download my cv/i)).toBeDefined()
        })
    })

    describe('"Looking for a programming buddy?" section content', () => {
        it('should show Codewars badge when expanded', async () => {
            setupHome()
            await Test.Section('Looking for a programming buddy?').Do.toggle()
            expect(screen.getByAltText('Codewars badge')).toBeInTheDocument()
        })
    })

    describe('Welcome navigation', () => {
        it('should navigate to /api/login when headshot is clicked', async () => {
            setupHome()
            const headshot = new Accessor(
                screen.getByRole('img', { name: /headshot/i }),
                'Headshot',
            )
            await headshot.Do.click()
            expect(Test.Page.Get.navigatedTo()).toBe('./api/login')
        })
    })

    describe('PageSideMenu interactions', () => {
        it('should open and close the share menu', async () => {
            setupHome()
            const menu = Test.SideMenu('Side menu')
            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).toBeInTheDocument()
            await menu.Do.clickItem('Share')
            expect(document.querySelector('.ShareMenu')).not.toBeInTheDocument()
        })

        it('should highlight Like item after clicking', async () => {
            setupHome()
            const menu = Test.SideMenu('Side menu')
            await menu.Do.clickItem('Like')
            await waitFor(() => {
                expect(menu.Get.highlighted()).toBeInTheDocument()
            })
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator', () => {
            setupHome()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
