import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { SessionContext } from '../../../../src/context/SessionContext/Session.context'
import { AppContextProvider } from '../../../../src/context/AppContext/App.context'
import { PageSetupOptions } from './Page.types'
import type { Buildable } from '../Server/RequestBuilder'
import { mockDefaultQueryOptions, mockDefaultSessionContext, mockNavigate } from './Page.mocks'
import { ApiRoute } from '../../../../src/routing/ApiRoutes'
import { server } from '../Server'
import { TestError } from '../Accessor/Accessor'
import { isString, isNonEmpty } from '@common/utils'
import type { Optional } from '@common/utils'

const createQueryClient = () => new QueryClient({ defaultOptions: mockDefaultQueryOptions })

const resolvePath = (path: string | ApiRoute) => (isString(path) ? path : path.path)

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
                    <MemoryRouter
                        initialEntries={route}
                        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
                    >
                        {children}
                    </MemoryRouter>
                </AppContextProvider>
            </SessionContext.Provider>
        </QueryClientProvider>
    )

    return Providers
}

export const Page = {
    Get: {
        navigatedTo: () => mockNavigate.mock.lastCall?.[0] as Optional<string>,
    },
    Has: {
        navigated: () => isNonEmpty(mockNavigate.mock.calls),
    },
    Wait: {
        navigatedTo: async (path: string) => {
            await waitFor(() => {
                if (!mockNavigate.mock.calls.some(([p]: unknown[]) => p === path)) {
                    const actual = mockNavigate.mock.lastCall?.[0] as Optional<string>
                    throw TestError.navigation(path, actual)
                }
            })
        },
    },
    Set: {
        handlers: (...handlers: Buildable[]) => {
            server.use(...handlers.map((h) => h.build()))
        },
    },
    Do: {
        render: (options: PageSetupOptions) => {
            if (options.handlers?.length) {
                server.use(...options.handlers.map((h) => h.build()))
            }
            options.beforeRender?.()
            const Wrapper = withPageProviders(options)
            const ui = resolveElement(options)
            return render(ui, { wrapper: Wrapper, ...options.renderOptions })
        },
    },
}
