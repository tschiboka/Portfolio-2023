import './TableInput.styles.css'

type TableTextInputProps = {
    id: string
    label: string
    value: string
    placeholder?: string
    required?: boolean
    onChange: (value: string) => void
}

export const TableTextInput = ({
    id,
    label,
    value,
    placeholder,
    required,
    onChange,
}: TableTextInputProps) => (
    <div className="table-filter-field">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type="text"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
)
