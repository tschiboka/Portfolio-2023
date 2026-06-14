import { render } from '@testing-library/react'
import { CounterBadge } from '../CounterBadge'

describe('CounterBadge', () => {
    describe('Layout', () => {
        it('should render the count text', () => {
            render(<CounterBadge count={42} />)
            const badge = document.querySelector('.CounterBadge')
            expect(badge).toBeInTheDocument()
            expect(badge?.textContent).toBe('42')
        })

        it('should format large numbers using Counter.format', () => {
            render(<CounterBadge count={1500} />)
            const badge = document.querySelector('.CounterBadge')
            expect(badge?.textContent).toBe('1.5K')
        })

        it('should render nothing when count is 0', () => {
            render(<CounterBadge count={0} />)
            expect(document.querySelector('.CounterBadge')).not.toBeInTheDocument()
        })

        it('should render nothing when count is negative', () => {
            render(<CounterBadge count={-5} />)
            expect(document.querySelector('.CounterBadge')).not.toBeInTheDocument()
        })

        it('should apply custom className', () => {
            render(<CounterBadge count={7} className="custom-class" />)
            const badge = document.querySelector('.CounterBadge')
            expect(badge).toHaveClass('custom-class')
        })
    })
})
