import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { SessionContext } from '../../../../src/context/SessionContext/Session.context'
import { AppContextProvider } from '../../../../src/context/AppContext/App.context'
import { PageSetupOptions } from './Page.types'
import { mockDefaultQueryOptions, mockDefaultSessionContext } from './Page.mocks'
import { Table } from '../Table/Table'
import { ApiRoute } from '../../../../src/routing/ApiRoutes'
import { server } from '../Server'

const createQueryClient = () => new QueryClient({ defaultOptions: mockDefaultQueryOptions })

const resolvePath = (path: string | ApiRoute) => (typeof path === 'string' ? path : path.path)

const resolveElement = (options: PageSetupOptions) => {
    if (options.children) return options.children
    if (typeof options.path !== 'string') return options.path.element
    return React.createElement(React.Fragment)
}

const withPageProviders = (options: PageSetupOptions) => {
    const queryClient = createQueryClient()
    const path = resolvePath(options.path)
    const { route = [path], session, appContext } = options
    const sessionValue = { ...mockDefaultSessionContext, ...session }

    const Providers = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <SessionContext.Provider value={sessionValue}>
                <AppContextProvider initialState={appContext}>
                    <MemoryRouter initialEntries={route}>{children}</MemoryRouter>
                </AppContextProvider>
            </SessionContext.Provider>
        </QueryClientProvider>
    )

    return Providers
}

export const Page = {
    render: (options: PageSetupOptions) => {
        if (options.handlers?.length) server.use(...options.handlers)
        options.beforeRender?.()
        const Wrapper = withPageProviders(options)
        const ui = resolveElement(options)
        return render(ui, { wrapper: Wrapper, ...options.renderOptions })
    },
    setup: (options: PageSetupOptions) => {
        const view = Page.render(options)
        const user = userEvent.setup()

        return {
            view,
            user,
            Table,
        }
    },
    Set: {
        handlers: (...handlers: Parameters<typeof server.use>) => {
            server.use(...handlers)
        },
    },
}
