import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Overlay } from '../index'
import type { ActionMenuItem } from '../ActionMenu'
import { getAnchorPosition, ArrowClass, ModeClass, SizeStyle } from '../Popup.utils'
import { mocks } from './Overlay.mocks'
import { Set, mockAnchorRef } from './Overlay.utils'

// jsdom does not implement window.scrollTo
window.scrollTo = vi.fn()

describe('Overlay.FullScreen', () => {
    it('should render children', () => {
        expect(Set.fullScreen(mocks.fullScreen).Get.byText('Content')).toBeInTheDocument()
    })

    it('should use the default "Overlay" class', () => {
        expect(Set.fullScreen(mocks.fullScreen).Get.className()).toContain('Overlay')
    })

    it('should apply custom className', () => {
        expect(
            Set.fullScreen({ ...mocks.fullScreen, className: 'custom' }).Get.className(),
        ).toContain('custom')
    })

    it('should apply ariaLabel', () => {
        expect(
            Set.fullScreen({ ...mocks.fullScreen, ariaLabel: 'overlay' }).Get.attribute(
                'aria-label',
            ),
        ).toBe('overlay')
    })
})

describe('Overlay.ActionMenu', () => {
    describe('rendering', () => {
        it('should render as a portal to document.body', () => {
            expect(Set.actionMenu().menu.Get.menu().closest('body')).toBe(document.body)
        })

        it('should render with role="menu"', () => {
            expect(Set.actionMenu().menu.Get.menu()).toBeInTheDocument()
        })

        it('should use "Action menu" as default aria-label', () => {
            expect(Set.actionMenu().menu.Get.attribute('aria-label')).toBe('Action menu')
        })

        it('should use custom ariaLabel when provided', () => {
            expect(
                Set.actionMenu({ ariaLabel: 'User actions' }).menu.Get.attribute('aria-label'),
            ).toBe('User actions')
        })

        it('should apply the Overlay--action-menu class', () => {
            expect(Set.actionMenu().menu.Get.className()).toContain('Overlay--action-menu')
        })
    })

    describe('items', () => {
        it('should render all items as menuitems', () => {
            expect(Set.actionMenu().menu.Get.menuItems()).toHaveLength(2)
        })

        it('should render item labels', () => {
            const { menu } = Set.actionMenu()
            expect(menu.Has.menuItem('Edit')).toBe(true)
            expect(menu.Has.menuItem('Delete')).toBe(true)
        })

        it('should render item icon when provided', () => {
            const items: ActionMenuItem[] = [
                {
                    id: 'star',
                    label: 'Star',
                    icon: <span data-testid="star-icon">★</span>,
                    onClick: vi.fn(),
                },
            ]
            expect(Set.actionMenu({ items }).menu.Get.byTestId('star-icon')).toBeInTheDocument()
        })

        it('should wrap items in li with role="none"', () => {
            const { menu } = Set.actionMenu()
            const listItems = menu.Get.menu().querySelectorAll('li')
            listItems.forEach((li) => {
                expect(li).toHaveAttribute('role', 'none')
            })
        })

        it('should render items as buttons', () => {
            const { menu } = Set.actionMenu()
            menu.Get.menuItems().forEach((item) => {
                expect(item.tagName).toBe('BUTTON')
                expect(item).toHaveAttribute('type', 'button')
            })
        })

        it('should apply variant class when provided', () => {
            const items: ActionMenuItem[] = [
                { id: 'a', label: 'Danger action', variant: 'danger', onClick: vi.fn() },
            ]
            expect(
                Set.actionMenu({ items }).menu.Get.menuItem('Danger action').className,
            ).toContain('danger')
        })

        it('should disable item when disabled is true', () => {
            const items: ActionMenuItem[] = [
                { id: 'a', label: 'Locked', disabled: true, onClick: vi.fn() },
            ]
            expect(Set.actionMenu({ items }).menu.Get.menuItem('Locked')).toBeDisabled()
        })

        it('should not disable item when disabled is false', () => {
            const items: ActionMenuItem[] = [
                { id: 'a', label: 'Active', disabled: false, onClick: vi.fn() },
            ]
            expect(Set.actionMenu({ items }).menu.Get.menuItem('Active')).not.toBeDisabled()
        })
    })

    describe('onClick', () => {
        it('should call item onClick when clicked', async () => {
            const onClick = vi.fn()
            const items: ActionMenuItem[] = [{ id: 'a', label: 'Do it', onClick }]
            const { menu } = Set.actionMenu({ items })
            await menu.Do.clickMenuItem('Do it')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('should call onClose after clicking an item', async () => {
            const { onClose, menu } = Set.actionMenu()
            await menu.Do.clickMenuItem('Edit')
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should call both item onClick and onClose', async () => {
            const onClick = vi.fn()
            const items: ActionMenuItem[] = [{ id: 'a', label: 'Go', onClick }]
            const { onClose, menu } = Set.actionMenu({ items })
            await menu.Do.clickMenuItem('Go')
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('close behaviour', () => {
        it('should call onClose when Escape is pressed', async () => {
            const { onClose, menu } = Set.actionMenu()
            await menu.Do.dismiss()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose for other keys', async () => {
            const { onClose, menu } = Set.actionMenu()
            await menu.Do.keyboard('{Enter}')
            expect(onClose).not.toHaveBeenCalled()
        })

        it('should call onClose when clicking outside', async () => {
            const { onClose, menu } = Set.actionMenu()
            await menu.Do.clickOutside()
            expect(onClose).toHaveBeenCalled()
        })

        it('should not call onClose when clicking inside the menu', () => {
            const { onClose, menu } = Set.actionMenu()
            fireEvent.mouseDown(menu.Get.menu())
            expect(onClose).not.toHaveBeenCalled()
        })

        it('should not call onClose when clicking the anchor', () => {
            const { onClose } = Set.actionMenu()
            fireEvent.mouseDown(screen.getByText('trigger'))
            expect(onClose).not.toHaveBeenCalled()
        })

        it('should call onClose on window resize', () => {
            const { onClose } = Set.actionMenu()
            fireEvent(window, new Event('resize'))
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should call onClose on window scroll', () => {
            const { onClose } = Set.actionMenu()
            fireEvent.scroll(window)
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should remove event listeners on unmount', () => {
            const { onClose, unmount } = Set.actionMenu()
            unmount()
            fireEvent(window, new Event('resize'))
            fireEvent.scroll(window)
            fireEvent(document, new KeyboardEvent('keydown', { key: 'Escape' }))
            expect(onClose).not.toHaveBeenCalled()
        })
    })
})

describe('Overlay.Popup', () => {
    describe('rendering', () => {
        it('should render as a portal to document.body', () => {
            expect(Set.popup().popup.Get.dialog().closest('body')).toBe(document.body)
        })

        it('should render with role="dialog" and aria-modal="true"', () => {
            expect(Set.popup().popup.Get.attribute('aria-modal')).toBe('true')
        })

        it('should use title as aria-label by default', () => {
            expect(Set.popup({ title: 'My Title' }).popup.Get.attribute('aria-label')).toBe(
                'My Title',
            )
        })

        it('should prefer ariaLabel over title for aria-label', () => {
            expect(
                Set.popup({ title: 'My Title', ariaLabel: 'Custom Label' }).popup.Get.attribute(
                    'aria-label',
                ),
            ).toBe('Custom Label')
        })
    })

    describe('title', () => {
        it('should render the title', () => {
            expect(Set.popup({ title: 'Hello' }).popup.Get.byText('Hello')).toBeInTheDocument()
        })

        it('should render the title in an h3', () => {
            expect(Set.popup({ title: 'Hello' }).popup.Get.heading().tagName).toBe('H3')
        })

        it('should not render a title when not provided', () => {
            const { ref, Wrapper } = mockAnchorRef()
            render(
                <Wrapper>
                    <Overlay.Popup anchorRef={ref} onClose={vi.fn()} message="Test message" />
                </Wrapper>,
            )
            expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        })
    })

    describe('message', () => {
        it('should render the message text', () => {
            expect(
                Set.popup({ message: 'A message' }).popup.Get.byText('A message'),
            ).toBeInTheDocument()
        })

        it('should render ReactNode as message', () => {
            expect(
                Set.popup({
                    message: <span data-testid="custom-msg">Rich</span>,
                }).popup.Get.byTestId('custom-msg'),
            ).toBeInTheDocument()
        })

        it('should not render message area when not provided', () => {
            Set.popup({ message: undefined })
            expect(screen.queryByText('Test message')).not.toBeInTheDocument()
        })
    })

    describe('children', () => {
        it('should render custom children', () => {
            expect(
                Set.popup({ children: <div data-testid="child">Custom</div> }).popup.Get.byTestId(
                    'child',
                ),
            ).toBeInTheDocument()
        })
    })

    describe('icon', () => {
        it('should render default icon per mode', () => {
            expect(
                Set.popup({ mode: 'primary' })
                    .popup.Get.dialog()
                    .querySelector('.Overlay--popup__icon'),
            ).toBeInTheDocument()
        })

        it('should render custom icon when provided', () => {
            expect(
                Set.popup({ icon: <span data-testid="custom-icon">★</span> }).popup.Get.byTestId(
                    'custom-icon',
                ),
            ).toBeInTheDocument()
        })
    })

    describe('modes', () => {
        const modes = ['primary', 'warning', 'danger', 'info'] as const

        modes.forEach((mode) => {
            it(`should apply ${mode} mode class`, () => {
                expect(Set.popup({ mode }).popup.Get.className()).toContain(ModeClass[mode])
            })
        })

        it('should default to primary mode', () => {
            expect(Set.popup().popup.Get.className()).toContain(ModeClass.primary)
        })
    })

    describe('sizes', () => {
        const sizes = ['sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            it(`should apply ${size} size styles`, () => {
                const { popup } = Set.popup({ size })
                expect(popup.Get.style().minWidth).toBeDefined()
                expect(popup.Get.style().maxWidth).toBeDefined()
            })
        })

        it('should default to md size', () => {
            expect(Set.popup().popup.Get.dialog()).toBeInTheDocument()
        })
    })

    describe('close button (showClose)', () => {
        it('should render close button by default', () => {
            expect(Set.popup().popup.Has.closeButton()).toBe(true)
        })

        it('should call onClose when close button is clicked', async () => {
            const { onClose, popup } = Set.popup()
            await popup.Do.close()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should hide close button when showClose is false', () => {
            expect(Set.popup({ showClose: false }).popup.Has.closeButton()).toBe(false)
        })

        it('should append a Close action button when showClose is true', () => {
            expect(
                Set.popup({ showClose: true, actions: [] }).popup.Get.byText('Close'),
            ).toBeInTheDocument()
        })

        it('should not append Close action when showClose is false', () => {
            Set.popup({ showClose: false, actions: [] })
            expect(screen.queryByText('Close')).not.toBeInTheDocument()
        })

        it('should render the auto-appended Close button as secondary variant', () => {
            expect(
                Set.popup({ showClose: true, actions: [] }).popup.Get.byText('Close').className,
            ).toContain('Overlay--popup__action-btn--secondary')
        })
    })

    describe('actions', () => {
        it('should render action buttons', () => {
            expect(
                Set.popup({ actions: [{ label: 'Confirm', onClick: vi.fn() }] }).popup.Get.byText(
                    'Confirm',
                ),
            ).toBeInTheDocument()
        })

        it('should call action onClick when clicked', async () => {
            const onClick = vi.fn()
            const { popup } = Set.popup({
                actions: [{ label: 'Confirm', onClick }],
            })
            await popup.Do.clickActionButton('Confirm')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('should apply secondary variant class', () => {
            expect(
                Set.popup({
                    actions: [{ label: 'Cancel', variant: 'secondary', onClick: vi.fn() }],
                }).popup.Get.byText('Cancel').className,
            ).toContain('Overlay--popup__action-btn--secondary')
        })

        it('should not apply secondary class for primary variant', () => {
            expect(
                Set.popup({
                    actions: [{ label: 'OK', variant: 'primary', onClick: vi.fn() }],
                }).popup.Get.byText('OK').className,
            ).not.toContain('Overlay--popup__action-btn--secondary')
        })

        it('should hide actions with when: false', () => {
            Set.popup({
                actions: [{ label: 'Hidden', when: false, onClick: vi.fn() }],
            })
            expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
        })

        it('should show actions with when: true', () => {
            expect(
                Set.popup({
                    actions: [{ label: 'Visible', when: true, onClick: vi.fn() }],
                }).popup.Get.byText('Visible'),
            ).toBeInTheDocument()
        })

        it('should render multiple actions in order', () => {
            const { popup } = Set.popup({
                actions: [
                    { label: 'First', onClick: vi.fn() },
                    { label: 'Second', onClick: vi.fn() },
                ],
            })
            const labels = popup.Get.actionButtons().map((b) => b.textContent)
            expect(labels).toContain('First')
            expect(labels).toContain('Second')
        })

        it('should place auto-appended Close after custom actions', () => {
            const { popup } = Set.popup({
                showClose: true,
                actions: [{ label: 'Confirm', onClick: vi.fn() }],
            })
            const labels = popup.Get.actionButtons().map((b) => b.textContent)
            expect(labels.indexOf('Confirm')).toBeLessThan(labels.indexOf('Close'))
        })
    })

    describe('backdrop', () => {
        it('should call onClose when backdrop is clicked', async () => {
            const { onClose, popup } = Set.popup()
            await popup.Do.clickBackdrop()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose when popup body is clicked', async () => {
            const user = userEvent.setup()
            const { onClose, popup } = Set.popup()
            await user.click(popup.Get.dialog())
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('Escape key', () => {
        it('should call onClose when Escape is pressed', async () => {
            const { onClose, popup } = Set.popup()
            await popup.Do.dismiss()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose for other keys', async () => {
            const { onClose, popup } = Set.popup()
            await popup.Do.keyboard('{Enter}')
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('scroll lock', () => {
        it('should set overflow hidden on body and html when mounted', () => {
            Set.popup()
            expect(document.body.style.overflow).toBe('hidden')
            expect(document.documentElement.style.overflow).toBe('hidden')
        })

        it('should restore overflow on unmount', () => {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
            const { unmount } = Set.popup()
            unmount()
            expect(document.body.style.overflow).toBe('auto')
            expect(document.documentElement.style.overflow).toBe('auto')
        })

        it('should set maxWidth to none on html when mounted', () => {
            Set.popup()
            expect(document.documentElement.style.maxWidth).toBe('none')
        })

        it('should restore maxWidth on unmount', () => {
            document.documentElement.style.maxWidth = '100vw'
            const { unmount } = Set.popup()
            unmount()
            expect(document.documentElement.style.maxWidth).toBe('100vw')
        })
    })

    describe('custom className and style', () => {
        it('should apply custom className', () => {
            expect(Set.popup({ className: 'my-popup' }).popup.Get.className()).toContain('my-popup')
        })

        it('should apply custom style', () => {
            expect(Set.popup({ style: { border: '2px solid red' } }).popup.Get.style().border).toBe(
                '2px solid red',
            )
        })
    })
})

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

    describe('arrowStyle', () => {
        it('should have no offset when popup is centered on anchor', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrowStyle).toEqual({})
        })

        it('should have offset when popup was clamped horizontally', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 950,
                right: 1000,
                width: 50,
            })
            const popup = mockPopupEl({ width: 300, height: 100 })
            const result = getAnchorPosition(anchor, popup)
            expect(result.arrowStyle.left).toBeDefined()
        })

        it('should use right: 0 when align is end', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup, 'end')
            expect(result.arrowStyle.right).toBe(0)
            expect(result.arrowStyle.left).toBe('auto')
        })

        it('should use left: 0 when align is start', () => {
            const anchor = mockAnchorEl({
                top: 100,
                bottom: 120,
                left: 400,
                right: 500,
                width: 100,
            })
            const popup = mockPopupEl({ width: 200, height: 100 })
            const result = getAnchorPosition(anchor, popup, 'start')
            expect(result.arrowStyle.left).toBe(0)
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

describe('Overlay.Modal', () => {
    describe('rendering', () => {
        it('should render as a portal to document.body', () => {
            expect(Set.modal().modal.Get.dialog().closest('body')).toBe(document.body)
        })

        it('should render with role="dialog" and aria-modal="true"', () => {
            expect(Set.modal().modal.Get.attribute('aria-modal')).toBe('true')
        })

        it('should use title as aria-label by default', () => {
            expect(Set.modal({ title: 'My Title' }).modal.Get.attribute('aria-label')).toBe(
                'My Title',
            )
        })

        it('should prefer ariaLabel over title for aria-label', () => {
            expect(
                Set.modal({ title: 'My Title', ariaLabel: 'Custom Label' }).modal.Get.attribute(
                    'aria-label',
                ),
            ).toBe('Custom Label')
        })

        it('should have position relative for centered layout', () => {
            expect(Set.modal().modal.Get.style().position).toBe('relative')
        })
    })

    describe('title', () => {
        it('should render the title', () => {
            expect(Set.modal({ title: 'Hello' }).modal.Get.byText('Hello')).toBeInTheDocument()
        })

        it('should render the title in an h3', () => {
            expect(Set.modal({ title: 'Hello' }).modal.Get.heading().tagName).toBe('H3')
        })

        it('should not render a title when not provided', () => {
            render(<Overlay.Modal onClose={vi.fn()} message="Test message" />)
            expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        })
    })

    describe('message', () => {
        it('should render the message text', () => {
            expect(
                Set.modal({ message: 'A message' }).modal.Get.byText('A message'),
            ).toBeInTheDocument()
        })

        it('should render ReactNode as message', () => {
            expect(
                Set.modal({
                    message: <span data-testid="custom-msg">Rich</span>,
                }).modal.Get.byTestId('custom-msg'),
            ).toBeInTheDocument()
        })

        it('should not render message area when not provided', () => {
            Set.modal({ message: undefined })
            expect(screen.queryByText('Test message')).not.toBeInTheDocument()
        })
    })

    describe('children', () => {
        it('should render custom children', () => {
            expect(
                Set.modal({ children: <div data-testid="child">Custom</div> }).modal.Get.byTestId(
                    'child',
                ),
            ).toBeInTheDocument()
        })
    })

    describe('icon', () => {
        it('should render default icon per mode', () => {
            expect(
                Set.modal({ mode: 'primary' })
                    .modal.Get.dialog()
                    .querySelector('.Overlay--popup__icon'),
            ).toBeInTheDocument()
        })

        it('should render custom icon when provided', () => {
            expect(
                Set.modal({ icon: <span data-testid="custom-icon">★</span> }).modal.Get.byTestId(
                    'custom-icon',
                ),
            ).toBeInTheDocument()
        })
    })

    describe('modes', () => {
        const modes = ['primary', 'warning', 'danger', 'info'] as const

        modes.forEach((mode) => {
            it(`should apply ${mode} mode class`, () => {
                expect(Set.modal({ mode }).modal.Get.className()).toContain(ModeClass[mode])
            })
        })

        it('should default to primary mode', () => {
            expect(Set.modal().modal.Get.className()).toContain(ModeClass.primary)
        })
    })

    describe('sizes', () => {
        const sizes = ['sm', 'md', 'lg', 'xl'] as const

        sizes.forEach((size) => {
            it(`should apply ${size} size styles`, () => {
                const { modal } = Set.modal({ size })
                expect(modal.Get.style().minWidth).toBeDefined()
                expect(modal.Get.style().maxWidth).toBeDefined()
            })
        })

        it('should default to md size', () => {
            expect(Set.modal().modal.Get.dialog()).toBeInTheDocument()
        })
    })

    describe('close button (showClose)', () => {
        it('should render close button by default', () => {
            expect(Set.modal().modal.Has.closeButton()).toBe(true)
        })

        it('should call onClose when close button is clicked', async () => {
            const { onClose, modal } = Set.modal()
            await modal.Do.close()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should hide close button when showClose is false', () => {
            expect(Set.modal({ showClose: false }).modal.Has.closeButton()).toBe(false)
        })

        it('should append a Close action button when showClose is true', () => {
            expect(
                Set.modal({ showClose: true, actions: [] }).modal.Get.byText('Close'),
            ).toBeInTheDocument()
        })

        it('should not append Close action when showClose is false', () => {
            Set.modal({ showClose: false, actions: [] })
            expect(screen.queryByText('Close')).not.toBeInTheDocument()
        })
    })

    describe('actions', () => {
        it('should render action buttons', () => {
            expect(
                Set.modal({ actions: [{ label: 'Confirm', onClick: vi.fn() }] }).modal.Get.byText(
                    'Confirm',
                ),
            ).toBeInTheDocument()
        })

        it('should call action onClick when clicked', async () => {
            const onClick = vi.fn()
            const { modal } = Set.modal({
                actions: [{ label: 'Confirm', onClick }],
            })
            await modal.Do.clickActionButton('Confirm')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('should hide actions with when: false', () => {
            Set.modal({
                actions: [{ label: 'Hidden', when: false, onClick: vi.fn() }],
            })
            expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
        })

        it('should show actions with when: true', () => {
            expect(
                Set.modal({
                    actions: [{ label: 'Visible', when: true, onClick: vi.fn() }],
                }).modal.Get.byText('Visible'),
            ).toBeInTheDocument()
        })
    })

    describe('backdrop', () => {
        it('should call onClose when backdrop is clicked', async () => {
            const { onClose, modal } = Set.modal()
            await modal.Do.clickBackdrop()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose when dialog body is clicked', async () => {
            const user = userEvent.setup()
            const { onClose, modal } = Set.modal()
            await user.click(modal.Get.dialog())
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('Escape key', () => {
        it('should call onClose when Escape is pressed', async () => {
            const { onClose, modal } = Set.modal()
            await modal.Do.dismiss()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('should not call onClose for other keys', async () => {
            const { onClose, modal } = Set.modal()
            await modal.Do.keyboard('{Enter}')
            expect(onClose).not.toHaveBeenCalled()
        })
    })

    describe('scroll lock', () => {
        it('should set overflow hidden on body and html when mounted', () => {
            Set.modal()
            expect(document.body.style.overflow).toBe('hidden')
            expect(document.documentElement.style.overflow).toBe('hidden')
        })

        it('should restore overflow on unmount', () => {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
            const { unmount } = Set.modal()
            unmount()
            expect(document.body.style.overflow).toBe('auto')
            expect(document.documentElement.style.overflow).toBe('auto')
        })
    })

    describe('custom className and style', () => {
        it('should apply custom className', () => {
            expect(Set.modal({ className: 'my-modal' }).modal.Get.className()).toContain('my-modal')
        })

        it('should apply custom style', () => {
            expect(Set.modal({ style: { border: '2px solid red' } }).modal.Get.style().border).toBe(
                '2px solid red',
            )
        })
    })
})
