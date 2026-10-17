import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { AppProvider, SessionContext } from '@shared-context'
import { Nav as NavComponent } from '../Nav'
import { NavMenu as NavMenuComponent } from '../components/NavMenu'
import type { AppContextValues } from '@shared-context'
import type { NavMenuProps } from '../components/NavMenu'
import type { NavProps } from '../Nav.types'

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
            burger: (name: string) => this.scope.getByLabelText(name),
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
export const NavTestUtils = Object.assign(
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
                    <AppProvider initialState={appContext}>
                        <NavComponent {...props} />
                    </AppProvider>,
                ),
            mockMenu: (props: NavMenuProps, appContext?: Partial<AppContextValues>) =>
                render(
                    <SessionContext.Provider value={mockSessionValue}>
                        <AppProvider initialState={appContext}>
                            <MemoryRouter>
                                <NavMenuComponent {...props} />
                            </MemoryRouter>
                        </AppProvider>
                    </SessionContext.Provider>,
                ),
        },
    },
)
