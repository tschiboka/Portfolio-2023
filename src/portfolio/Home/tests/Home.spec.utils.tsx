import { PageSideMenuMockHandlers } from '@shared-components/PageSideMenu/tests'
import { Test } from '@shared-components/Screen/tests'
import { Home } from '../Home'

export const HomeTestUtils = {
    render: () =>
        Test.Screen.Do.render({
            path: '/',
            children: <Home pageName="home" />,
            handlers: [...PageSideMenuMockHandlers.Defaults, PageSideMenuMockHandlers.Likes.Post],
        }),
}
