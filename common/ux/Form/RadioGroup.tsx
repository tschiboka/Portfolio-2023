import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type RadioGroupProps = AccessibleProps & {
    label: string
    htmlFor: string
    children: ReactNode
    error?: string
}

export const RadioGroup = ({
    label,
    htmlFor,
    children,
    error,
    ariaLabel,
    className,
    style,
}: RadioGroupProps) => (
    <div
        className={`radio-group ${className || ''}`.trim()}
        aria-label={ariaLabel || label}
        role="radiogroup"
        style={style}
    >
        <label htmlFor={htmlFor}>{label}</label>
        {children}
        {error && <p className="error-msg">*{error}</p>}
    </div>
)
