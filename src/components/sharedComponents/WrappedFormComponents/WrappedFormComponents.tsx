import { Control, Controller, Path } from 'react-hook-form'
import {
    BsChevronBarDown,
    BsChevronBarUp,
    BsEye,
    BsEyeSlash,
    BsSearch,
} from 'react-icons/bs'
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import './WrappedFormComponents.scss'
import { colors } from '../../pages/API/Categories/colors'
import { o } from 'ramda'

export type FieldValues = Record<string, any>
export type SearchInputOption = {
    name: string
    value: string
    icon?: ReactNode
    iconColor?: string
}

type WrappedRadioButtonProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    value: string | boolean
    onChange: () => void
}

export const WrappedRadioButton = <T extends FieldValues>({
    name,
    control,
    value,
    onChange,
}: WrappedRadioButtonProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value: fieldValue, onChange: onChangeFn },
            }) => (
                <input
                    type="radio"
                    name={name}
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

type SearchInputOptionButtonIcons = 'arrow' | 'magnifyingglass'

type WrappedSearchInputProps<TFieldValues extends FieldValues> = {
    name: Path<TFieldValues>
    options: SearchInputOption[]
    buttonIcon?: SearchInputOptionButtonIcons
    icon?: ReactNode
    showIconWithInput?: boolean
    control: Control<TFieldValues>
    placeholder?: string
    highlightMatch?: boolean
    onSelect: (value: string) => void
}

export const WrappedSearchInput = <TFieldValues extends FieldValues>({
    name,
    options,
    buttonIcon = 'magnifyingglass',
    icon,
    showIconWithInput = true,
    control,
    onSelect,
    placeholder,
    highlightMatch = false,
    ...rest
}: WrappedSearchInputProps<TFieldValues>) => {
    const [open, setOpen] = useState(false)
    const openClassStr = open ? 'open' : 'closed'
    const containerRef = useRef<HTMLDivElement>(null)

    const mapButtonIcon = (iconName: SearchInputOptionButtonIcons) => {
        switch (iconName) {
            case 'arrow':
                return open ? (
                    <BsChevronBarDown onClick={() => setOpen(!open)} />
                ) : (
                    <BsChevronBarUp onClick={() => setOpen(!open)} />
                )
            case 'magnifyingglass':
                return <BsSearch onClick={() => setOpen(!open)} />
        }
    }

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
                onClick={() => {
                    setOpen(false)
                    onSelect(option.name)
                }}
            >
                {option.icon && (
                    <span className="icon" style={{ color: option.iconColor }}>
                        {option.icon}
                    </span>
                )}
                {highlightMatch
                    ? getHighlightedSearchOptionText(
                          option.name.toLowerCase(),
                          input.toLocaleLowerCase(),
                      )
                    : option.name}
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
                        <div
                            className={
                                'wrapped-input' + showIconWithInput
                                    ? 'show-input-icon'
                                    : ''
                            }
                        >
                            {(showIconWithInput && field.value === '') || (
                                <div className="show-icon">
                                    {options.find((o) => o.name === value)
                                        ?.icon || colors[o.name]}
                                </div>
                            )}
                            <input
                                id={name}
                                type="text"
                                className={
                                    showIconWithInput && field.value
                                        ? 'icon-padding'
                                        : ''
                                }
                                value={value}
                                placeholder={placeholder}
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                {...rest}
                                {...restFieldProps}
                            />
                            <div className="action-icon">
                                {mapButtonIcon(buttonIcon)}
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
