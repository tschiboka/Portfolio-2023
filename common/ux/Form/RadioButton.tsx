import { Control, Controller, Path } from 'react-hook-form'
import { FieldValues } from './Form.types'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

type RadioButtonProps<TFieldValues extends FieldValues = FieldValues> = AccessibleProps & {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    value: string | boolean
    onChange: (value?: string) => void
}

export const RadioButton = <T extends FieldValues>({
    name,
    control,
    value,
    onChange,
    ariaLabel,
    className,
    style,
}: RadioButtonProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value: fieldValue, onChange: onChangeFn } }) => (
                <input
                    type="radio"
                    name={name}
                    aria-label={ariaLabel}
                    className={className}
                    style={style}
                    checked={fieldValue == value}
                    onChange={() => {
                        onChangeFn(value)
                        onChange()
                    }}
                />
            )}
        />
    )
}
