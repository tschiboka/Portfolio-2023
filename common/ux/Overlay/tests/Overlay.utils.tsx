import { createRef } from 'react'
import { render } from '@testing-library/react'
import { Test } from '../../Test'
import { Overlay } from '../index'
import type { ActionMenuProps } from '../ActionMenu'
import { mocks } from './Overlay.mocks'

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

export const Set = {
    fullScreen: (
        props: Partial<React.ComponentProps<typeof Overlay.FullScreen>> & {
            ariaLabel: string
            children: React.ReactNode
        },
    ) => {
        render(<Overlay.FullScreen {...props}>{props.children}</Overlay.FullScreen>)
        return Test.Overlay(props.ariaLabel)
    },
    actionMenu: (overrides: Partial<ActionMenuProps> = {}) => {
        const { ref, Wrapper } = mockAnchorRef()
        const onClose = vi.fn()
        const items = overrides.items ?? mocks.default.map((i) => ({ ...i, onClick: vi.fn() }))
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
    popup: (props: Partial<React.ComponentProps<typeof Overlay.Popup>> = {}) => {
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
    modal: (props: Partial<React.ComponentProps<typeof Overlay.Modal>> = {}) => {
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

export { mockAnchorRef }
