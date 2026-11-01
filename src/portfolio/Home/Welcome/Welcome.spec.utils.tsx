import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { AppProvider } from '@shared-context'
import { Welcome } from './Welcome'

export const WelcomeTestUtils = {
    render: () =>
        render(
            <MemoryRouter>
                <AppProvider>
                    <Welcome />
                </AppProvider>
            </MemoryRouter>,
        ),
}
