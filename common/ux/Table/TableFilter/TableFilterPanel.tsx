import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import type { TableFilteringInput, TableFiltering } from '../Table.types'
import { FilterInput } from './FilterInput'
import './TableFilterPanel.styles.css'
import type { Dictionary } from '@utils'

type FilterValues = Dictionary

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

// Fill any unset/undefined filter value with its input's default so inputs render controlled.
const normalizeValues = (inputs: TableFilteringInput[], values: FilterValues): FilterValues =>
    Object.fromEntries(
        inputs.map((input) => [input.key, values[input.key] ?? getDefaultValue(input)]),
    )

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
        const [values, setValues] = useState<FilterValues>(() =>
            normalizeValues(filtering.inputs, filtering.values ?? {}),
        )

        // Keep the form in sync when the applied filters change externally (URL hydration,
        // back/forward), without clobbering the user's in-progress draft (only committed
        // `filtering.values` changes trigger this).
        useEffect(() => {
            setValues(normalizeValues(filtering.inputs, filtering.values ?? {}))
        }, [filtering.inputs, filtering.values])

        const handleChange = (key: string, value: unknown) => {
            setValues((prev) => ({ ...prev, [key]: value }))
        }

        const handleReset = useCallback(() => {
            const defaults = buildDefaults(filtering.inputs)
            setValues(defaults)
            filtering.onFilter(defaults)
        }, [filtering])

        const handleSubmit = useCallback(() => filtering.onFilter(values), [filtering, values])

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
