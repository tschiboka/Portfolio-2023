import type { FormHTMLAttributes, ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type FormProps = AccessibleProps &
    Omit<FormHTMLAttributes<HTMLFormElement>, 'className' | 'style'> & {
        children: ReactNode
    }

export const FormElement = ({ children, ariaLabel, className, style, ...rest }: FormProps) => {
    return (
        <form aria-label={ariaLabel} className={className} style={style} {...rest}>
            {children}
        </form>
    )
}
