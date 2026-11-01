import { createRef } from 'react'
import { render } from '@testing-library/react'
import { OverlayMocks } from './Overlay.mocks'
import { Overlay } from '../index'
import { Test } from '../../Test'
import type { ComponentProps, ReactNode } from 'react'
import type { ActionMenuProps } from '..'

const mockAnchorRef = () => {
    const ref = createRef<HTMLButtonElement>()
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <>
            <button ref={ref}>trigger</button>
            {children}
        </>
    )
    return { ref, Wrapper }
}

const Set = {
    fullScreen: (
        props: Partial<ComponentProps<typeof Overlay.FullScreen>> & {
            ariaLabel: string
            children: ReactNode
        },
    ) => {
        render(<Overlay.FullScreen {...props}>{props.children}</Overlay.FullScreen>)
        return Test.Overlay(props.ariaLabel)
    },
    actionMenu: (overrides: Partial<ActionMenuProps> = {}) => {
        const { ref, Wrapper } = mockAnchorRef()
        const onClose = vi.fn()
        const items =
            overrides.items ?? OverlayMocks.default.map((i) => ({ ...i, onClick: vi.fn() }))
        const label = overrides.ariaLabel ?? 'Action menu'
        const result = render(
            <Wrapper>
                <Overlay.ActionMenu
                    anchorRef={ref}
                    items={items}
                    onClose={onClose}
                    {...overrides}
                />
            </Wrapper>,
        )
        const menu = Test.Overlay(label)
        return { ...result, onClose, anchorRef: ref, items, menu }
    },
    popup: (props: Partial<ComponentProps<typeof Overlay.Popup>> = {}) => {
        const { ref, Wrapper } = mockAnchorRef()
        const onClose = vi.fn()
        const label = props.ariaLabel ?? props.title ?? 'Test Popup'
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
        const popup = Test.Overlay(label)
        return { ...result, onClose, anchorRef: ref, popup }
    },
    modal: (props: Partial<ComponentProps<typeof Overlay.Modal>> = {}) => {
        const onClose = vi.fn()
        const label = props.ariaLabel ?? props.title ?? 'Test Modal'
        const result = render(
            <Overlay.Modal
                onClose={onClose}
                title="Test Modal"
                message="Test message"
                {...props}
            />,
        )
        const modal = Test.Overlay(label)
        return { ...result, onClose, modal }
    },
}

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

export const OverlayTestUtils = { Set, mockAnchorRef, mockAnchorEl, mockPopupEl }
