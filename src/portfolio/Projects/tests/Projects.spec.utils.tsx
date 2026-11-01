import { screen, waitFor, within } from '@testing-library/react'
import { PageSideMenuMockHandlers } from '@shared-components/PageSideMenu/tests'
import { Test } from '@shared-components/Screen/tests'
import { Projects } from '../Projects'

const render = async () => {
    Test.Screen.Do.render({
        path: '/projects',
        children: <Projects pageName="projects" path="/projects" />,
        handlers: [...PageSideMenuMockHandlers.Defaults],
    })
    await waitFor(() => expect(Test.LoadingIndicator.Has.isLoading()).toBe(false))
}

const expandFilterSection = async () => {
    await render()
    const section = Test.Section.byTitle(/Filter Projects/)
    await section.Do.toggle()
    return section
}

const expandTypeSection = async () => {
    await render()
    const filterSection = Test.Section.byTitle(/Filter Projects/)
    await filterSection.Do.toggle()
    const typeSection = Test.Section('More filters')
    await typeSection.Do.toggle()
    const typeScope = within(screen.getByRole('region', { name: 'More filters' }))
    return { filterSection, typeSection, typeScope }
}

export const ProjectsTestUtils = { render, expandFilterSection, expandTypeSection }
