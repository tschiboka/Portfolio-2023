import { Control, Controller, Path } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FieldValues } from './Form.types'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type InputProps<TFieldValues extends FieldValues = FieldValues> = AccessibleProps & {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    type: 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'
    autoComplete?: string
    placeholder?: string
    addRevealPasswordIcon?: boolean
    revealPassword?: boolean
    setRevealPassword?: ((reveal: boolean) => void) | undefined
}

export const Input = <T extends FieldValues>({
    name,
    control,
    type,
    autoComplete,
    addRevealPasswordIcon,
    revealPassword,
    setRevealPassword,
    ariaLabel,
    className,
    style,
    ...rest
}: InputProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div aria-label={ariaLabel} className={className ?? 'wrapped-component'} style={style}>
                <div className="wrapped-input">
                    <input
                        id={name}
                        autoComplete={autoComplete}
                        type={type === 'password' && revealPassword ? 'text' : type}
                        {...rest}
                        {...field}
                    />
                    {addRevealPasswordIcon && (
                        <div
                            className="action-icon"
                            onClick={() => {
                                setRevealPassword && setRevealPassword(!revealPassword)
                            }}
                        >
                            {revealPassword ? <BsEyeSlash /> : <BsEye />}
                        </div>
                    )}
                </div>
                {fieldState.error && <p className="error-msg">*{fieldState.error.message}</p>}
            </div>
        )}
    />
)
