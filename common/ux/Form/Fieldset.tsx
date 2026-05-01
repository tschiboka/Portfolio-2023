import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type FieldsetProps = AccessibleProps & {
    children: ReactNode
}

export const Fieldset = ({ children, ariaLabel, className, style }: FieldsetProps) => (
    <fieldset className={className} aria-label={ariaLabel} style={style}>
        {children}
    </fieldset>
)
