import './TableInput.styles.css'

type TableCheckboxInputProps = {
    id: string
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export const TableCheckboxInput = ({ id, label, checked, onChange }: TableCheckboxInputProps) => (
    <div className="table-filter-field table-filter-field--checkbox">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
        <label htmlFor={id}>{label}</label>
    </div>
)
