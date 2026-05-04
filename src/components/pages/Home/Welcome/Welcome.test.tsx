import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppContextProvider } from '../../../../context/AppContext/App.context'
import Welcome from './Welcome'

function renderComponent() {
    render(
        <MemoryRouter>
            <AppContextProvider>
                <Welcome />
            </AppContextProvider>
        </MemoryRouter>,
    )
}

describe('Welcome', () => {
    test('Should Render a Headshot Image', () => {
        renderComponent()

        const image = screen.getByRole('img', { name: /headshot/i })
        expect(image).toBeInTheDocument()
        expect(image).toHaveClass('headshot')
    })

    test('Should Render an Element with Name', () => {
        renderComponent()

        const name = screen.getByText(/tivadar debnar/i)
        expect(name).toBeInTheDocument()
    })

    test('Should Render a Title Element', () => {
        renderComponent()

        const title = screen.getByText(/web developer/i)
        expect(title).toBeInTheDocument()
    })
})
