import { Const } from '@common-ux'
import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type LabelProps = AccessibleProps & {
    for: string
    children?: ReactNode
}

export const Label = ({ for: htmlFor, children, ariaLabel, className, style }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            aria-label={ariaLabel}
            className={`form-label ${className || ''}`}
            style={{ zIndex: Const.ZIndex.base, ...style }}
        >
            {children}
        </label>
    )
}
