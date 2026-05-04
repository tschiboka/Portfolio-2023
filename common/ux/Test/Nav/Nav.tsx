import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppContextProvider } from '../../../../src/context/AppContext/App.context'
import { AppContextValues } from '../../../../src/context/AppContext/AppContext.types'
import { SessionContext } from '../../../../src/context/SessionContext/Session.context'
import { Nav as NavComponent } from '../../Nav/Nav'
import { NavMenu as NavMenuComponent } from '../../Nav/NavMenu'
import type { NavProps } from '../../Nav/Nav.types'
import type { NavMenuProps } from '../../Nav/NavMenu'

const mockSessionValue = {
    session: undefined,
    isAuthLoading: false,
    isAuthenticated: false,
    setSession: vi.fn(),
}

export const Nav = {
    Get: {
        header: () => screen.getByRole('banner'),
        linksList: () => document.querySelector('.nav_links'),
        burger: (title: string) => screen.getByTitle(title),
        text: (text: string | RegExp) => screen.getByText(text),
    },

    Query: {
        header: () => screen.queryByRole('banner'),
        linksList: () => document.querySelector('.nav_links'),
        text: (text: string | RegExp) => screen.queryByText(text),
    },

    Click: {
        burger: async (title: string) => {
            const user = userEvent.setup()
            await user.click(Nav.Get.burger(title))
            return user
        },
        text: async (text: string | RegExp) => {
            const user = userEvent.setup()
            await user.click(Nav.Get.text(text))
            return user
        },
    },

    Set: {
        mock: (props: NavProps, appContext?: Partial<AppContextValues>) =>
            render(
                <AppContextProvider initialState={appContext}>
                    <NavComponent {...props} />
                </AppContextProvider>,
            ),
        mockMenu: (props: NavMenuProps, appContext?: Partial<AppContextValues>) =>
            render(
                <SessionContext.Provider value={mockSessionValue}>
                    <AppContextProvider initialState={appContext}>
                        <MemoryRouter>
                            <NavMenuComponent {...props} />
                        </MemoryRouter>
                    </AppContextProvider>
                </SessionContext.Provider>,
            ),
    },
}
