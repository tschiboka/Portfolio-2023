import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Accessor } from '../Accessor/Accessor'
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

class NavAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            linksList: () => this.element.querySelector('.nav_links'),
            burger: (title: string) => this.scope.getByTitle(title),
        }
    }

    get Do() {
        return {
            ...super.Do,
            toggle: async (title: string) => {
                await Accessor.user.click(this.Get.burger(title))
            },
            clickLink: async (text: string | RegExp) => {
                await Accessor.user.click(this.Get.byText(text))
            },
        }
    }
}

// Set is static (renders the component), Get/Do are instance-level (require a rendered element)
export const Nav = Object.assign(
    (label?: string): NavAccessor => {
        const element = label
            ? Accessor.screen.getByRole('banner', { name: label })
            : Accessor.screen.getByRole('banner')
        return new NavAccessor(element, label ? `Nav('${label}')` : 'Nav()')
    },
    {
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
    },
)
