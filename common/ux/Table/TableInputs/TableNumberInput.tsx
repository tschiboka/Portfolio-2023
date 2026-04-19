import './TableInput.styles.css'

type TableNumberInputProps = {
    id: string
    label: string
    value: string | number
    placeholder?: string
    required?: boolean
    min?: number
    max?: number
    onChange: (value: number | '') => void
}

export const TableNumberInput = ({
    id,
    label,
    value,
    placeholder,
    required,
    min,
    max,
    onChange,
}: TableNumberInputProps) => (
    <div className="table-filter-field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="number"
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
    </div>
)
