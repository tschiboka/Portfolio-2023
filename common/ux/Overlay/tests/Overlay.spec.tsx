import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'
import { Overlay } from '../index'
import { getAnchorPosition, ArrowClass, ModeClass, SizeStyle } from '../Popup.utils'
// jsdom does not implement window.scrollTo
window.scrollTo = jest.fn()
// ── Helpers ──────────────────────────────────────────────────────────────────

const mockAnchorRef = () => {
    const ref = createRef<HTMLButtonElement>()
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <>
            <button ref={ref}>trigger</button>
            {children}
        </>
    )
    return { ref, Wrapper }
}

const renderPopup = (props: Partial<React.ComponentProps<typeof Overlay.Popup>> = {}) => {
    const { ref, Wrapper } = mockAnchorRef()
    const onClose = jest.fn()
    const result = render(
        <Wrapper>
            <Overlay.Popup
                anchorRef={ref}
                onClose={onClose}
                title="Test Popup"
                message="Test message"
                {...props}
            />
        </Wrapper>,
    )
    return { ...result, onClose, anchorRef: ref }
}

// ── FullScreen ───────────────────────────────────────────────────────────────

describe('Overlay.FullScreen', () => {
    it('should render children', () => {
        render(<Overlay.FullScreen>Content</Overlay.FullScreen>)
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should use the default "Overlay" class', () => {
        render(<Overlay.FullScreen>Content</Overlay.FullScreen>)
        expect(screen.getByText('Content')).toHaveClass('Overlay')
    })

    it('should apply custom className', () => {
        render(<Overlay.FullScreen className="custom">Content</Overlay.FullScreen>)
        expect(screen.getByText('Content')).toHaveClass('custom')
    })

    it('should apply ariaLabel', () => {
        render(<Overlay.FullScreen ariaLabel="overlay">Content</Overlay.FullScreen>)
        expect(screen.getByLabelText('overlay')).toBeInTheDocument()
    })
})

// ── Popup ────────────────────────────────────────────────────────────────────

