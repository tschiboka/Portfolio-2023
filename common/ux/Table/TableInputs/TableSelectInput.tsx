import { TableDropdown, type DropdownOption } from './TableDropdown'
import './TableInput.styles.css'

type TableSelectInputProps = {
    id: string
    label: string
    value: string | number
    options: DropdownOption[]
    required?: boolean
    onChange: (value: DropdownOption['value']) => void
}

export const TableSelectInput = ({
    id,
    label,
    value,
    options,
    required,
    onChange,
}: TableSelectInputProps) => (
    <div className="table-filter-field">
        <label htmlFor={id}>{label}</label>
        <TableDropdown
            options={[{ value: '', label: 'All' }, ...options]}
            value={value}
            onChange={onChange}
            ariaLabel={label}
        />
        {required && !value && <input type="hidden" required aria-hidden="true" value="" />}
    </div>
)
