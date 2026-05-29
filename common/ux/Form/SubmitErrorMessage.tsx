import type { AccessibleProps } from '../index.types'
import '../Button/Button.styles.css'
import './Form.styles.css'

type SubmitErrorMessageProps = AccessibleProps & {
    text?: string
    variant?: 'success' | 'error' | 'info' | 'warning'
}

export const SubmitErrorMessage = ({
    text,
    variant = 'error',
    ariaLabel,
    className,
    style,
}: SubmitErrorMessageProps) => {
    if (!text) return null

    return (
        <div
            role="alert"
            aria-label={ariaLabel}
            className={
                `submit-error-message ${variant}${className ? ` ${className}` : ''}`.trim() ||
                undefined
            }
            style={style}
        >
            {text}
        </div>
    )
}
