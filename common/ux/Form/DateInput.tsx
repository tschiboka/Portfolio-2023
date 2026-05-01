import { useEffect, useRef, useState } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import { BsCalendar3, BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs'
import { FieldValues } from './Form.types'
import type { AccessibleProps } from '../index.types'
import {
    getDaysInMonth,
    getFirstDayOfMonth,
    formatDate,
    parseDate,
    toISODate,
} from './DateInput.utils'
import './Form.styles.css'

type DateInputProps<TFieldValues extends FieldValues = FieldValues> = AccessibleProps & {
    name: Path<TFieldValues>
    control: Control<TFieldValues>
    placeholder?: string
    min?: string
    max?: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const CALENDAR_HEIGHT = 320

export const DateInput = <T extends FieldValues>({
    name,
    control,
    placeholder = 'dd/mm/yyyy',
    min,
    max,
    ariaLabel,
    className,
    style,
}: DateInputProps<T>) => {
    const [open, setOpen] = useState(false)
    const [flipUp, setFlipUp] = useState(false)
    const [textValue, setTextValue] = useState('')
    const [viewYear, setViewYear] = useState(new Date().getFullYear())
    const [viewMonth, setViewMonth] = useState(new Date().getMonth())
    const [focusedDay, setFocusedDay] = useState<number | null>(null)
    const [yearPickerOpen, setYearPickerOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const yearListRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
                setYearPickerOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Scroll selected year into view
    useEffect(() => {
        if (yearPickerOpen && yearListRef.current) {
            const selected = yearListRef.current.querySelector('.selected')
            if (selected) {
                selected.scrollIntoView({ block: 'center' })
            }
        }
    }, [yearPickerOpen])

    const handleOpen = () => {
        if (!open) {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect) {
                const spaceBelow = window.innerHeight - rect.bottom
                setFlipUp(spaceBelow < CALENDAR_HEIGHT)
            }
        }
        setOpen(!open)
        setYearPickerOpen(false)
    }

    const handleTextChange = (value: string, onChange: (val: string) => void) => {
        const digits = value.replace(/[^\d]/g, '')
        const isDeleting = digits.length < textValue.replace(/[^\d]/g, '').length

        let formatted = ''
        if (isDeleting) {
            // When deleting, just strip non-digits and reformat without auto-adding slashes
            for (let i = 0; i < digits.length && i < 8; i++) {
                if (i === 2 || i === 4) formatted += '/'
                formatted += digits[i]
            }
        } else {
            for (let i = 0; i < digits.length && i < 8; i++) {
                if (i === 2 || i === 4) formatted += '/'
                formatted += digits[i]
            }
            // Auto-add slash after 2nd and 4th digit when typing
            if (digits.length === 2 || digits.length === 4) {
                formatted += '/'
            }
        }

        setTextValue(formatted)

        const iso = parseDate(formatted)
        if (iso) {
            onChange(iso)
            const [y, m] = iso.split('-').map(Number)
            setViewYear(y)
            setViewMonth(m - 1)
        } else if (formatted === '') {
            onChange('')
        }
    }

    const handleDayClick = (day: number, onChange: (val: string) => void) => {
        const iso = toISODate(viewYear, viewMonth, day)

        // Check min/max
        if (min && iso < min) return
        if (max && iso > max) return

        onChange(iso)
        setTextValue(formatDate(iso))
        setOpen(false)
        setYearPickerOpen(false)
    }

    const handlePrevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11)
            setViewYear(viewYear - 1)
        } else {
            setViewMonth(viewMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0)
            setViewYear(viewYear + 1)
        } else {
            setViewMonth(viewMonth + 1)
        }
    }

    const handleToday = (onChange: (val: string) => void) => {
        const today = new Date()
        const iso = toISODate(today.getFullYear(), today.getMonth(), today.getDate())
        onChange(iso)
        setTextValue(formatDate(iso))
        setViewYear(today.getFullYear())
        setViewMonth(today.getMonth())
        setOpen(false)
        setYearPickerOpen(false)
    }

    const handleClear = (onChange: (val: string) => void) => {
        onChange('')
        setTextValue('')
    }

    const handleKeyDown = (
        e: React.KeyboardEvent,
        daysInMonth: number,
        onChange: (val: string) => void,
    ) => {
        if (!open) return

        const current = focusedDay ?? 1

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault()
                setFocusedDay(current > 1 ? current - 1 : daysInMonth)
                break
            case 'ArrowRight':
                e.preventDefault()
                setFocusedDay(current < daysInMonth ? current + 1 : 1)
                break
            case 'ArrowUp':
                e.preventDefault()
                setFocusedDay(current > 7 ? current - 7 : current + daysInMonth - 7)
                break
            case 'ArrowDown':
                e.preventDefault()
                setFocusedDay(current + 7 <= daysInMonth ? current + 7 : current - daysInMonth + 7)
                break
            case 'Enter':
                e.preventDefault()
                handleDayClick(current, onChange)
                break
            case 'Escape':
                e.preventDefault()
                setOpen(false)
                setYearPickerOpen(false)
                break
        }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false)
            setYearPickerOpen(false)
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                // Derive display from field value when textValue hasn't been manually set
                const displayValue = field.value ? formatDate(field.value as string) : ''
                const inputValue = textValue || displayValue

                const daysInMonth = getDaysInMonth(viewYear, viewMonth)
                const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
                const today = new Date()
                const todayISO = toISODate(today.getFullYear(), today.getMonth(), today.getDate())
                const selectedISO = field.value as string

                return (
                    <div
                        ref={containerRef}
                        aria-label={ariaLabel}
                        className={`date-input${open ? ' picker-open' : ''} ${className ?? 'wrapped-component'}`}
                        style={style}
                    >
                        <div className="wrapped-input">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={placeholder}
                                value={inputValue}
                                onChange={(e) => handleTextChange(e.target.value, field.onChange)}
                                onKeyDown={handleInputKeyDown}
                            />
                            <div className="action-icon date-input__icon" onClick={handleOpen}>
                                <BsCalendar3 />
                            </div>
                        </div>

                        {open && (
                            <div
                                ref={calendarRef}
                                className={`date-input__calendar${flipUp ? ' flip-up' : ''}`}
                                onKeyDown={(e) => handleKeyDown(e, daysInMonth, field.onChange)}
                            >
                                <div className="date-input__header">
                                    <button type="button" onClick={handlePrevMonth}>
                                        <BsChevronLeft />
                                    </button>
                                    <button
                                        type="button"
                                        className="date-input__month-year-btn"
                                        onClick={() => setYearPickerOpen(!yearPickerOpen)}
                                    >
                                        {MONTHS[viewMonth]} {viewYear}
                                    </button>
                                    <button type="button" onClick={handleNextMonth}>
                                        <BsChevronRight />
                                    </button>
                                </div>

                                {yearPickerOpen ? (
                                    <div className="date-input__year-picker">
                                        <div className="date-input__year-list" ref={yearListRef}>
                                            {Array.from({ length: 201 }, (_, i) => 1900 + i).map(
                                                (y) => (
                                                    <button
                                                        key={y}
                                                        type="button"
                                                        className={`date-input__year-option${y === viewYear ? ' selected' : ''}`}
                                                        onClick={() => setViewYear(y)}
                                                    >
                                                        {y}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                        <div className="date-input__month-list">
                                            {MONTHS.map((m, i) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    className={`date-input__month-option${i === viewMonth ? ' selected' : ''}`}
                                                    onClick={() => {
                                                        setViewMonth(i)
                                                        setYearPickerOpen(false)
                                                    }}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="date-input__days-header">
                                            {DAYS.map((d) => (
                                                <span key={d}>{d}</span>
                                            ))}
                                        </div>
                                        <div className="date-input__grid" role="grid" tabIndex={0}>
                                            {Array.from({ length: firstDay }).map((_, i) => (
                                                <span
                                                    key={`empty-${i}`}
                                                    className="date-input__empty"
                                                />
                                            ))}
                                            {Array.from({ length: daysInMonth }, (_, i) => {
                                                const day = i + 1
                                                const iso = toISODate(viewYear, viewMonth, day)
                                                const isSelected = iso === selectedISO
                                                const isToday = iso === todayISO
                                                const dayOfWeek = (firstDay + i) % 7
                                                const isWeekend = dayOfWeek >= 5
                                                const isDisabled =
                                                    (min && iso < min) || (max && iso > max)
                                                const isFocused = day === focusedDay

                                                const classes = [
                                                    'date-input__day',
                                                    isSelected && 'selected',
                                                    isToday && 'today',
                                                    isWeekend ? 'weekend' : 'weekday',
                                                    isDisabled && 'disabled',
                                                    isFocused && 'focused',
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')

                                                return (
                                                    <button
                                                        key={day}
                                                        type="button"
                                                        className={classes}
                                                        onClick={() =>
                                                            !isDisabled &&
                                                            handleDayClick(day, field.onChange)
                                                        }
                                                        onMouseEnter={() => setFocusedDay(day)}
                                                    >
                                                        {day}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}

                                <div className="date-input__footer">
                                    <button
                                        type="button"
                                        className="date-input__footer-btn"
                                        onClick={() => handleToday(field.onChange)}
                                    >
                                        Today
                                    </button>
                                    <button
                                        type="button"
                                        className="date-input__footer-btn date-input__footer-btn--clear"
                                        onClick={() => handleClear(field.onChange)}
                                        disabled={!textValue}
                                    >
                                        <BsX /> Clear
                                    </button>
                                </div>
                            </div>
                        )}
                        {fieldState.error && (
                            <p className="error-msg">*{fieldState.error.message}</p>
                        )}
                    </div>
                )
            }}
        />
    )
}
