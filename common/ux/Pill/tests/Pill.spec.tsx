import { render, screen } from '@testing-library/react'
import { Pill } from '../Pill'

describe('Pill', () => {
    it('should render the label', () => {
        render(<Pill label="Active" />)
        expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('should default to accent color', () => {
        render(<Pill label="Default" />)
        const pill = screen.getByText('Default')
        expect(pill).toHaveClass('Pill', 'Pill--accent')
    })

    it('should apply the specified color', () => {
        render(<Pill label="Error" color="error" />)
        const pill = screen.getByText('Error')
        expect(pill).toHaveClass('Pill', 'Pill--error')
    })

    it('should render with ariaLabel', () => {
        render(<Pill label="Status" ariaLabel="status pill" />)
        expect(screen.getByLabelText('status pill')).toBeInTheDocument()
    })

    it('should apply className', () => {
        render(<Pill label="Custom" className="my-pill" />)
        expect(screen.getByText('Custom')).toHaveClass('my-pill')
    })

    it('should merge custom style', () => {
        render(<Pill label="Styled" style={{ margin: '4px' }} />)
        expect(screen.getByText('Styled').style.margin).toBe('4px')
    })

    it.each([
        ['accent'],
        ['error'],
        ['success'],
        ['yellow'],
        ['orange'],
        ['purple'],
        ['gray'],
    ] as const)('should apply %s color class', (color) => {
        render(<Pill label={color} color={color} />)
        expect(screen.getByText(color)).toHaveClass('Pill', `Pill--${color}`)
    })
})
