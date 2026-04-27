import { Test } from '@common/ux'
import { Row } from './Table.spec.types'
import { rows } from './Table.mocks'

describe('Table — Variants', () => {
    describe('Static column variant', () => {
        it('applies variant class to cells in that column', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Value', accessor: 'value' },
                ],
            })
            const cells = container.querySelectorAll('td')
            expect(cells[0]).toHaveClass('variant-primary')
        })

        it.each(['primary', 'secondary', 'danger', 'disabled'] as const)(
            'applies variant-%s class',
            (variant) => {
                const { container } = Test.Table.Set.mock<Row>({
                    ariaLabel: 'test',
                    data: rows.slice(0, 1),
                    columns: [{ header: 'Name', accessor: 'name', variant }],
                })
                const cell = container.querySelector('td')
                expect(cell).toHaveClass(`variant-${variant}`)
            },
        )
    })

    describe('Function column variant', () => {
        it('applies variant class based on cell value', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [
                    { name: 'A', value: '1', status: 'active', note: '' },
                    { name: 'B', value: '2', status: 'inactive', note: '' },
                ],
                columns: [
                    {
                        header: 'Status',
                        accessor: 'status',
                        variant: (_, { row }) => (row.status === 'active' ? 'primary' : 'danger'),
                    },
                ],
            })
            const cells = container.querySelectorAll('tbody td')
            expect(cells[0]).toHaveClass('variant-primary')
            expect(cells[1]).toHaveClass('variant-danger')
        })

        it('applies no variant class when function returns undefined', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name',
                        variant: () => undefined,
                    },
                ],
            })
            const cell = container.querySelector('tbody td')
            expect(cell?.className).not.toContain('variant-')
        })
    })

    describe('Row variant', () => {
        it('applies row variant to all cells in a row', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'A', value: '1', status: 'inactive', note: '' }],
                columns: [
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                ],
                rowVariant: ({ row }) => (row.status === 'inactive' ? 'disabled' : undefined),
            })
            const cells = container.querySelectorAll('tbody td')
            cells.forEach((cell) => {
                expect(cell).toHaveClass('variant-disabled')
            })
        })

        it('row variant does not override column variant (column variant wins)', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'A', value: '1', status: 'inactive', note: '' }],
                columns: [
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Value', accessor: 'value' },
                ],
                rowVariant: () => 'danger',
            })
            const cells = container.querySelectorAll('tbody td')
            // Name column: static variant 'primary' overrides rowVariant because
            // in the code, col.variant (when string) is used, rowVariant is fallback
            expect(cells[0]).toHaveClass('variant-primary')
            // Value column: no column variant, so rowVariant applies
            expect(cells[1]).toHaveClass('variant-danger')
        })

        it('function column variant takes priority over row variant', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'A', value: '1', status: 'x', note: '' }],
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name',
                        variant: () => 'secondary',
                    },
                ],
                rowVariant: () => 'danger',
            })
            const cell = container.querySelector('tbody td')
            expect(cell).toHaveClass('variant-secondary')
        })

        it('row variant undefined does not add variant class', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: [{ header: 'Name', accessor: 'name' }],
                rowVariant: () => undefined,
            })
            const cell = container.querySelector('tbody td')
            expect(cell?.className).not.toContain('variant-')
        })
    })
})
