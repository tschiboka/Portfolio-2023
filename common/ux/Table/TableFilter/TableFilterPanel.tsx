import { useState, useEffect } from 'react'
import type { TableFilteringInput, TableFiltering } from '../Table.types'
import { FilterInput } from './FilterInput'
import './TableFilterPanel.styles.css'

type FilterValues = Record<string, unknown>

const getDefaultValue = (input: TableFilteringInput): unknown => {
    switch (input.type) {
        case 'checkbox':
            return false
        case 'option':
            return ''
        default:
            return ''
    }
}

const buildDefaults = (inputs: TableFilteringInput[]): FilterValues =>
    Object.fromEntries(inputs.map((i) => [i.key, getDefaultValue(i)]))

type TableFilterPanelProps = {
    id?: string
    filtering: TableFiltering
    resetKey: number
}

export const TableFilterPanel = ({ id, filtering, resetKey }: TableFilterPanelProps) => {
    const [values, setValues] = useState<FilterValues>(() => buildDefaults(filtering.inputs))

    useEffect(() => {
        if (resetKey > 0) {
            const defaults = buildDefaults(filtering.inputs)
            setValues(defaults)
            filtering.onFilter(defaults)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey])

    const handleChange = (key: string, value: unknown) => {
        const next = { ...values, [key]: value }
        setValues(next)
        filtering.onFilter(next)
    }

    return (
        <div id={id} className="table-filter-panel" role="search" aria-label="Table filters">
            <div className="table-filter-panel__inputs">
                {filtering.inputs.map((input) => (
                    <FilterInput
                        key={input.key}
                        input={input}
                        value={values[input.key]}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    )
}
