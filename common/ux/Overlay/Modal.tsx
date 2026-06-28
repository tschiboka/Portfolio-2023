import { Const } from '@common/ux'
import './Overlay.styles.css'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { ModalProps } from './Overlay.types'
import { DefaultIcon, ModeClass, useScrollLock } from './Popup.utils'
import { isNonEmpty } from '@common/utils'
import { Stack } from '../Layout'

const ModalSizeStyle: Record<string, CSSProperties> = {
    sm: { minWidth: 360, maxWidth: 480 },
    md: { minWidth: 480, maxWidth: 600 },
    lg: { minWidth: 600, maxWidth: 720 },
    xl: { minWidth: 720, maxWidth: 900 },
}

export const Modal = ({
    ariaLabel,
    className,
    style,
    title,
    message,
    icon,
    size = 'md',
    mode = 'primary',
    actions = [],
    showClose = true,
    onClose,
    children,
}: ModalProps) => {
    const resolvedIcon = icon ?? DefaultIcon[mode]
    const resolvedActions = showClose
        ? [...actions, { label: 'Close', variant: 'secondary' as const, onClick: onClose }]
        : actions

    useScrollLock()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return createPortal(
        <div
            className="Overlay--popup__backdrop"
            style={{ zIndex: Const.ZIndex.backdrop }}
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel ?? title}
                className={className ?? `Overlay--popup ${ModeClass[mode]}`}
                style={{
                    zIndex: Const.ZIndex.panel,
                    ...ModalSizeStyle[size],
                    position: 'relative',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    ...style,
                }}
                onClick={(e) => e.stopPropagation()}
            >
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
                <div style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
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
