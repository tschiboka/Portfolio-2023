import { screen } from '@testing-library/react'
import { Test, Accessor } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'

const { rows, basicColumns } = TableMocks

describe('Table — Download', () => {
    describe('Single download', () => {
        it('should render download button', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table('test').Get.downloadButton()).toBeInTheDocument()
        })

        it('should call onDownload with current data', async () => {
            const onDownload = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload },
            })
            await Test.Table('test').Do.download()
            expect(onDownload).toHaveBeenCalledWith(rows)
        })

        it('should render label text when label is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { label: 'Export CSV', onDownload: vi.fn() },
            })
            expect(screen.getByText('Export CSV')).toBeInTheDocument()
        })

        it('should not render label text when label is omitted', () => {
            const { container } = Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(container.querySelector('.download-label')).not.toBeInTheDocument()
        })
    })

    describe('Multi-format download', () => {
        it('should render dropdown trigger', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            expect(Test.Table('test').Get.downloadButton()).toBeInTheDocument()
        })

        it('should show options when dropdown is opened', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload: vi.fn(),
                },
            })
            await Test.Table('test').Do.download()
            expect(screen.getByRole('option', { name: 'CSV' })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'PDF' })).toBeInTheDocument()
        })

        it('should call onDownload with selected format and data', async () => {
            const onDownload = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: {
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                    ],
                    onDownload,
                },
            })
            await Test.Table('test').Do.download()
            await Accessor.user.click(screen.getByRole('option', { name: 'CSV' }))
            expect(onDownload).toHaveBeenCalledWith('csv', rows)
        })
    })

    describe('Download without title', () => {
        it('should render download button even without a title', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table('test').Get.downloadButton()).toBeInTheDocument()
        })
    })
})
