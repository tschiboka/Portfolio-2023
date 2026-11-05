import { render, screen } from '@testing-library/react'
import { ContextTestUtils } from './Context.spec.utils'
import { ContextBuilder } from '../index'

const { Provider, Consumer } = ContextTestUtils

describe('ContextBuilder.CreateContext', () => {
    describe('Provider', () => {
        it('should render children', () => {
            render(
                <Provider>
                    <span>child</span>
                </Provider>,
            )
            expect(screen.getByText('child')).toBeInTheDocument()
        })

        it('should provide the initial context when no value is passed', () => {
            render(
                <Provider>
                    <Consumer />
                </Provider>,
            )
            expect(screen.getByTestId('name')).toHaveTextContent('default')
            expect(screen.getByTestId('count')).toHaveTextContent('0')
        })

        it('should provide a custom value when passed', () => {
            render(
                <Provider value={{ name: 'custom', count: 42 }}>
                    <Consumer />
                </Provider>,
            )
            expect(screen.getByTestId('name')).toHaveTextContent('custom')
            expect(screen.getByTestId('count')).toHaveTextContent('42')
        })
    })

    describe('Use hook', () => {
        it('should throw when used outside of Provider', () => {
            // Suppress React error boundary / console.error noise
            const spy = vi.spyOn(console, 'error').mockImplementation(vi.fn())

            expect(() => render(<Consumer />)).toThrow()

            spy.mockRestore()
        })

        it('should return the context value inside Provider', () => {
            render(
                <Provider value={{ name: 'inner', count: 7 }}>
                    <Consumer />
                </Provider>,
            )
            expect(screen.getByTestId('name')).toHaveTextContent('inner')
            expect(screen.getByTestId('count')).toHaveTextContent('7')
        })
    })

    describe('multiple independent contexts', () =>
        it('should not leak between different contexts', () => {
            const ctxA = ContextBuilder.CreateContext('A', { label: 'A' })
            const ctxB = ContextBuilder.CreateContext('B', { label: 'B' })

            const ConsumerA = () => {
                const { label } = ctxA.Use()
                return <span data-testid="a">{label}</span>
            }
            const ConsumerB = () => {
                const { label } = ctxB.Use()
                return <span data-testid="b">{label}</span>
            }

            render(
                <ctxA.Provider>
                    <ctxB.Provider>
                        <ConsumerA />
                        <ConsumerB />
                    </ctxB.Provider>
                </ctxA.Provider>,
            )

            expect(screen.getByTestId('a')).toHaveTextContent('A')
            expect(screen.getByTestId('b')).toHaveTextContent('B')
        }))
})
