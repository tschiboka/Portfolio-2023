import type { TableFilteringInput } from '../Table.types'
import { TableTextInput } from '../TableInputs/TableTextInput'
import { TableNumberInput } from '../TableInputs/TableNumberInput'
import { TableSearchInput } from '../TableInputs/TableSearchInput'
import { TableDateInput } from '../TableInputs/TableDateInput'
import { TableSelectInput } from '../TableInputs/TableSelectInput'
import { TableCheckboxInput } from '../TableInputs/TableCheckboxInput'

type FilterInputProps = {
    input: TableFilteringInput
    value: unknown
    onChange: (key: string, value: unknown) => void
}

export const FilterInput = ({ input, value, onChange }: FilterInputProps) => {
    const id = `filter-${input.key}`

    switch (input.type) {
        case 'text':
            return (
                <TableTextInput
                    id={id}
                    label={input.label}
                    value={String(value ?? '')}
                    placeholder={input.placeholder}
                    required={input.required}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
        case 'number':
            return (
                <TableNumberInput
                    id={id}
                    label={input.label}
                    value={value as number | ''}
                    placeholder={input.placeholder}
                    required={input.required}
                    min={input.min}
                    max={input.max}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
        case 'search':
            return (
                <TableSearchInput
                    id={id}
                    label={input.label}
                    value={String(value ?? '')}
                    placeholder={input.placeholder}
                    required={input.required}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
        case 'date':
            return (
                <TableDateInput
                    id={id}
                    label={input.label}
                    value={String(value ?? '')}
                    required={input.required}
                    min={input.min}
                    max={input.max}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
        case 'option':
            return (
                <TableSelectInput
                    id={id}
                    label={input.label}
                    value={String(value ?? '')}
                    options={input.options}
                    required={input.required}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
        case 'checkbox':
            return (
                <TableCheckboxInput
                    id={id}
                    label={input.label}
                    checked={Boolean(value)}
                    onChange={(v) => onChange(input.key, v)}
                />
            )
    }
}