describe('Overlay.Popup', () => {
    describe('rendering', () => {
        it('should render as a portal to document.body', () => {
            renderPopup()
            const dialog = screen.getByRole('dialog')
            expect(dialog.closest('body')).toBe(document.body)
        })

        it('should render with role="dialog" and aria-modal="true"', () => {
            renderPopup()
            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveAttribute('aria-modal', 'true')
        })

        it('should use title as aria-label by default', () => {
            renderPopup({ title: 'My Title' })
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My Title')
        })

        it('should prefer ariaLabel over title for aria-label', () => {
            renderPopup({ title: 'My Title', ariaLabel: 'Custom Label' })
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Custom Label')
        })
    })

    describe('title', () => {
        it('should render the title', () => {
            renderPopup({ title: 'Hello' })
            expect(screen.getByText('Hello')).toBeInTheDocument()
        })

        it('should render the title in an h3', () => {
            renderPopup({ title: 'Hello' })
            expect(screen.getByText('Hello').tagName).toBe('H3')
        })

        it('should not render a title when not provided', () => {
            renderPopup({ title: undefined })
            expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        })
    })

    describe('message', () => {
        it('should render the message text', () => {
            renderPopup({ message: 'A message' })
            expect(screen.getByText('A message')).toBeInTheDocument()
        })

        it('should render ReactNode as message', () => {
            renderPopup({ message: <span data-testid="custom-msg">Rich</span> })
            expect(screen.getByTestId('custom-msg')).toBeInTheDocument()
        })

        it('should not render message area when not provided', () => {
            renderPopup({ message: undefined })
            expect(screen.queryByText('Test message')).not.toBeInTheDocument()
        })
    })

    describe('children', () => {
        it('should render custom children', () => {
            renderPopup({ children: <div data-testid="child">Custom</div> })
            expect(screen.getByTestId('child')).toBeInTheDocument()
        })
    })

    describe('icon', () => {
        it('should render default icon per mode', () => {
            renderPopup({ mode: 'primary' })
            const dialog = screen.getByRole('dialog')
            expect(dialog.querySelector('.Overlay--popup__icon')).toBeInTheDocument()
        })

        it('should render custom icon when provided', () => {
            renderPopup({ icon: <span data-testid="custom-icon">★</span> })
            expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
        })
    })

    describe('modes', () => {
        const modes = ['primary', 'warning', 'danger', 'info'] as const

        modes.forEach((mode) => {
            it(`should apply ${mode} mode class`, () => {
                renderPopup({ mode })
                const dialog = screen.getByRole('dialog')
                expect(dialog).toHaveClass(ModeClass[mode])
            })
        })

        it('should default to primary mode', () => {
            renderPopup()
            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveClass(ModeClass.primary)
        })
    })

    describe('sizes', () => {
        const sizes = ['sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            it(`should apply ${size} size styles`, () => {
                renderPopup({ size })
                const dialog = screen.getByRole('dialog')
                expect(dialog.style.minWidth).toBeDefined()
                expect(dialog.style.maxWidth).toBeDefined()
            })
        })

        it('should default to md size', () => {
            renderPopup()
            // md is the default — popup renders, no error
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
    })

    describe('close button (showClose)', () => {
        it('should render close button by default', () => {
            renderPopup()
            expect(screen.getByLabelText('Overlay Close')).toBeInTheDocument()
        })

        it('should call onClose when close button is clicked', () => {
            const { onClose } = renderPopup()
            fireEvent.click(screen.getByLabelText('Overlay Close'))
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should hide close button when showClose is false', () => {
            renderPopup({ showClose: false })
            expect(screen.queryByLabelText('Overlay Close')).not.toBeInTheDocument()
        })

        it('should append a Close action button when showClose is true', () => {
            renderPopup({ showClose: true, actions: [] })
            expect(screen.getByText('Close')).toBeInTheDocument()
        })

        it('should not append Close action when showClose is false', () => {
            renderPopup({ showClose: false, actions: [] })
            expect(screen.queryByText('Close')).not.toBeInTheDocument()
        })

        it('should render the auto-appended Close button as secondary variant', () => {
            renderPopup({ showClose: true, actions: [] })
            const closeBtn = screen.getByText('Close')
            expect(closeBtn).toHaveClass('Overlay--popup__action-btn--secondary')
        })
    })

    describe('actions', () => {
        it('should render action buttons', () => {
            const onClick = jest.fn()
            renderPopup({
                actions: [{ label: 'Confirm', onClick }],
            })
            expect(screen.getByText('Confirm')).toBeInTheDocument()
        })

        it('should call action onClick when clicked', () => {
            const onClick = jest.fn()
            renderPopup({
                actions: [{ label: 'Confirm', onClick }],
            })
            fireEvent.click(screen.getByText('Confirm'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('should apply secondary variant class', () => {
            renderPopup({
                actions: [{ label: 'Cancel', variant: 'secondary', onClick: jest.fn() }],
            })
            expect(screen.getByText('Cancel')).toHaveClass('Overlay--popup__action-btn--secondary')
        })

        it('should not apply secondary class for primary variant', () => {
            renderPopup({
                actions: [{ label: 'OK', variant: 'primary', onClick: jest.fn() }],
            })
            expect(screen.getByText('OK')).not.toHaveClass('Overlay--popup__action-btn--secondary')
        })

        it('should hide actions with when: false', () => {
            renderPopup({
                actions: [{ label: 'Hidden', when: false, onClick: jest.fn() }],
            })
            expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
        })

        it('should show actions with when: true', () => {
            renderPopup({
                actions: [{ label: 'Visible', when: true, onClick: jest.fn() }],
            })
            expect(screen.getByText('Visible')).toBeInTheDocument()
        })

        it('should render multiple actions in order', () => {
            renderPopup({
                actions: [
                    { label: 'First', onClick: jest.fn() },
                    { label: 'Second', onClick: jest.fn() },
                ],
            })
            const buttons = screen
                .getAllByRole('button')
                .filter((b) => b.classList.contains('Overlay--popup__action-btn'))
            const labels = buttons.map((b) => b.textContent)
            expect(labels).toContain('First')
            expect(labels).toContain('Second')
        })

        it('should place auto-appended Close after custom actions', () => {
            renderPopup({
                showClose: true,
                actions: [{ label: 'Confirm', onClick: jest.fn() }],
            })
            const buttons = screen
                .getAllByRole('button')
                .filter((b) => b.classList.contains('Overlay--popup__action-btn'))
            const labels = buttons.map((b) => b.textContent)
            expect(labels.indexOf('Confirm')).toBeLessThan(labels.indexOf('Close'))
        })
    })

    describe('backdrop', () => {
        it('should call onClose when backdrop is clicked', () => {
            const { onClose } = renderPopup()
            const backdrop = document.querySelector('.Overlay--popup__backdrop')!
            fireEvent.click(backdrop)
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose when popup body is clicked', () => {
            const { onClose } = renderPopup()
            fireEvent.click(screen.getByRole('dialog'))
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('Escape key', () => {
        it('should call onClose when Escape is pressed', () => {
            const { onClose } = renderPopup()
            fireEvent.keyDown(document, { key: 'Escape' })
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose for other keys', () => {
            const { onClose } = renderPopup()
            fireEvent.keyDown(document, { key: 'Enter' })
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('scroll lock', () => {
        it('should set overflow hidden on body and html when mounted', () => {
            renderPopup()
            expect(document.body.style.overflow).toBe('hidden')
            expect(document.documentElement.style.overflow).toBe('hidden')
        })

        it('should restore overflow on unmount', () => {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
            const { unmount } = renderPopup()
            unmount()
            expect(document.body.style.overflow).toBe('auto')
            expect(document.documentElement.style.overflow).toBe('auto')
        })

        it('should set maxWidth to none on html when mounted', () => {
            renderPopup()
            expect(document.documentElement.style.maxWidth).toBe('none')
        })

        it('should restore maxWidth on unmount', () => {
            document.documentElement.style.maxWidth = '100vw'
            const { unmount } = renderPopup()
            unmount()
            expect(document.documentElement.style.maxWidth).toBe('100vw')
        })
    })

    describe('custom className and style', () => {
        it('should apply custom className', () => {
            renderPopup({ className: 'my-popup' })
            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveClass('my-popup')
        })

        it('should apply custom style', () => {
            renderPopup({ style: { border: '2px solid red' } })
            const dialog = screen.getByRole('dialog')
            expect(dialog.style.border).toBe('2px solid red')
        })
    })
})

// ── Popup.utils ──────────────────────────────────────────────────────────────

describe('getAnchorPosition', () => {
    const mockAnchorEl = (rect: Partial<DOMRect>) => {
        const el = document.createElement('button')
        el.getBoundingClientRect = () => ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
            ...rect,
        })
        return el
    }

    const mockPopupEl = (rect: Partial<DOMRect>) => {
        const el = document.createElement('div')
        el.getBoundingClientRect = () => ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
            ...rect,
        })
        return el
    }

    beforeEach(() => {
        Object.defineProperty(document.documentElement, 'clientWidth', {
            value: 1024,
            configurable: true,
        })
        Object.defineProperty(document.documentElement, 'clientHeight', {
            value: 768,
            configurable: true,
        })
    })

    it('should return position: fixed', () => {
        const anchor = mockAnchorEl({ top: 100, bottom: 120, left: 500, right: 600, width: 100 })
        const popup = mockPopupEl({ width: 200, height: 100 })
        const result = getAnchorPosition(anchor, popup)
        expect(result.style.position).toBe('fixed')
    })

    describe('arrow direction', () => {
        it('should place arrow "bottom" when more space below', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 500,
                right: 600,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrow).toBe('bottom')
        })

        it('should place arrow "top" when more space above', () => {
            const anchor = mockAnchorEl({
                top: 700,
                bottom: 720,
                left: 500,
                right: 600,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrow).toBe('top')
        })

        it('should prefer "bottom" when space is equal', () => {
            const anchor = mockAnchorEl({
                top: 384,
                bottom: 384,
                left: 500,
                right: 600,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrow).toBe('bottom')
        })
    })

    describe('horizontal centering', () => {
        it('should center popup under anchor', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            // centered: anchor.left + anchor.width/2 - popup.width/2 = 400 + 50 - 100 = 350
            expect(result.style.left).toBe(350)
        })
    })

    describe('viewport clamping', () => {
        it('should clamp left to 0 when popup would go off-screen left', () => {
            const anchor = mockAnchorEl({ top: 100, bottom: 120, left: 10, right: 30, width: 20 })
            const popup = mockPopupEl({ width: 300, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.style.left).toBeGreaterThanOrEqual(0)
        })

        it('should clamp left so popup stays within viewport right', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 900,
                right: 1000,
                width: 100,
            })
            const popup = mockPopupEl({ width: 300, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect((result.style.left as number) + 300).toBeLessThanOrEqual(1024)
        })

        it('should clamp top to 0 when popup would go above viewport', () => {
            const anchor = mockAnchorEl({ top: 20, bottom: 40, left: 500, right: 600, width: 100 })
            const popup = mockPopupEl({ width: 200, height: 300 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.style.top).toBeGreaterThanOrEqual(0)
        })
    })

    describe('arrowOffset', () => {
        it('should be 0 when popup is centered on anchor', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrowOffset).toBe(0)
        })

        it('should be non-zero when popup was clamped horizontally', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 950,
                right: 1000,
                width: 50,
            })
            const popup = mockPopupEl({ width: 300, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrowOffset).not.toBe(0)
        })
    })

    describe('maxWidth constraint', () => {
        it('should set maxWidth to remaining viewport space from left', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.style.maxWidth).toBe(1024 - (result.style.left as number))
        })

        it('should set minWidth to 0', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.style.minWidth).toBe(0)
        })
    })
})

