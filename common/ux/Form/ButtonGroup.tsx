import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type ButtonGroupProps = AccessibleProps & {
    children: ReactNode
}

export const ButtonGroup = ({ children, ariaLabel, className, style }: ButtonGroupProps) => (
    <div className={`button-group ${className || ''}`.trim()} aria-label={ariaLabel} style={style}>
        {children}
    </div>
)
