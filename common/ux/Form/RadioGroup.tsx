import type { ReactNode } from 'react'
import type { AccessibleProps } from '../index.types'
import { Const } from '@common/ux'
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
        <label htmlFor={htmlFor} style={{ zIndex: Const.ZIndex.base }}>
            {label}
        </label>
        {children}
        {error && (
            <p className="error-msg" role="alert">
                *{error}
            </p>
        )}
    </div>
)