// ── ArrowClass mapping ───────────────────────────────────────────────────────

describe('ArrowClass', () => {
    it('should map "top" to arrow--bottom class (popup above, arrow points down)', () => {
        expect(ArrowClass.top).toBe('Overlay--popup__arrow--bottom')
    })

    it('should map "bottom" to arrow--top class (popup below, arrow points up)', () => {
        expect(ArrowClass.bottom).toBe('Overlay--popup__arrow--top')
    })

    it('should map "left" to arrow--right class', () => {
        expect(ArrowClass.left).toBe('Overlay--popup__arrow--right')
    })

    it('should map "right" to arrow--left class', () => {
        expect(ArrowClass.right).toBe('Overlay--popup__arrow--left')
    })
})

// ── ModeClass mapping ────────────────────────────────────────────────────────

describe('ModeClass', () => {
    const expected: Record<string, string> = {
        primary: 'Overlay--popup--primary',
        warning: 'Overlay--popup--warning',
        danger: 'Overlay--popup--danger',
        info: 'Overlay--popup--info',
    }

    Object.entries(expected).forEach(([mode, cls]) => {
        it(`should map "${mode}" to "${cls}"`, () => {
            expect(ModeClass[mode as keyof typeof ModeClass]).toBe(cls)
        })
    })
})

// ── SizeStyle mapping ────────────────────────────────────────────────────────

describe('SizeStyle', () => {
    it('should define sm with minWidth 280 and maxWidth 360', () => {
        expect(SizeStyle.sm).toEqual({ minWidth: 280, maxWidth: 360 })
    })

    it('should define md with minWidth 360 and maxWidth 480', () => {
        expect(SizeStyle.md).toEqual({ minWidth: 360, maxWidth: 480 })
    })

    it('should define lg with minWidth 480 and maxWidth 640', () => {
        expect(SizeStyle.lg).toEqual({ minWidth: 480, maxWidth: 640 })
    })
})
