import './Overlay.styles.css'
import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { PopupProps } from './Overlay.types'
import {
    AnchorResult,
    ArrowClass,
    DefaultIcon,
    ModeClass,
    SizeStyle,
    getAnchorPosition,
    useScrollLock,
} from './Popup.utils'
import { isNonEmpty } from '@common/utils'
import { Stack } from '../Layout'

export const Popup = ({
    ariaLabel,
    className,
    style,
    title,
    message,
    icon,
    size = 'md',
    mode = 'primary',
    anchorRef,
    actions = [],
    showClose = true,
    onClose,
    children,
}: PopupProps) => {
    const resolvedIcon = icon ?? DefaultIcon[mode]
    const resolvedActions = showClose
        ? [...actions, { label: 'Close', variant: 'secondary' as const, onClick: onClose }]
        : actions
    const popupRef = useRef<HTMLDivElement>(null)
    const [anchorResult, setAnchorResult] = useState<AnchorResult | undefined>(undefined)

    // Lock scroll FIRST so viewport is stable when we measure
    useScrollLock()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    useLayoutEffect(() => {
        const anchorEl = anchorRef?.current
        const popupEl = popupRef.current
        if (anchorEl && popupEl) {
            setAnchorResult(getAnchorPosition(anchorEl, popupEl))
        }
    }, [anchorRef])

    const measureStyle: CSSProperties = {
        position: 'fixed',
        top: -9999,
        left: -9999,
        visibility: 'hidden',
    }

    return createPortal(
        <div className="Overlay--popup__backdrop" onClick={onClose}>
            <div
                ref={popupRef}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel ?? title}
                className={className ?? `Overlay--popup ${ModeClass[mode]}`}
                style={{
                    ...SizeStyle[size],
                    ...(anchorResult ? anchorResult.style : measureStyle),
                    ...style,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {anchorResult && (
                    <span
                        className={`Overlay--popup__arrow ${ArrowClass[anchorResult.arrow]}`}
                        style={
                            anchorResult.arrowOffset !== 0
                                ? { left: `calc(50% + ${anchorResult.arrowOffset}px)` }
                                : undefined
                        }
                    />
                )}
                {(resolvedIcon || title || showClose) && (
                    <Stack.Horizontal align="center" gap="12" className="Overlay--popup__header">
                        {resolvedIcon && <div className="Overlay--popup__icon">{resolvedIcon}</div>}
                        {title && <h3 className="Overlay--popup__title">{title}</h3>}
                        {showClose && (
                            <button
                                className="Overlay--popup__close"
                                onClick={onClose}
                                aria-label="Overlay Close"
                            >
                                &times;
                            </button>
                        )}
                    </Stack.Horizontal>
                )}
                {message && <div className="Overlay--popup__message">{message}</div>}
                {children}
                {isNonEmpty(resolvedActions) && (
                    <Stack.Vertical gap="8" wrap className="Overlay--popup__actions">
                        {resolvedActions.map(
                            (action) =>
                                (action.when ?? true) && (
                                    <button
                                        key={action.label}
                                        className={`Overlay--popup__action-btn${
                                            (action.variant ?? 'primary') === 'secondary'
                                                ? ' Overlay--popup__action-btn--secondary'
                                                : ''
                                        }`}
                                        onClick={action.onClick}
                                    >
                                        {action.label}
                                    </button>
                                ),
                        )}
                    </Stack.Vertical>
                )}
            </div>
        </div>,
        document.body,
    )
}
