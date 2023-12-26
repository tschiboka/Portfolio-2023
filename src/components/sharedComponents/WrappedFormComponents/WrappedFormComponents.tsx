import { Control, Controller, Path } from 'react-hook-form'
import './WrappedFormComponents.scss'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

type FieldValues = Record<string, any>
type WrappedInputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    type: 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'
    autoComplete?: string
    addRevealPasswordIcon?: boolean
    revealPassword?: boolean
    setRevealPassword?: ((reveal: boolean) => void) | undefined
}

export const WrappedInput = <T extends FieldValues>({
    name,
    control,
    type,
    autoComplete,
    addRevealPasswordIcon,
    revealPassword,
    setRevealPassword,
    ...rest
}: WrappedInputProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div className="wrapped-component">
                <div className="wrapped-input">
                    <input
                        id={name}
                        autoComplete={autoComplete}
                        type={
                            type === 'password' && revealPassword
                                ? 'text'
                                : type
                        }
                        {...rest}
                        {...field}
                    />
                    {addRevealPasswordIcon && (
                        <div
                            className="reveal-password"
                            onClick={() => {
                                setRevealPassword &&
                                    setRevealPassword(!revealPassword)
                            }}
                        >
                            {revealPassword ? <BsEyeSlash /> : <BsEye />}
                        </div>
                    )}
                </div>
                {fieldState.error && (
                    <p className="error-msg">*{fieldState.error.message}</p>
                )}
            </div>
        )}
    />
)
