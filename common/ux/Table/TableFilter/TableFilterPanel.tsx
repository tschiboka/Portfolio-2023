import { forwardRef, useImperativeHandle, useState } from 'react'
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

export type TableFilterPanelHandle = {
    submit: () => void
    reset: () => void
}

type TableFilterPanelProps = {
    id?: string
    filtering: TableFiltering
}

export const TableFilterPanel = forwardRef<TableFilterPanelHandle, TableFilterPanelProps>(
    ({ id, filtering }, ref) => {
        const [values, setValues] = useState<FilterValues>(() => buildDefaults(filtering.inputs))

        const handleChange = (key: string, value: unknown) => {
            setValues((prev) => ({ ...prev, [key]: value }))
        }

        const handleSubmit = () => filtering.onFilter(values)

        const handleReset = () => {
            const defaults = buildDefaults(filtering.inputs)
            setValues(defaults)
            filtering.onFilter(defaults)
        }

        useImperativeHandle(ref, () => ({ submit: handleSubmit, reset: handleReset }))

        return (
            <div id={id} className="table-filter-panel" role="search" aria-label="Table filters">
                <div className="table-filter-panel__inputs">
                    {filtering.inputs.map((input) => (
                        <div
                            key={input.key}
                            className={
                                input.span && input.span > 1
                                    ? `table-filter-panel__input--span-${input.span}`
                                    : undefined
                            }
                        >
                            <FilterInput
                                input={input}
                                value={values[input.key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    },
)
