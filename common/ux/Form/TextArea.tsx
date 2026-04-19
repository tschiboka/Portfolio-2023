import { Control, Controller, Path } from 'react-hook-form'
import { FieldValues } from './Form.types'
import type { AccessibleProps } from '../index.types'
import './Form.styles.css'

export const DEFAULT_TEXTAREA_ROWS = 3

type TextAreaProps<TFieldValues extends FieldValues = FieldValues> = AccessibleProps & {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    placeholder?: string
    maxLength?: number
    rows?: number
}

export const TextArea = <T extends FieldValues>({
    name,
    control,
    maxLength,
    rows = DEFAULT_TEXTAREA_ROWS,
    ariaLabel,
    className,
    style,
    ...rest
}: TextAreaProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div
                aria-label={ariaLabel}
                className={className ?? 'wrapped-component wrapped-textarea'}
                style={style}
            >
                <div className="wrapped-input">
                    <textarea
                        id={name}
                        data-gramm="false"
                        data-gramm_editor="false"
                        data-enable-grammarly="false"
                        maxLength={maxLength}
                        rows={rows}
                        {...rest}
                        {...field}
                    />
                </div>
                {maxLength && (
                    <span className="textarea__info">
                        <span className="highlight">{field.value.length} </span>
                        of {maxLength} characters
                    </span>
                )}
                {fieldState.error && <p className="error-msg">*{fieldState.error.message}</p>}
            </div>
        )}
    />
)
