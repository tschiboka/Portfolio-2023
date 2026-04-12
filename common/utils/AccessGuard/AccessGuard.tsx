import { AccessGuardProps } from './AccessGuard.types'
import { useAccess } from './AccessGuard.hooks'
import { resolveGuards } from './AccessGuard.utils'
import { FaLock } from 'react-icons/fa'
import {
    HiddenRenderer,
    DisabledRenderer,
    SoftDisabledRenderer,
    TooltipRenderer,
} from './renderers'

export const AccessGuard = ({ children, guards }: AccessGuardProps) => {
    const access = useAccess()
    const activeModeConfig = resolveGuards(guards, access)

    if (!activeModeConfig) return <>{children}</>

    switch (activeModeConfig.mode) {
        case 'hidden':
            return <HiddenRenderer />

        case 'visible':
            return <>{children}</>

        case 'disabled':
            return <DisabledRenderer reason={activeModeConfig.reason}>{children}</DisabledRenderer>

        case 'soft-disabled': {
            const {
                title,
                message,
                icon = <FaLock />,
                popupMode,
                popupSize,
                actions,
            } = activeModeConfig
            return (
                <SoftDisabledRenderer
                    title={title}
                    message={message}
                    icon={icon}
                    popupMode={popupMode}
                    popupSize={popupSize}
                    actions={actions}
                >
                    {children}
                </SoftDisabledRenderer>
            )
        }

        case 'tooltip':
            return <TooltipRenderer text={activeModeConfig.text}>{children}</TooltipRenderer>

        default:
            return <>{children}</>
    }
}
