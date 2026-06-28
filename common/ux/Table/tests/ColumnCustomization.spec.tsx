import { Test } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Column Customization', () => {
    describe('Column resize', () => {
        it('renders resize handles when enableColumnResize is true', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnResize: true,
            })
            const table = Test.Table('test')
            const headers = table.Get.columnHeaders()
            headers.forEach((th) => {
                expect(th.querySelector('.th-resize-handle')).toBeInTheDocument()
            })
        })

        it('does not render resize handles when enableColumnResize is omitted', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(document.querySelector('.th-resize-handle')).not.toBeInTheDocument()
        })

        it('renders a resize line indicator inside each handle', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnResize: true,
            })
            const handles = document.querySelectorAll('.th-resize-handle')
            handles.forEach((handle) => {
                expect(handle.querySelector('.th-resize-line')).toBeInTheDocument()
            })
        })

        it('sets table-layout to fixed on the table when resize enabled', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnResize: true,
            })
            const table = Test.Table('test')
            expect(table.Get.table().style.tableLayout).toBe('fixed')
        })

        it('does not set table-layout to fixed when resize disabled', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            const table = Test.Table('test')
            expect(table.Get.table().style.tableLayout).not.toBe('fixed')
        })
    })

    describe('Column reorder', () => {
        it('renders reorder buttons when enableColumnReorder is true', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const table = Test.Table('test')
            // Each column should have left and right reorder buttons
            basicColumns.forEach((col) => {
                expect(table.Has.reorderLeftButton(col.header)).toBe(true)
                expect(table.Has.reorderRightButton(col.header)).toBe(true)
            })
        })

        it('does not render reorder buttons when enableColumnReorder is omitted', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
            })
            expect(document.querySelector('.th-reorder-btn')).not.toBeInTheDocument()
        })

        it('disables left button on first column', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const firstLeftBtn = Test.Table('test').Get.reorderLeftButton('Name')
            expect(firstLeftBtn).toBeDisabled()
        })

        it('disables right button on last column', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const lastRightBtn = Test.Table('test').Get.reorderRightButton('Status')
            expect(lastRightBtn).toBeDisabled()
        })

        it('moves column left when clicking left reorder button', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const table = Test.Table('test')
            const headersBefore = table.Get.columnHeaders()
            expect(headersBefore[1]).toHaveTextContent('Value')

            await Test.Table('test').Do.reorderLeft('Value')

            // Value moved from index 1 to index 0
            const headersAfter = table.Get.columnHeaders()
            expect(headersAfter[0]).toHaveTextContent('Value')
            expect(headersAfter[1]).toHaveTextContent('Name')
        })

        it('moves column right when clicking right reorder button', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const headersBefore = Test.Table('test').Get.columnHeaders()
            expect(headersBefore[1]).toHaveTextContent('Value')

            await Test.Table('test').Do.reorderRight('Value')

            const headersAfter = Test.Table('test').Get.columnHeaders()
            expect(headersAfter[1]).toHaveTextContent('Status')
            expect(headersAfter[2]).toHaveTextContent('Value')
        })

        it('left button on first column is disabled and does not move', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const leftBtn = Test.Table('test').Get.reorderLeftButton('Name')
            expect(leftBtn).toBeDisabled()

            const headersBefore = Test.Table('test').Get.columnHeaders()
            await Test.Table('test').Do.reorderLeft('Name')
            const headersAfter = Test.Table('test').Get.columnHeaders()
            // Order unchanged
            headersAfter.forEach((th, i) => {
                expect(th.textContent).toBe(headersBefore[i].textContent)
            })
        })

        it('right button on last column is disabled and does not move', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const rightBtn = Test.Table('test').Get.reorderRightButton('Status')
            expect(rightBtn).toBeDisabled()

            const headersBefore = Test.Table('test').Get.columnHeaders()
            await Test.Table('test').Do.reorderRight('Status')
            const headersAfter = Test.Table('test').Get.columnHeaders()
            // Order unchanged
            headersAfter.forEach((th, i) => {
                expect(th.textContent).toBe(headersBefore[i].textContent)
            })
        })

        it('adds has-reorder class to header cells', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnReorder: true,
            })
            const headers = Test.Table('test').Get.columnHeaders()
            headers.forEach((th) => {
                expect(th.classList.contains('has-reorder')).toBe(true)
            })
        })
    })

    describe('Resize + Reorder combined', () => {
        it('renders both resize handles and reorder buttons when both enabled', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                enableColumnResize: true,
                enableColumnReorder: true,
            })
            // Resize handles: each non-first column has a left handle, each non-last has a right handle
            // For 3 columns: col0→right, col1→left+right, col2→left = 4 handles total
            expect(document.querySelectorAll('.th-resize-handle')).toHaveLength(
                basicColumns.length * 2 - 2,
            )
            expect(document.querySelectorAll('.th-reorder-btn')).toHaveLength(
                basicColumns.length * 2,
            )
        })
    })
})
