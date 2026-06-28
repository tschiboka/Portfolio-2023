import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { Accessor } from '../Accessor/Accessor'
import { Table as TableComponent } from '../../Table'
import type { Table as TableProps } from '../../Table/Table.types'

class TableAccessor extends Accessor {
    get Get() {
        return {
            ...super.Get,
            // Structure
            table: () => this.scope.getByRole('table'),
            heading: (name: string) => this.scope.getByRole('heading', { name }),
            columnHeaders: () => this.scope.getAllByRole('columnheader'),
            emptyState: () => this.scope.getByRole('status'),
            infoButton: () => this.scope.getByRole('button', { name: 'More information' }),

            // Refresh
            refreshButton: () => this.scope.getByRole('button', { name: 'Refresh data' }),

            // Skeleton — rows are aria-hidden, detect by class
            skeleton: () => this.element.querySelector('.table-skeleton-row') as HTMLElement | null,

            // Column resize
            resizeHandle: (colIndex: number) =>
                this.scope
                    .getAllByRole('columnheader')
                    [colIndex]?.querySelector('.th-resize-handle') as HTMLElement | null,

            // Column reorder
            reorderLeftButton: (header: string) =>
                this.scope.getByRole('button', { name: `Move ${header} left` }),
            reorderRightButton: (header: string) =>
                this.scope.getByRole('button', { name: `Move ${header} right` }),

            // Selection
            selectAll: () => this.scope.getByRole('checkbox', { name: 'Select all rows' }),
            selectRow: (n: number) => this.scope.getByRole('checkbox', { name: `Select row ${n}` }),

            // Actions
            actionButtons: () => this.scope.getAllByRole('button', { name: 'Row actions' }),
            actionButton: (index = 0) =>
                this.scope.getAllByRole('button', { name: 'Row actions' })[index],
            menu: () => Accessor.screen.getByRole('menu'),
            menuItem: (label: string) => Accessor.screen.getByRole('menuitem', { name: label }),

            // Sorting
            sortButton: (header: string) =>
                this.scope.getByRole('button', { name: `Sort by ${header}` }),

            // Filtering
            filterToggle: () => this.scope.getByRole('button', { name: 'Toggle filters' }),
            filterPanel: () => this.scope.getByRole('search', { name: 'Table filters' }),
            applyFilters: () => this.scope.getByRole('button', { name: 'Apply filters' }),
            resetFilters: () => this.scope.getByRole('button', { name: 'Reset filters' }),

            // Download
            downloadButton: (label = 'Download') => this.scope.getByRole('button', { name: label }),

            // Expand
            expandButtons: () => this.scope.getAllByRole('button', { name: 'Expand row' }),
            expandButton: (index = 0) =>
                this.scope.getAllByRole('button', { name: 'Expand row' })[index],
            expandedRow: (n: number) =>
                this.scope.getByRole('row', { name: `Expanded details for row ${n}` }),

            // Pagination
            pagination: () => this.scope.getByRole('navigation', { name: 'Table pagination' }),
            pageButton: (n: number) => this.scope.getByRole('button', { name: `Page ${n}` }),
            firstPage: () => this.scope.getByRole('button', { name: 'First page' }),
            prevPage: () => this.scope.getByRole('button', { name: 'Previous page' }),
            nextPage: () => this.scope.getByRole('button', { name: 'Next page' }),
            lastPage: () => this.scope.getByRole('button', { name: 'Last page' }),
        }
    }

    get Do() {
        return {
            ...super.Do,
            clickActionButton: async (index = 0) => {
                await Accessor.user.click(this.Get.actionButton(index))
            },
            clickMenuItem: async (label: string) => {
                await Accessor.user.click(this.Get.menuItem(label))
            },
            clickAction: async (label: string, index = 0) => {
                await Accessor.user.click(this.Get.actionButton(index))
                await Accessor.user.click(this.Get.menuItem(label))
            },
            toggleFilters: async () => {
                await Accessor.user.click(this.Get.filterToggle())
            },
            resetFilters: async () => {
                await Accessor.user.click(this.Get.resetFilters())
            },
            applyFilters: async () => {
                await Accessor.user.click(this.Get.applyFilters())
            },
            expandRow: async (index = 0) => {
                await Accessor.user.click(this.Get.expandButton(index))
            },
            selectRow: async (n: number) => {
                await Accessor.user.click(this.Get.selectRow(n))
            },
            selectAll: async () => {
                await Accessor.user.click(this.Get.selectAll())
            },
            sortBy: async (header: string) => {
                await Accessor.user.click(this.Get.sortButton(header))
            },
            goToPage: async (n: number) => {
                await Accessor.user.click(this.Get.pageButton(n))
            },
            goToFirstPage: async () => {
                await Accessor.user.click(this.Get.firstPage())
            },
            goToPrevPage: async () => {
                await Accessor.user.click(this.Get.prevPage())
            },
            goToNextPage: async () => {
                await Accessor.user.click(this.Get.nextPage())
            },
            goToLastPage: async () => {
                await Accessor.user.click(this.Get.lastPage())
            },
            clickInfoButton: async () => {
                await Accessor.user.click(this.Get.infoButton())
            },
            refresh: async () => {
                await Accessor.user.click(this.Get.refreshButton())
            },
            reorderLeft: async (header: string) => {
                await Accessor.user.click(this.Get.reorderLeftButton(header))
            },
            reorderRight: async (header: string) => {
                await Accessor.user.click(this.Get.reorderRightButton(header))
            },
            download: async (label?: string) => {
                await Accessor.user.click(this.Get.downloadButton(label))
            },
        }
    }
}

// Set is static (renders the component), Get/Do are instance-level (require a rendered element)
export const Table = Object.assign(
    (label: string): TableAccessor => {
        const element = Accessor.screen.getByRole('region', { name: label })
        return new TableAccessor(element, `Table('${label}')`)
    },
    {
        Set: {
            mock: <TData extends Record<string, ReactNode>, TContext = unknown>(
                props: Partial<TableProps<TData, TContext>> & Record<string, unknown>,
            ) =>
                render(
                    <TableComponent<TData, TContext> {...(props as TableProps<TData, TContext>)} />,
                ),
        },
    },
)
