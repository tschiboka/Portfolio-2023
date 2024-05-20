import { Control, Controller, Path } from 'react-hook-form'
import './WrappedFormComponents.scss'
import { BsEye, BsEyeSlash, BsSearch } from 'react-icons/bs'
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'

type FieldValues = Record<string, any>
type Option = { name: string; value: ReactNode | string }

type WrappedSearchInputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    placeholder?: string
    options: Option[]
    onSelect: (value: string) => void
}

export const WrappedSearchInput = <T extends FieldValues>({
    name,
    control,
    options,
    onSelect,
    ...rest
}: WrappedSearchInputProps<T>) => {
    const [open, setOpen] = useState(false)
    const openClassStr = open ? 'open' : 'closed'
    const containerRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const {
                    onBlur: fieldOnBlur,
                    onChange: fieldOnChange,
                    value,
                    ...restFieldProps
                } = field

                const handleOnBlur = () => fieldOnBlur?.()
                const handleOnChange = (
                    event: ChangeEvent<HTMLInputElement>,
                ) => {
                    fieldOnChange?.(event)
                    setOpen(true)
                }

                return (
                    <div
                        ref={containerRef}
                        className={'wrapped-component ' + openClassStr}
                    >
                        <div className="wrapped-input">
                            <input
                                id={name}
                                type="text"
                                value={value}
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                {...rest}
                                {...restFieldProps}
                            />
                            <div className="action-icon">
                                <BsSearch onClick={() => setOpen(!open)} />
                            </div>
                        </div>
                        {open && (
                            <div className="option-dropdown">
                                {options
                                    .filter((option) =>
                                        option.name
                                            .toUpperCase()
                                            .replace(/\s/g, '')
                                            .includes(
                                                value
                                                    .replace(/\s/g, '')
                                                    .toUpperCase(),
                                            ),
                                    )
                                    .map((option) => (
                                        <div
                                            className="option"
                                            key={option.name}
                                            onClick={() =>
                                                onSelect(option.name)
                                            }
                                        >
                                            {option.value}
                                        </div>
                                    ))}
                            </div>
                        )}
                        {fieldState.error && (
                            <p className="error-msg">
                                *{fieldState.error.message}
                            </p>
                        )}
                    </div>
                )
            }}
        />
    )
}

type WrappedInputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    type: 'text' | 'email' | 'number' | 'search' | 'tel' | 'password' | 'date'
    autoComplete?: string
    placeholder?: string
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
                            className="action-icon"
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
