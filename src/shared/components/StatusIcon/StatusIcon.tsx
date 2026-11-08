import { MdCancel, MdCheckCircle } from 'react-icons/md'
import type { StatusIconProps } from './StatusIcon.types'
import './StatusIcon.styles.css'

const IconByStatus = {
    success: MdCheckCircle,
    error: MdCancel,
}

export const StatusIcon = ({ status, ariaLabel }: StatusIconProps) => {
    const Icon = IconByStatus[status]

    return (
        <Icon className={`StatusIcon StatusIcon--${status}`} role="img" aria-label={ariaLabel} />
    )
}
