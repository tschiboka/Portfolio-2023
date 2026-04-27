import './Overlay.styles.css'
import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import type { AnchorResult } from './Overlay.types'
import { ArrowClass, getAnchorPosition } from './Popup.utils'

export type ActionMenuItem = {
    id: string
    label: string
    icon?: ReactNode
    variant?: string
    disabled?: boolean
    onClick: () => void
}

export type ActionMenuProps = {
    anchorRef: RefObject<HTMLElement | null>
    items: ActionMenuItem[]
    align?: 'center' | 'start' | 'end'
    ariaLabel?: string
    onClose: () => void
}

export const ActionMenu = ({
    anchorRef,
    items,
    align = 'center',
    ariaLabel,
    onClose,
}: ActionMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [anchorResult, setAnchorResult] = useState<AnchorResult | undefined>(undefined)

    useLayoutEffect(() => {
        const anchorEl = anchorRef?.current
        const menuEl = menuRef.current
        if (anchorEl && menuEl) {
            setAnchorResult(getAnchorPosition(anchorEl, menuEl, align))
        }
    }, [anchorRef, align])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const anchor = anchorRef?.current
            const menu = menuRef.current
            if (anchor?.contains(e.target as Node)) return
            if (menu?.contains(e.target as Node)) return
            onClose()
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        window.addEventListener('resize', onClose)
        window.addEventListener('scroll', onClose, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('resize', onClose)
            window.removeEventListener('scroll', onClose, true)
        }
    }, [anchorRef, onClose])

    const measureStyle: CSSProperties = {
        position: 'fixed',
        top: -9999,
        left: -9999,
        visibility: 'hidden',
    }

    return createPortal(
        <div
            ref={menuRef}
            className="Overlay--action-menu"
            role="menu"
            aria-label={ariaLabel ?? 'Action menu'}
            style={
                anchorResult ? { ...anchorResult.style, ...anchorResult.cornerStyle } : measureStyle
            }
        >
            {anchorResult && (
                <span
                    className={`Overlay--popup__arrow ${ArrowClass[anchorResult.arrow]}`}
                    style={anchorResult.arrowStyle}
                />
            )}
            <ul className="Overlay--action-menu__list">
                {items.map((item) => (
                    <li key={item.id} role="none">
                        <button
                            className={`Overlay--action-menu__item ${item.variant ?? ''}`}
                            type="button"
                            role="menuitem"
                            aria-label={item.label}
                            disabled={item.disabled}
                            onClick={() => {
                                item.onClick()
                                onClose()
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>,
        document.body,
    )
}
