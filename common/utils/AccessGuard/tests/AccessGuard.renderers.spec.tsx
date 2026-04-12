import { render, screen, fireEvent } from '@testing-library/react'
import { DisabledRenderer } from '../renderers/DisabledRenderer'
import { HiddenRenderer } from '../renderers/HiddenRenderer'
import { TooltipRenderer } from '../renderers/TooltipRenderer'
import { SoftDisabledRenderer } from '../renderers/SoftDisabledRenderer'

// jsdom does not implement window.scrollTo
window.scrollTo = jest.fn()

// ── HiddenRenderer ───────────────────────────────────────────────────────────

describe('HiddenRenderer', () => {
    it('should render nothing', () => {
        const { container } = render(<HiddenRenderer />)
        expect(container.innerHTML).toBe('')
    })
})

// ── DisabledRenderer ─────────────────────────────────────────────────────────

describe('DisabledRenderer', () => {
    it('should render children', () => {
        render(<DisabledRenderer>Content</DisabledRenderer>)
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should have aria-disabled="true"', () => {
        render(<DisabledRenderer>Content</DisabledRenderer>)
        expect(screen.getByText('Content').closest('[aria-disabled]')).toHaveAttribute(
            'aria-disabled',
            'true',
        )
    })

    it('should have className "access-guard-disabled"', () => {
        render(<DisabledRenderer>Content</DisabledRenderer>)
        expect(screen.getByText('Content').closest('.access-guard-disabled')).toBeInTheDocument()
    })

    it('should set title to reason when provided', () => {
        render(<DisabledRenderer reason="Not allowed">Content</DisabledRenderer>)
        expect(screen.getByTitle('Not allowed')).toBeInTheDocument()
    })

    it('should not set title when reason is not provided', () => {
        render(<DisabledRenderer>Content</DisabledRenderer>)
        const el = screen.getByText('Content').closest('.access-guard-disabled')!
        expect(el).not.toHaveAttribute('title')
    })
})

// ── TooltipRenderer ──────────────────────────────────────────────────────────

describe('TooltipRenderer', () => {
    it('should render children', () => {
        render(<TooltipRenderer text="Tip">Content</TooltipRenderer>)
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should have aria-disabled="true"', () => {
        render(<TooltipRenderer text="Tip">Content</TooltipRenderer>)
        expect(screen.getByTitle('Tip')).toHaveAttribute('aria-disabled', 'true')
    })

    it('should have className "access-guard-tooltip"', () => {
        render(<TooltipRenderer text="Tip">Content</TooltipRenderer>)
        expect(screen.getByTitle('Tip')).toHaveClass('access-guard-tooltip')
    })

    it('should wrap children in content div', () => {
        render(<TooltipRenderer text="Tip">Content</TooltipRenderer>)
        expect(
            screen.getByText('Content').closest('.access-guard-tooltip__content'),
        ).toBeInTheDocument()
    })

    it('should set title to text prop', () => {
        render(<TooltipRenderer text="Helpful tip">Content</TooltipRenderer>)
        expect(screen.getByTitle('Helpful tip')).toBeInTheDocument()
    })
})

// ── SoftDisabledRenderer ─────────────────────────────────────────────────────

describe('SoftDisabledRenderer', () => {
    describe('initial state', () => {
        it('should render children', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByText('Click me')).toBeInTheDocument()
        })

        it('should not show popup initially', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should have role="button" on trigger', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
        })

        it('should have aria-disabled="true" on trigger', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'aria-disabled',
                'true',
            )
        })

        it('should have aria-haspopup="dialog" on trigger', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'aria-haspopup',
                'dialog',
            )
        })

        it('should have aria-expanded="false" initially', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'aria-expanded',
                'false',
            )
        })

        it('should have tabIndex 0 on trigger', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'tabindex',
                '0',
            )
        })
    })

    describe('click interaction', () => {
        it('should show popup when trigger is clicked', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should set aria-expanded="true" when popup is shown', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'aria-expanded',
                'true',
            )
        })
    })

    describe('keyboard interaction', () => {
        it('should show popup on Enter key', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.keyDown(screen.getByRole('button', { name: /click me/i }), { key: 'Enter' })
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should show popup on Space key', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.keyDown(screen.getByRole('button', { name: /click me/i }), { key: ' ' })
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should dismiss popup on Escape key on trigger', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            const trigger = screen.getByRole('button', { name: /click me/i })
            fireEvent.click(trigger)
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            fireEvent.keyDown(trigger, { key: 'Escape' })
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should not show popup on other keys', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.keyDown(screen.getByRole('button', { name: /click me/i }), { key: 'Tab' })
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    })

    describe('popup props', () => {
        it('should use default title "Not Available"', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Not Available')).toBeInTheDocument()
        })

        it('should forward custom title', () => {
            render(<SoftDisabledRenderer title="Custom Title">Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Custom Title')).toBeInTheDocument()
        })

        it('should forward message', () => {
            render(<SoftDisabledRenderer message="Upgrade required">Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Upgrade required')).toBeInTheDocument()
        })

        it('should forward custom icon', () => {
            render(
                <SoftDisabledRenderer icon={<span data-testid="icon">🔒</span>}>
                    Click me
                </SoftDisabledRenderer>,
            )
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByTestId('icon')).toBeInTheDocument()
        })
    })

    describe('popup dismissal', () => {
        it('should dismiss popup when backdrop is clicked', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            const backdrop = document.querySelector('.Overlay--popup__backdrop')!
            fireEvent.click(backdrop)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should dismiss popup on Escape key', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            fireEvent.keyDown(document, { key: 'Escape' })
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    })

    describe('actions mapping', () => {
        it('should render mapped action buttons', () => {
            const onClick = jest.fn()
            render(
                <SoftDisabledRenderer actions={[{ label: 'Upgrade', onClick }]}>
                    Click me
                </SoftDisabledRenderer>,
            )
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Upgrade')).toBeInTheDocument()
        })

        it('should call action onClick and dismiss popup when action is clicked', () => {
            const onClick = jest.fn()
            render(
                <SoftDisabledRenderer actions={[{ label: 'Upgrade', onClick }]}>
                    Click me
                </SoftDisabledRenderer>,
            )
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            fireEvent.click(screen.getByText('Upgrade'))
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should hide disabled actions via when: false', () => {
            render(
                <SoftDisabledRenderer
                    actions={[{ label: 'Disabled', onClick: jest.fn(), disabled: true }]}
                >
                    Click me
                </SoftDisabledRenderer>,
            )
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.queryByText('Disabled')).not.toBeInTheDocument()
        })

        it('should show non-disabled actions', () => {
            render(
                <SoftDisabledRenderer
                    actions={[{ label: 'Enabled', onClick: jest.fn(), disabled: false }]}
                >
                    Click me
                </SoftDisabledRenderer>,
            )
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Enabled')).toBeInTheDocument()
        })

        it('should not render actions area when no actions are provided', () => {
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            fireEvent.click(screen.getByRole('button', { name: /click me/i }))
            // Only the auto-appended Close button from showClose should exist
            const actionBtns = document.querySelectorAll('.Overlay--popup__action-btn')
            expect(actionBtns.length).toBe(1) // Just the auto-appended Close
        })
    })
})
