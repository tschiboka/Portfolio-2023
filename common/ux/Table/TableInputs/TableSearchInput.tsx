import './TableInput.styles.css'

type TableSearchInputProps = {
    id: string
    label: string
    value: string
    placeholder?: string
    required?: boolean
    onChange: (value: string) => void
}

export const TableSearchInput = ({
    id,
    label,
    value,
    placeholder,
    required,
    onChange,
}: TableSearchInputProps) => (
    <div className="table-filter-field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="search"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
)
