import { PageSideMenuMockHandlers } from './PageSideMenu.mockHandlers'
import { PageSideMenu } from '../PageSideMenu'
import { Test } from '../../Screen/tests'

export const PageSideMenuTestUtils = {
    render: () =>
        Test.Screen.Do.render({
            path: '/projects',
            children: <PageSideMenu />,
            handlers: [...PageSideMenuMockHandlers.Defaults, PageSideMenuMockHandlers.Likes.Post],
        }),
    sideMenu: () => Test.SideMenu('Side menu'),
}
