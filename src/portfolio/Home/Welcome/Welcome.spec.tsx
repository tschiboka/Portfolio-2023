import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { AppProvider } from '@shared-context'
import { Welcome } from './Welcome'

function renderComponent() {
    render(
        <MemoryRouter>
            <AppProvider>
                <Welcome />
            </AppProvider>
        </MemoryRouter>,
    )
}

describe('Welcome', () => {
    it('should render a headshot image', () => {
        renderComponent()

        const image = screen.getByRole('img', { name: /headshot/i })
        expect(image).toBeInTheDocument()
        expect(image).toHaveClass('headshot')
    })

    it('should render an element with name', () => {
        renderComponent()

        const name = screen.getByText(/tivadar debnar/i)
        expect(name).toBeInTheDocument()
    })

    it('should render a title element', () => {
        renderComponent()

        const title = screen.getByText(/web developer/i)
        expect(title).toBeInTheDocument()
    })
})
