import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type FieldsetProps = AccessibleProps & {
    children: ReactNode
    disabled?: boolean
}

export const Fieldset = ({ children, ariaLabel, className, style, disabled }: FieldsetProps) => (
    <fieldset className={className} aria-label={ariaLabel} style={style} disabled={disabled}>
        {children}
    </fieldset>
)
