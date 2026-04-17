import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
        it('should show popup when trigger is clicked', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should set aria-expanded="true" when popup is shown', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('button', { name: /click me/i })).toHaveAttribute(
                'aria-expanded',
                'true',
            )
        })
    })

    describe('keyboard interaction', () => {
        it('should show popup on Enter key', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            screen.getByRole('button', { name: /click me/i }).focus()
            await user.keyboard('{Enter}')
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should show popup on Space key', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            screen.getByRole('button', { name: /click me/i }).focus()
            await user.keyboard('{ }')
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })

        it('should dismiss popup on Escape key on trigger', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            const trigger = screen.getByRole('button', { name: /click me/i })
            await user.click(trigger)
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            trigger.focus()
            await user.keyboard('{Escape}')
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should not show popup on other keys', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            screen.getByRole('button', { name: /click me/i }).focus()
            await user.keyboard('{Tab}')
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    })

    describe('popup props', () => {
        it('should use default title "Not Available"', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Not Available')).toBeInTheDocument()
        })

        it('should forward custom title', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer title="Custom Title">Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Custom Title')).toBeInTheDocument()
        })

        it('should forward message', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer message="Upgrade required">Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Upgrade required')).toBeInTheDocument()
        })

        it('should forward custom icon', async () => {
            const user = userEvent.setup()
            render(
                <SoftDisabledRenderer icon={<span data-testid="icon">🔒</span>}>
                    Click me
                </SoftDisabledRenderer>,
            )
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByTestId('icon')).toBeInTheDocument()
        })
    })

    describe('popup dismissal', () => {
        it('should dismiss popup when backdrop is clicked', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            const backdrop = document.querySelector('.Overlay--popup__backdrop')!
            await user.click(backdrop)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should dismiss popup on Escape key', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            await user.keyboard('{Escape}')
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    })

    describe('actions mapping', () => {
        it('should render mapped action buttons', async () => {
            const user = userEvent.setup()
            const onClick = jest.fn()
            render(
                <SoftDisabledRenderer actions={[{ label: 'Upgrade', onClick }]}>
                    Click me
                </SoftDisabledRenderer>,
            )
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Upgrade')).toBeInTheDocument()
        })

        it('should call action onClick and dismiss popup when action is clicked', async () => {
            const user = userEvent.setup()
            const onClick = jest.fn()
            render(
                <SoftDisabledRenderer actions={[{ label: 'Upgrade', onClick }]}>
                    Click me
                </SoftDisabledRenderer>,
            )
            await user.click(screen.getByRole('button', { name: /click me/i }))
            await user.click(screen.getByText('Upgrade'))
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        it('should hide disabled actions via when: false', async () => {
            const user = userEvent.setup()
            render(
                <SoftDisabledRenderer
                    actions={[{ label: 'Disabled', onClick: jest.fn(), disabled: true }]}
                >
                    Click me
                </SoftDisabledRenderer>,
            )
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.queryByText('Disabled')).not.toBeInTheDocument()
        })

        it('should show non-disabled actions', async () => {
            const user = userEvent.setup()
            render(
                <SoftDisabledRenderer
                    actions={[{ label: 'Enabled', onClick: jest.fn(), disabled: false }]}
                >
                    Click me
                </SoftDisabledRenderer>,
            )
            await user.click(screen.getByRole('button', { name: /click me/i }))
            expect(screen.getByText('Enabled')).toBeInTheDocument()
        })

        it('should not render actions area when no actions are provided', async () => {
            const user = userEvent.setup()
            render(<SoftDisabledRenderer>Click me</SoftDisabledRenderer>)
            await user.click(screen.getByRole('button', { name: /click me/i }))
            // Only the auto-appended Close button from showClose should exist
            const actionBtns = document.querySelectorAll('.Overlay--popup__action-btn')
            expect(actionBtns.length).toBe(1) // Just the auto-appended Close
        })
    })
})
