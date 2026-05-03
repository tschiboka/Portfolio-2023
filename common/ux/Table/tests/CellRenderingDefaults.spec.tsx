import { screen } from '@testing-library/react'
import type { CellMeta } from '../Table.types'
import { getCellContent } from '../Table.utils'
import { Row } from './Table.spec.types'
import { Test } from '@common/ux/Test'

describe('Table — Cell Rendering & Defaults', () => {
    describe('Default cell rendering', () => {
        it('renders raw value when no cell function or defaultValue', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Foo', value: '42', status: 'ok', note: 'hi' }],
                columns: [{ header: 'Name', accessor: 'name' }],
            })
            expect(screen.getByText('Foo')).toBeInTheDocument()
        })

        it('renders dash "-" for empty string when no defaultValue', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: '', value: '', status: '', note: '' }],
                columns: [{ header: 'Name', accessor: 'name' }],
            })
            expect(screen.getByText('-')).toBeInTheDocument()
        })

        it('renders custom defaultValue for empty cells', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: '', value: '', status: '', note: '' }],
                columns: [{ header: 'Name', accessor: 'name', defaultValue: 'N/A' }],
            })
            expect(screen.getByText('N/A')).toBeInTheDocument()
        })

        it('renders custom defaultValue as ReactNode', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: '', value: '', status: '', note: '' }],
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name',
                        defaultValue: <em>empty</em>,
                    },
                ],
            })
            expect(screen.getByText('empty').tagName).toBe('EM')
        })
    })

    describe('Custom cell renderer', () => {
        it('calls cell function with value and meta', () => {
            const cellFn = jest.fn((val) => <strong>{String(val).toUpperCase()}</strong>)
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'alpha', value: '1', status: 'ok', note: '' }],
                columns: [{ header: 'Name', accessor: 'name', cell: cellFn }],
            })
            expect(cellFn).toHaveBeenCalledTimes(1)
            expect(screen.getByText('ALPHA')).toBeInTheDocument()
        })

        it('cell function receives correct meta fields', () => {
            const cellFn = jest.fn((_val, meta: CellMeta<Row>) => <span>{meta.index}</span>)
            const data = [{ name: 'A', value: '1', status: 'x', note: '' }]
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: data,
                columns: [{ header: 'Name', accessor: 'name', cell: cellFn }],
            })
            const meta = cellFn.mock.calls[0][1]
            expect(meta.index).toBe(0)
            expect(meta.row).toEqual(data[0])
            expect(meta.data).toEqual(data)
            expect(meta.cell).toBe('A')
        })

        it('cell function receives context when provided', () => {
            const cellFn = jest.fn((_val, meta: CellMeta<Row, string>) => (
                <span>{String(meta.context)}</span>
            ))
            Test.Table.Set.mock<Row, string>({
                ariaLabel: 'test',
                data: [{ name: 'A', value: '1', status: 'x', note: '' }],
                columns: [{ header: 'Name', accessor: 'name', cell: cellFn }],
                context: 'my-context',
            })
            expect(cellFn.mock.calls[0][1].context).toBe('my-context')
        })

        it('custom cell overrides defaultValue even for empty cells', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: '', value: '', status: '', note: '' }],
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name',
                        cell: (val) => <span>{val || 'CUSTOM EMPTY'}</span>,
                        defaultValue: 'N/A',
                    },
                ],
            })
            expect(screen.getByText('CUSTOM EMPTY')).toBeInTheDocument()
            expect(screen.queryByText('N/A')).not.toBeInTheDocument()
        })
    })

    describe('getCellContent utility', () => {
        it('returns raw value for non-empty cells without cell function', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name' },
                row: { name: 'Test', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: 'Test', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('Test')
        })

        it('returns dash for empty string without defaultValue', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name' },
                row: { name: '', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: '', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('-')
        })

        it('returns defaultValue for empty string', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name', defaultValue: 'N/A' },
                row: { name: '', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: '', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('N/A')
        })

        it('uses cell function when provided', () => {
            const result = getCellContent({
                col: { header: 'Name', accessor: 'name', cell: (v) => `[${v}]` },
                row: { name: 'X', value: '1', status: 'ok', note: '' },
                index: 0,
                data: [{ name: 'X', value: '1', status: 'ok', note: '' }],
            })
            expect(result).toBe('[X]')
        })
    })
})
