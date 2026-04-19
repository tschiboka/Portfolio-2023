import { type ReactNode, useEffect, useId, useRef, useState } from 'react'
import './TableDropdown.styles.css'

export type DropdownOption = {
    label: string
    value: string | number
}

type DropdownVariant = 'default' | 'ghost'

type TableDropdownProps = {
    options: DropdownOption[]
    value?: string | number
    onChange: (value: DropdownOption['value']) => void
    ariaLabel: string
    icon?: ReactNode
    variant?: DropdownVariant
}

export const TableDropdown = ({
    options,
    value,
    onChange,
    ariaLabel,
    icon,
    variant = 'default',
}: TableDropdownProps) => {
    const [open, setOpen] = useState(false)
    const [direction, setDirection] = useState<'up' | 'down'>('up')
    const ref = useRef<HTMLDivElement>(null)
    const listboxId = useId()
    const selected = options.find((o) => o.value === value)

    useEffect(() => {
        if (!open) return
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', close)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', close)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    const handleToggle = () => {
        if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const spaceAbove = rect.top
            const spaceBelow = window.innerHeight - rect.bottom
            setDirection(spaceBelow >= spaceAbove ? 'down' : 'up')
        }
        setOpen((o) => !o)
    }

    return (
        <div
            className={`table-dropdown table-dropdown--${direction} table-dropdown--${variant}`}
            ref={ref}
        >
            <button
                type="button"
                className="table-dropdown__trigger"
                aria-label={ariaLabel}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
                onClick={handleToggle}
            >
                {icon ?? selected?.label ?? value}
                <span className="table-dropdown__arrow" aria-hidden="true" />
            </button>
            {open && (
                <ul
                    id={listboxId}
                    className="table-dropdown__menu"
                    role="listbox"
                    aria-label={ariaLabel}
                >
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={opt.value === value}
                            className={opt.value === value ? 'active' : ''}
                            onClick={() => {
                                onChange(opt.value)
                                setOpen(false)
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
