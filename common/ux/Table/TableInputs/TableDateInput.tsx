import './TableInput.styles.css'

type TableDateInputProps = {
    id: string
    label: string
    value: string
    required?: boolean
    min?: string
    max?: string
    onChange: (value: string) => void
}

export const TableDateInput = ({
    id,
    label,
    value,
    required,
    min,
    max,
    onChange,
}: TableDateInputProps) => (
    <div className="table-filter-field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="date"
            required={required}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
)
