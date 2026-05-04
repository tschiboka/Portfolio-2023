import { screen } from '@testing-library/react'
import {
    getSelectableRows,
    getSelectableIds,
    getAllSelected,
} from '../TableCheckbox/TableCheckbox.selectors'
import { Test } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Selection', () => {
    describe('Multiple selection', () => {
        it('renders checkbox for every row', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            rows.forEach((_, i) => {
                expect(Test.Table.Get.selectRow(i + 1)).toBeInTheDocument()
            })
        })

        it('renders "Select all rows" header checkbox', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.selectAll()).toBeInTheDocument()
        })

        it('calls onChange with row id when a row checkbox is clicked', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange,
                },
            })
            await Test.Table.Click.selectRow(1)
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('calls onChange removing id when already selected row is deselected', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: ['Alpha'],
                    onChange,
                },
            })
            await Test.Table.Click.selectRow(1)
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('select-all selects all rows', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange,
                },
            })
            await Test.Table.Click.selectAll()
            expect(onChange).toHaveBeenCalledWith(rows.map((r) => r.name))
        })

        it('select-all deselects all when all are selected', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: rows.map((r) => r.name),
                    onChange,
                },
            })
            await Test.Table.Click.selectAll()
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('select-all checkbox is checked when all rows are selected', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: rows.map((r) => r.name),
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.selectAll()).toBeChecked()
        })

        it('select-all checkbox is unchecked when not all rows are selected', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: ['Alpha'],
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.selectAll()).not.toBeChecked()
        })

        it('row checkbox is checked when its id is in selectedRowIds', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: ['Beta'],
                    onChange: vi.fn(),
                },
            })
            expect(Test.Table.Get.selectRow(2)).toBeChecked()
            expect(Test.Table.Get.selectRow(1)).not.toBeChecked()
        })

        it('adds to existing selection when selecting another row', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: ['Alpha'],
                    onChange,
                },
            })
            await Test.Table.Click.selectRow(2)
            expect(onChange).toHaveBeenCalledWith(['Alpha', 'Beta'])
        })
    })

    describe('Single selection', () => {
        it('does not render select-all checkbox', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    mode: 'single',
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                },
            })
            expect(
                screen.queryByRole('checkbox', { name: 'Select all rows' }),
            ).not.toBeInTheDocument()
        })

        it('selects only the clicked row', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    mode: 'single',
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange,
                },
            })
            await Test.Table.Click.selectRow(1)
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('deselects the row when clicking already selected', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    mode: 'single',
                    getRowId: (r) => r.name,
                    selectedRowIds: ['Alpha'],
                    onChange,
                },
            })
            await Test.Table.Click.selectRow(1)
            expect(onChange).toHaveBeenCalledWith([])
        })
    })

    describe('isRowSelectable', () => {
        it('disables checkbox for non-selectable rows', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                },
            })
            // Beta (index 1) is inactive
            expect(Test.Table.Get.selectRow(2)).toBeDisabled()
        })

        it('enables checkbox for selectable rows', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                },
            })
            expect(Test.Table.Get.selectRow(1)).not.toBeDisabled()
            expect(Test.Table.Get.selectRow(3)).not.toBeDisabled()
        })

        it('select-all only selects selectable rows', async () => {
            const onChange = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange,
                    isRowSelectable: ({ row }) => row.status !== 'inactive',
                },
            })
            await Test.Table.Click.selectAll()
            // Beta is inactive, should not be in the list
            expect(onChange).toHaveBeenCalledWith(expect.not.arrayContaining(['Beta']))
            expect(onChange).toHaveBeenCalledWith(
                expect.arrayContaining(['Alpha', 'Gamma', 'Delta']),
            )
        })

        it('select-all is disabled when no rows are selectable', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                selection: {
                    getRowId: (r) => r.name,
                    selectedRowIds: [],
                    onChange: vi.fn(),
                    isRowSelectable: () => false,
                },
            })
            expect(Test.Table.Get.selectAll()).toBeDisabled()
        })
    })

    describe('Selection selectors (unit)', () => {
        const data: Row[] = [
            { name: 'A', value: '1', status: 'active', note: '' },
            { name: 'B', value: '2', status: 'inactive', note: '' },
            { name: 'C', value: '3', status: 'active', note: '' },
        ]

        const baseSelection = {
            getRowId: (r: Row) => r.name,
            selectedRowIds: [] as string[],
            onChange: vi.fn(),
        }

        it('getSelectableRows returns all rows when no isRowSelectable', () => {
            const result = getSelectableRows({ data, selection: baseSelection })
            expect(result).toEqual(data)
        })

        it('getSelectableRows filters based on isRowSelectable', () => {
            const result = getSelectableRows({
                data,
                selection: {
                    ...baseSelection,
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toHaveLength(2)
            expect(result.map((r) => r.name)).toEqual(['A', 'C'])
        })

        it('getSelectableIds returns ids of selectable rows', () => {
            const result = getSelectableIds({
                data,
                selection: {
                    ...baseSelection,
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toEqual(['A', 'C'])
        })

        it('getAllSelected returns true when all selectable rows are selected', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: ['A', 'C'],
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toBe(true)
        })

        it('getAllSelected returns false when not all selectable rows are selected', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: ['A'],
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toBe(false)
        })

        it('getAllSelected returns false when no rows are selectable', () => {
            const result = getAllSelected({
                data,
                selection: {
                    ...baseSelection,
                    selectedRowIds: [],
                    isRowSelectable: () => false,
                },
            })
            expect(result).toBe(false)
        })
    })
})
