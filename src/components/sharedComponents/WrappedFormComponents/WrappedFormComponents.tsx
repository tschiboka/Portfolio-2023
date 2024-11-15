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

export type FieldValues = Record<string, any>
export type SearchInputOption = {
    label: string
    value: string
    icon?: ReactNode
    iconColor?: string
}

type WrappedRadioButtonProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    value: string | boolean
    onChange: (value?: string) => void
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
    colorSelection?: boolean
    control: Control<TFieldValues>
    placeholder?: string
    highlightMatch?: boolean
    onSelect: (option: SearchInputOption) => void
}

export const WrappedSearchInput = <TFieldValues extends FieldValues>({
    name,
    options,
    buttonIcon = 'magnifyingglass',
    icon,
    showIconWithInput = true,
    colorSelection = false,
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
                    <BsChevronBarUp onClick={() => setOpen(!open)} />
                ) : (
                    <BsChevronBarDown onClick={() => setOpen(!open)} />
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

    const filteredOptions = (text: string = '') =>
        options.filter((option) =>
            (option.label || '')
                .toUpperCase()
                .replace(/\s/g, '')
                .includes(text.replace(/\s/g, '').toUpperCase()),
        )

    const getOptions = (options: SearchInputOption[], input: string) =>
        options.map((option) => (
            <div
                className="option"
                key={option.label}
                onClick={() => {
                    setOpen(false)
                    onSelect(option)
                }}
            >
                {option.icon && (
                    <span className="icon" style={{ color: option.iconColor }}>
                        {option.icon}
                    </span>
                )}
                {highlightMatch
                    ? getHighlightedSearchOptionText(
                          option.label.toLowerCase(),
                          (input || '').toLocaleLowerCase(),
                      )
                    : option.label}
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

    const getLabel = (options: SearchInputOption[], value: string) =>
        options.find((o) => o.label === value)?.label

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
                                'wrapped-input ' +
                                (showIconWithInput ? 'show-input-icon' : '')
                            }
                        >
                            {showIconWithInput &&
                                (open || (!open && field.value)) && (
                                    <div className="show-icon">
                                        {options.find(
                                            (o: SearchInputOption) =>
                                                o.label === value,
                                        )?.icon || colors[field.value]}
                                    </div>
                                )}
                            <input
                                id={name}
                                type="text"
                                className={
                                    (showIconWithInput && field.value) || open
                                        ? 'icon-padding'
                                        : ''
                                }
                                value={
                                    getLabel(options, field.value) ||
                                    field.value
                                }
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
                        {!open && fieldState.error && (
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

type WrappedTextAreaProps<TFieldValues extends FieldValues = FieldValues> = {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    placeholder?: string
    maxLength?: number
    rows?: number
}

export const WrappedTextArea = <T extends FieldValues>({
    name,
    control,
    maxLength,
    rows = 3,
    ...rest
}: WrappedTextAreaProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div className="wrapped-component wrapped-textarea">
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
                {fieldState.error && (
                    <p className="error-msg">*{fieldState.error.message}</p>
                )}
            </div>
        )}
    />
)
