import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Const } from '@common-ux'
import { PopupUtils } from './Popup.utils'
import type { CSSProperties } from 'react'
import type { Optional } from '@common-utils'
import type { ActionMenuProps } from './ActionMenu.types'
import type { AnchorResult } from './Overlay.types'
import './Overlay.styles.css'

const { ArrowClass, getAnchorPosition } = PopupUtils

export const ActionMenu = ({
    anchorRef,
    items,
    align = 'center',
    ariaLabel,
    className,
    style: styleProp,
    onClose,
}: ActionMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [anchorResult, setAnchorResult] = useState<Optional<AnchorResult>>(undefined)

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
            className={['Overlay--action-menu', className].filter(Boolean).join(' ')}
            role="menu"
            aria-label={ariaLabel ?? 'Action menu'}
            style={
                anchorResult
                    ? {
                          zIndex: Const.ZIndex.panel,
                          ...anchorResult.style,
                          ...anchorResult.cornerStyle,
                          ...styleProp,
                      }
                    : { zIndex: Const.ZIndex.panel, ...measureStyle }
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
