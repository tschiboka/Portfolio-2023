import React from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { SessionContext } from '../../../../src/context/SessionContext/Session.context'
import { AppContextProvider } from '../../../../src/context/AppContext/App.context'
import { PageRenderOptions } from './Page.types'
import { mockDefaultQueryOptions, mockDefaultSessionContext } from './Page.mocks'

const createQueryClient = () => new QueryClient({ defaultOptions: mockDefaultQueryOptions })

export const Page = {
    render: (ui: React.ReactElement, options?: PageRenderOptions) => {
        const queryClient = createQueryClient()
        const { route = ['/'], session, appContext, renderOptions } = options ?? {}

        const sessionValue = { ...mockDefaultSessionContext, ...session }

        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <SessionContext.Provider value={sessionValue}>
                    <AppContextProvider initialState={appContext}>
                        <MemoryRouter initialEntries={route}>{children}</MemoryRouter>
                    </AppContextProvider>
                </SessionContext.Provider>
            </QueryClientProvider>
        )

        return render(ui, { wrapper: Wrapper, ...renderOptions })
    },
}
