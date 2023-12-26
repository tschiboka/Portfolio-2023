import { Control, Controller, Path } from 'react-hook-form'
import './WrappedFormComponents.scss'

type FieldValues = Record<string, any>
type WrappedInputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    type: 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'
    autoComplete?: string
}

export const WrappedInput = <T extends FieldValues>({
    name,
    control,
    autoComplete,
    ...rest
}: WrappedInputProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div className="wrapped-component">
                <input
                    id={name}
                    autoComplete={autoComplete}
                    {...rest}
                    {...field}
                />
                {fieldState.error && (
                    <p className="error-msg">*{fieldState.error.message}</p>
                )}
            </div>
        )}
    />
)
