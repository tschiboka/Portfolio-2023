import { screen, waitFor, within } from '@testing-library/react'
import { Test, Accessor } from '@common/ux/Test'
import { Projects } from '../Projects'
import { pageSideMenuHandlers } from '../../../sharedComponents/PageSideMenu/tests/PageSideMenu.mockHandles'

const setupProjects = async () => {
    Test.Page.Do.render({
        path: '/projects',
        children: <Projects pageName="projects" path="/projects" />,
        handlers: [...pageSideMenuHandlers],
    })
    await waitFor(() => {
        expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
    })
}

describe('Projects', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the heading', async () => {
            await setupProjects()
            expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
        })

        it('should render the description paragraph', async () => {
            await setupProjects()
            expect(
                screen.getByText(/This page is a mix of personal and academic projects/i),
            ).toBeInTheDocument()
        })

        it('should render the filter section', async () => {
            await setupProjects()
            expect(screen.getByRole('region', { name: /Filter Projects/ })).toBeInTheDocument()
        })
    })

    describe('Project cards', () => {
        it('should render all project cards by default', async () => {
            await setupProjects()
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(16)
        })

        it('should render a specific project title', async () => {
            await setupProjects()
            expect(screen.getByText('Word Duel Arena')).toBeInTheDocument()
        })

        it('should render the year next to the project title', async () => {
            await setupProjects()
            const heading = screen.getByRole('heading', { name: /Word Duel Arena/ })
            expect(within(heading).getByText(/- 2026/)).toBeInTheDocument()
        })

        it('should render the type pill on each project', async () => {
            await setupProjects()
            const featuredPills = screen.getAllByText('Featured')
            expect(featuredPills.length).toBeGreaterThan(0)
        })

        it('should render badges for each project', async () => {
            await setupProjects()
            expect(screen.getAllByText('React').length).toBeGreaterThan(0)
            expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
        })

        it('should render live site links for projects with URLs', async () => {
            await setupProjects()
            expect(screen.getAllByText(/tschiboka\.com/).length).toBeGreaterThan(0)
        })
    })

    describe('Filter section expand/collapse', () => {
        it('should be collapsed by default', async () => {
            await setupProjects()
            const section = Test.Section.byTitle(/Filter Projects/)
            expect(section.Get.isOpen()).toBe(false)
        })

        it('should expand when the section header is clicked', async () => {
            await setupProjects()
            const section = Test.Section.byTitle(/Filter Projects/)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
        })

        it('should show language pills when expanded', async () => {
            await setupProjects()
            const section = Test.Section.byTitle(/Filter Projects/)
            await section.Do.toggle()
            expect(screen.getByText('Frontend')).toBeInTheDocument()
            expect(screen.getByText('Backend')).toBeInTheDocument()
        })

        it('should collapse when the section header is clicked again', async () => {
            await setupProjects()
            const section = Test.Section.byTitle(/Filter Projects/)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(true)
            await section.Do.toggle()
            expect(section.Get.isOpen()).toBe(false)
        })
    })

    describe('Language filter', () => {
        const expandFilterSection = async () => {
            await setupProjects()
            const section = Test.Section.byTitle(/Filter Projects/)
            await section.Do.toggle()
            return section
        }

        it('should filter projects when a language pill is clicked', async () => {
            await expandFilterSection()
            await Test.Pill.ByLabel('Filter by React').Do.click()

            const cards = screen.getAllByRole('heading', { level: 3 })

            expect(cards.length).toBeGreaterThan(3) // Word Duel Arena, UX Library, Pocket Tutor
        })

        it('should show only matching projects after language filter', async () => {
            await expandFilterSection()
            await Test.Pill.ByLabel('Filter by React').Do.click()
            expect(screen.getByText('Word Duel Arena')).toBeInTheDocument()
            expect(screen.queryByText('RiffMaster Guitar Studio')).not.toBeInTheDocument()
        })

        it('should restore all projects when the language pill is clicked again', async () => {
            await expandFilterSection()
            await Test.Pill.ByLabel('Filter by React').Do.click()
            await Test.Pill.ByLabel('Filter by React').Do.click()
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(16)
        })

        it('should show the clear button when a language filter is active', async () => {
            await expandFilterSection()
            await Test.Pill.ByLabel('Filter by React').Do.click()
            expect(screen.getByText('Clear')).toBeInTheDocument()
        })
    })

    describe('Type filter', () => {
        const expandTypeSection = async () => {
            await setupProjects()
            const filterSection = Test.Section.byTitle(/Filter Projects/)
            await filterSection.Do.toggle()
            const typeSection = Test.Section('More filters')
            await typeSection.Do.toggle()
            const typeScope = within(screen.getByRole('region', { name: 'More filters' }))
            return { filterSection, typeSection, typeScope }
        }

        it('should filter featured projects when Featured pill is clicked', async () => {
            const { typeScope } = await expandTypeSection()
            await Accessor.user.click(typeScope.getByText('Featured'))
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(3) // 3 featured projects
        })

        it('should filter in progress projects when In progress pill is clicked', async () => {
            const { typeScope } = await expandTypeSection()
            await Accessor.user.click(typeScope.getByText('In progress'))
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(2) // 2 in progress projects
        })

        it('should filter archived projects when Archived pill is clicked', async () => {
            const { typeScope } = await expandTypeSection()
            await Accessor.user.click(typeScope.getByText('Archived'))
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(7) // 7 archived projects
        })

        it('should show all projects when All pill is clicked after a filter', async () => {
            const { typeScope } = await expandTypeSection()
            await Accessor.user.click(typeScope.getByText('Featured'))
            await Accessor.user.click(typeScope.getByText('All'))
            const cards = screen.getAllByRole('heading', { level: 3 })
            expect(cards.length).toBe(16)
        })
    })

    describe('Clear filters', () => {
        it('should reset all filters and show all projects when clear is clicked', async () => {
            await setupProjects()
            const filterSection = Test.Section.byTitle(/Filter Projects/)
            await filterSection.Do.toggle()

            // Apply language filter
            await Test.Pill.ByLabel('Filter by React').Do.click()
            expect(screen.getByText('Clear')).toBeInTheDocument()

            // Apply type filter
            const typeSection = Test.Section('More filters')
            await typeSection.Do.toggle()
            const typeScope = within(screen.getByRole('region', { name: 'More filters' }))
            await Accessor.user.click(typeScope.getByText('Featured'))

            // Clear all
            screen.getByText('Clear').click()

            await waitFor(() => {
                const cards = screen.getAllByRole('heading', { level: 3 })
                expect(cards.length).toBe(16)
            })
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator', async () => {
            await setupProjects()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
