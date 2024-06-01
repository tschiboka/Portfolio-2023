import { Control, Controller, Path } from 'react-hook-form'
import { BsEye, BsEyeSlash, BsSearch } from 'react-icons/bs'
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import './WrappedFormComponents.scss'

type FieldValues = Record<string, any>
export type SearchInputOption = {
    name: string
    value: string
    icon?: ReactNode
}

type WrappedSearchInputProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    options: SearchInputOption[]
    icon?: ReactNode
    control: Control<TFieldValues>
    placeholder?: string
    highlightMatch?: boolean
    onSelect: (value: string) => void
}

export const WrappedSearchInput = <T extends FieldValues>({
    name,
    options,
    icon,
    control,
    onSelect,
    placeholder,
    highlightMatch = false,
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

    const filteredOptions = (text: string) =>
        options.filter((option) =>
            option.name
                .toUpperCase()
                .replace(/\s/g, '')
                .includes(text.replace(/\s/g, '').toUpperCase()),
        )

    const getOptions = (options: SearchInputOption[], input: string) =>
        options.map((option) => (
            <div
                className="option"
                key={option.name}
                onClick={() => onSelect(option.name)}
            >
                {option.icon && <span className="icon">{option.icon}</span>}
                {highlightMatch
                    ? getHighlightedSearchOptionText(
                          option.value.toLowerCase(),
                          input.toLocaleLowerCase(),
                      )
                    : option.value}
            </div>
        ))

    const getHighlightedSearchOptionText = (
        text: string,
        input: string,
    ): ReactNode => {
        const prefix = text.split(input)[0]
        const suffixIndex = prefix.length + input.length
        const suffix = text.substring(suffixIndex)
        return (
            <span>
                {prefix}
                <span className="highlight">{input}</span>
                {suffix}
            </span>
        )
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
                                placeholder={placeholder}
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
                                {filteredOptions(value) &&
                                filteredOptions(value).length > 0 ? (
                                    getOptions(filteredOptions(value), value)
                                ) : (
                                    <div className="option">
                                        No match in selection
                                    </div>
                                )}
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
