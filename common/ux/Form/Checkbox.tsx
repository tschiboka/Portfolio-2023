import { Control, Controller, Path } from 'react-hook-form'
import { FieldValues } from './Form.types'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type CheckboxProps<TFieldValues extends FieldValues = FieldValues> = AccessibleProps & {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    label: string
    onChange?: (checked: boolean) => void
}

export const Checkbox = <T extends FieldValues>({
    name,
    control,
    label,
    onChange,
    ariaLabel,
    className,
    style,
}: CheckboxProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange: onChangeFn }, fieldState }) => (
                <div className={`checkbox-field ${className ?? ''}`} style={style}>
                    <input
                        id={name}
                        type="checkbox"
                        aria-label={ariaLabel}
                        checked={!!value}
                        onChange={(e) => {
                            onChangeFn(e.target.checked)
                            onChange?.(e.target.checked)
                        }}
                    />
                    <label htmlFor={name}>{label}</label>
                    {fieldState.error && <p className="error-msg">*{fieldState.error.message}</p>}
                </div>
            )}
        />
    )
}
