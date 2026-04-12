import { ReactNode, useState, useCallback, useRef } from 'react'
import { GuardAction } from '../AccessGuard.types'
import { Overlay } from '@common/ux'
import { PopupMode, PopupSize } from '@common/ux/Overlay/Overlay.types'
import './Renderers.styles.css'

type SoftDisabledRendererProps = {
    children: ReactNode
    title?: string
    message?: string | ReactNode
    icon?: ReactNode
    popupMode?: PopupMode
    popupSize?: PopupSize
    actions?: GuardAction[]
}

export const SoftDisabledRenderer = ({
    children,
    title = 'Not Available',
    message,
    icon,
    popupMode,
    popupSize,
    actions,
}: SoftDisabledRendererProps) => {
    const [showPopup, setShowPopup] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)

    const handleInteraction = useCallback(() => setShowPopup(true), [])
    const handleDismiss = useCallback(() => setShowPopup(false), [])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleInteraction()
            }
            if (e.key === 'Escape') handleDismiss()
        },
        [handleInteraction, handleDismiss],
    )

    const popupActions = actions?.map((action) => ({
        label: action.label,
        when: !action.disabled,
        onClick: () => {
            action.onClick()
            handleDismiss()
        },
    }))

    return (
        <div className="access-guard-soft-disabled">
            <div
                ref={triggerRef}
                onClick={handleInteraction}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-disabled="true"
                aria-haspopup="dialog"
                aria-expanded={showPopup}
                className="access-guard-soft-disabled__trigger"
            >
                {children}
            </div>

            {showPopup && (
                <Overlay.Popup
                    title={title}
                    message={message}
                    icon={icon}
                    mode={popupMode}
                    size={popupSize}
                    anchorRef={triggerRef}
                    actions={popupActions}
                    onClose={handleDismiss}
                />
            )}
        </div>
    )
}
