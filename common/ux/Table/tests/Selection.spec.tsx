import { screen } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'
import { TableCheckboxSelectors } from '../TableCheckbox/TableCheckbox.selectors'

const { getSelectableRows, getSelectableIds, getAllSelected } = TableCheckboxSelectors
const { rows, basicColumns } = TableMocks

describe('Table — Selection', () => {
    describe('Multiple selection', () => {
        it('should render checkbox for every row', () => {
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
            const table = Test.Table('test')
            rows.forEach((_, i) => {
                expect(table.Get.selectRow(i + 1)).toBeInTheDocument()
            })
        })

        it('should render "Select all rows" header checkbox', () => {
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
            expect(Test.Table('test').Get.selectAll()).toBeInTheDocument()
        })

        it('should call onChange with row id when a row checkbox is clicked', async () => {
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
            await Test.Table('test').Do.selectRow(1)
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('should call onChange removing id when already selected row is deselected', async () => {
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
            await Test.Table('test').Do.selectRow(1)
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('should select every row from the select-all box', async () => {
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
            await Test.Table('test').Do.selectAll()
            expect(onChange).toHaveBeenCalledWith(rows.map((r) => r.name))
        })

        it('should deselect every row from the select-all box when all are selected', async () => {
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
            await Test.Table('test').Do.selectAll()
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('should check the select-all box when all rows are selected', () => {
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
            expect(Test.Table('test').Get.selectAll()).toBeChecked()
        })

        it('should leave the select-all box unchecked when not all rows are selected', () => {
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
            expect(Test.Table('test').Get.selectAll()).not.toBeChecked()
        })

        it('should check a row box whose id is in selectedRowIds', () => {
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
            const table = Test.Table('test')
            expect(table.Get.selectRow(2)).toBeChecked()
            expect(table.Get.selectRow(1)).not.toBeChecked()
        })

        it('should add to existing selection when selecting another row', async () => {
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
            await Test.Table('test').Do.selectRow(2)
            expect(onChange).toHaveBeenCalledWith(['Alpha', 'Beta'])
        })
    })

    describe('Single selection', () => {
        it('should not render select-all checkbox', () => {
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

        it('should select only the clicked row', async () => {
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
            await Test.Table('test').Do.selectRow(1)
            expect(onChange).toHaveBeenCalledWith(['Alpha'])
        })

        it('should deselect the row when clicking already selected', async () => {
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
            await Test.Table('test').Do.selectRow(1)
            expect(onChange).toHaveBeenCalledWith([])
        })
    })

    describe('isRowSelectable', () => {
        it('should disable checkbox for non-selectable rows', () => {
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
            expect(Test.Table('test').Get.selectRow(2)).toBeDisabled()
        })

        it('should enable checkbox for selectable rows', () => {
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
            const table = Test.Table('test')
            expect(table.Get.selectRow(1)).not.toBeDisabled()
            expect(table.Get.selectRow(3)).not.toBeDisabled()
        })

        it('should only select selectable rows from the select-all box', async () => {
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
            await Test.Table('test').Do.selectAll()
            // Beta is inactive, should not be in the list
            expect(onChange).toHaveBeenCalledWith(expect.not.arrayContaining(['Beta']))
            expect(onChange).toHaveBeenCalledWith(
                expect.arrayContaining(['Alpha', 'Gamma', 'Delta']),
            )
        })

        it('should disable the select-all box when no rows are selectable', () => {
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
            expect(Test.Table('test').Get.selectAll()).toBeDisabled()
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

        it('should return all rows from getSelectableRows when no isRowSelectable', () => {
            const result = getSelectableRows({ data, selection: baseSelection })
            expect(result).toEqual(data)
        })

        it('should filter by isRowSelectable in getSelectableRows', () => {
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

        it('should return the ids of selectable rows from getSelectableIds', () => {
            const result = getSelectableIds({
                data,
                selection: {
                    ...baseSelection,
                    isRowSelectable: ({ row }) => row.status === 'active',
                },
            })
            expect(result).toEqual(['A', 'C'])
        })

        it('should return true from getAllSelected when every selectable row is selected', () => {
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

        it('should return false from getAllSelected when some rows are unselected', () => {
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

        it('should return false from getAllSelected when no rows are selectable', () => {
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
