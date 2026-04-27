import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { Table as TableComponent } from '../../Table'
import type { Table as TableProps } from '../../Table/Table.types'

export const Table = {
    Get: {
        byLabel: (label: string) => screen.getByRole('table', { name: label }),

        // Structure
        region: (label?: string) => screen.getByRole('region', label ? { name: label } : {}),
        heading: (name: string) => screen.getByRole('heading', { name }),
        columnHeaders: () => screen.getAllByRole('columnheader'),
        emptyState: () => screen.getByRole('status'),
        infoButton: () => screen.getByRole('button', { name: 'More information' }),

        // Selection
        selectAll: () => screen.getByRole('checkbox', { name: 'Select all rows' }),
        selectRow: (n: number) => screen.getByRole('checkbox', { name: `Select row ${n}` }),

        // Actions
        actionButtons: () => screen.getAllByRole('button', { name: 'Row actions' }),
        actionButton: (index = 0) => screen.getAllByRole('button', { name: 'Row actions' })[index],
        menu: () => screen.getByRole('menu'),
        menuItem: (label: string) => screen.getByRole('menuitem', { name: label }),

        // Sorting
        sortButton: (header: string) => screen.getByRole('button', { name: `Sort by ${header}` }),

        // Filtering
        filterToggle: () => screen.getByRole('button', { name: 'Toggle filters' }),
        filterPanel: () => screen.getByRole('search', { name: 'Table filters' }),
        applyFilters: () => screen.getByRole('button', { name: 'Apply filters' }),
        resetFilters: () => screen.getByRole('button', { name: 'Reset filters' }),

        // Download
        downloadButton: (label = 'Download') => screen.getByRole('button', { name: label }),

        // Expand
        expandButtons: () => screen.getAllByRole('button', { name: 'Expand row' }),
        expandButton: (index = 0) => screen.getAllByRole('button', { name: 'Expand row' })[index],
        expandedRow: (n: number) =>
            screen.getByRole('row', { name: `Expanded details for row ${n}` }),

        // Pagination
        pagination: () => screen.getByRole('navigation', { name: 'Table pagination' }),
        pageButton: (n: number) => screen.getByRole('button', { name: `Page ${n}` }),
        firstPage: () => screen.getByRole('button', { name: 'First page' }),
        prevPage: () => screen.getByRole('button', { name: 'Previous page' }),
        nextPage: () => screen.getByRole('button', { name: 'Next page' }),
        lastPage: () => screen.getByRole('button', { name: 'Last page' }),
    },

    Query: {
        menu: () => screen.queryByRole('menu'),
        menuItem: (label: string) => screen.queryByRole('menuitem', { name: label }),
        heading: () => screen.queryByRole('heading'),
        expandButton: () => screen.queryByRole('button', { name: 'Expand row' }),
        actionButton: () => screen.queryByRole('button', { name: 'Row actions' }),
        filterPanel: () => screen.queryByRole('search'),
        pagination: () => screen.queryByRole('navigation'),
        applyFilters: () => screen.queryByRole('button', { name: 'Apply filters' }),
        resetFilters: () => screen.queryByRole('button', { name: 'Reset filters' }),
        sortButton: (header: string) => screen.queryByRole('button', { name: `Sort by ${header}` }),
    },

    Click: {
        actionButton: async (index = 0) => {
            const user = userEvent.setup()
            await user.click(Table.Get.actionButton(index))
            return user
        },
        menuItem: async (label: string) => {
            const user = userEvent.setup()
            await user.click(Table.Get.menuItem(label))
            return user
        },
        filterToggle: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.filterToggle())
            return user
        },
        resetFilters: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.resetFilters())
            return user
        },
        applyFilters: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.applyFilters())
            return user
        },
        expandButton: async (index = 0) => {
            const user = userEvent.setup()
            await user.click(Table.Get.expandButton(index))
            return user
        },
        selectRow: async (n: number) => {
            const user = userEvent.setup()
            await user.click(Table.Get.selectRow(n))
            return user
        },
        selectAll: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.selectAll())
            return user
        },
        sortButton: async (header: string) => {
            const user = userEvent.setup()
            await user.click(Table.Get.sortButton(header))
            return user
        },
        pageButton: async (n: number) => {
            const user = userEvent.setup()
            await user.click(Table.Get.pageButton(n))
            return user
        },
        firstPage: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.firstPage())
            return user
        },
        prevPage: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.prevPage())
            return user
        },
        nextPage: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.nextPage())
            return user
        },
        lastPage: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.lastPage())
            return user
        },
        infoButton: async () => {
            const user = userEvent.setup()
            await user.click(Table.Get.infoButton())
            return user
        },
        downloadButton: async (label?: string) => {
            const user = userEvent.setup()
            await user.click(Table.Get.downloadButton(label))
            return user
        },
    },

    Act: {
        openActionMenu: async (index = 0) => {
            return Table.Click.actionButton(index)
        },
        clickAction: async (label: string, index = 0) => {
            await Table.Click.actionButton(index)
            return Table.Click.menuItem(label)
        },
        openFilters: async () => {
            return Table.Click.filterToggle()
        },
        applyFilters: async () => {
            return Table.Click.applyFilters()
        },
        expandRow: async (index = 0) => {
            return Table.Click.expandButton(index)
        },
    },

    Set: {
        mock: <TData extends Record<string, ReactNode>, TContext = unknown>(
            props: TableProps<TData, TContext>,
        ) => render(<TableComponent<TData, TContext> {...props} />),
    },
}
