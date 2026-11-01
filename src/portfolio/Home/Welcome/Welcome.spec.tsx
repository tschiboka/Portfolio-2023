import { screen } from '@testing-library/react'
import { WelcomeTestUtils } from './Welcome.spec.utils'

describe('Welcome', () => {
    it('should render a headshot image', () => {
        WelcomeTestUtils.render()

        const image = screen.getByRole('img', { name: /headshot/i })
        expect(image).toBeInTheDocument()
        expect(image).toHaveClass('headshot')
    })

    it('should render an element with name', () => {
        WelcomeTestUtils.render()

        const name = screen.getByText(/tivadar debnar/i)
        expect(name).toBeInTheDocument()
    })

    it('should render a title element', () => {
        WelcomeTestUtils.render()

        const title = screen.getByText(/web developer/i)
        expect(title).toBeInTheDocument()
    })
})
