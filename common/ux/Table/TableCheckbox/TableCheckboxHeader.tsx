import { isEmpty } from '@common-utils'
import { TableCheckboxSelectors } from './TableCheckbox.selectors'
import type { ReactNode } from 'react'
import type { TableSelection } from '../Table.types'
import './TableCheckbox.styles.css'

const { getAllSelected, getSelectableIds } = TableCheckboxSelectors

type TableCheckboxHeaderProps<TData extends Record<string, ReactNode>, TContext> = {
    data: TData[]
    selection: TableSelection<TData, TContext>
    context?: TContext
}

export const TableCheckboxHeader = <TData extends Record<string, ReactNode>, TContext>({
    data,
    selection,
    context,
}: TableCheckboxHeaderProps<TData, TContext>) => {
    const { mode = 'multiple', selectedRowIds, onChange } = selection
    const ctx = { data, selection, context }

    const selectableIds = getSelectableIds(ctx)
    const allSelected = getAllSelected(ctx)

    if (mode === 'single') return <th className="select-col" scope="col" aria-label="Select" />

    const handleToggleAll = () => {
        if (allSelected) {
            onChange(selectedRowIds.filter((id) => !selectableIds.includes(id)))
        } else {
            onChange([...new Set([...selectedRowIds, ...selectableIds])])
        }
    }

    return (
        <th className="select-col" scope="col">
            <input
                type="checkbox"
                className="select-checkbox"
                checked={allSelected}
                aria-label="Select all rows"
                disabled={isEmpty(selectableIds)}
                onChange={handleToggleAll}
            />
        </th>
    )
}
