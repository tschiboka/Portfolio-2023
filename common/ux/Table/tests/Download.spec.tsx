import { screen } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'
import { Test } from '@common/ux/Test'

describe('Table — Download', () => {
    describe('Single download', () => {
        it('renders download button', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table.Get.downloadButton()).toBeInTheDocument()
        })

        it('calls onDownload with current data', async () => {
            const onDownload = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload },
            })
            await Test.Table.Click.downloadButton()
            expect(onDownload).toHaveBeenCalledWith(rows)
        })

        it('renders label text when label is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { label: 'Export CSV', onDownload: vi.fn() },
            })
            expect(screen.getByText('Export CSV')).toBeInTheDocument()
        })

        it('does not render label text when label is omitted', () => {
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
        it('renders dropdown trigger', () => {
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
            expect(Test.Table.Get.downloadButton()).toBeInTheDocument()
        })

        it('shows options when dropdown is opened', async () => {
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
            await Test.Table.Click.downloadButton()
            expect(screen.getByRole('option', { name: 'CSV' })).toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'PDF' })).toBeInTheDocument()
        })

        it('calls onDownload with selected format and data', async () => {
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
            const user = await Test.Table.Click.downloadButton()
            await user.click(screen.getByRole('option', { name: 'CSV' }))
            expect(onDownload).toHaveBeenCalledWith('csv', rows)
        })
    })

    describe('Download without title', () => {
        it('renders download button even without a title', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                download: { onDownload: vi.fn() },
            })
            expect(Test.Table.Get.downloadButton()).toBeInTheDocument()
        })
    })
})
