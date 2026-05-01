import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type ButtonProps = AccessibleProps & {
    children: React.ReactNode
    type?: 'submit' | 'button' | 'reset'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    onClick?: () => void
}

export const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    disabled,
    onClick,
    ariaLabel,
    className,
    style,
}: ButtonProps) => (
    <button
        type={type}
        aria-label={ariaLabel}
        className={
            `${variant === 'secondary' ? 'secondary' : ''} ${className ?? ''}`.trim() || undefined
        }
        style={style}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
)
