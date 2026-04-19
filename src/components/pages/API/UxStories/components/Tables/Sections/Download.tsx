import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Download = () => (
    <>
        <h2 id="download">Download</h2>
        <p>
            The optional <code>download</code> prop renders a download button in the table header,
            opposite the title. It supports two shapes: a <strong>single-action</strong> download
            that fires a callback directly, and a <strong>multi-option</strong> download that opens
            a dropdown menu listing the available formats. The consumer owns the download logic —
            the component simply calls the provided <code>onDownload</code> function with the
            current <code>data</code> array.
        </p>
        <section>
            <h3>Single Download</h3>
            <p>
                When only one format is needed, pass an object with an <code>onDownload</code>{' '}
                callback. The button shows a download icon. An optional <code>label</code> adds
                visible text next to the icon.
            </p>
            <Table<Row>
                title="Single Download"
                ariaLabel="Table with single download button"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                download={{
                    onDownload: (data: Row[]) => alert(`Downloading ${data.length} rows`),
                }}
            />
            <Code language="tsx" content={Snippets.Download.single} />
        </section>
        <section>
            <h3>Single Download with Label</h3>
            <p>
                Adding a <code>label</code> renders visible text beside the icon, making the action
                self-explanatory without relying on a tooltip. The label also doubles as the{' '}
                <code>aria-label</code>.
            </p>
            <Table<Row>
                title="Labelled Download"
                ariaLabel="Table with labelled download button"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                download={{
                    label: 'Download CSV',
                    onDownload: (data: Row[]) => alert(`CSV export: ${data.length} rows`),
                }}
            />
            <Code language="tsx" content={Snippets.Download.singleWithLabel} />
        </section>
        <section>
            <h3>Multiple Formats</h3>
            <p>
                When the table can be exported in more than one format, pass an <code>options</code>{' '}
                array of <code>DropdownOption</code> values and a single <code>onDownload</code>{' '}
                callback. The button renders a download icon with a caret. Clicking it opens a
                dropdown menu listing each option. When the user picks a format,{' '}
                <code>onDownload</code> fires with the selected value and the current data.
            </p>
            <Table<Row>
                title="Multiple Formats"
                ariaLabel="Table with multi-format download"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                download={{
                    options: [
                        { value: 'csv', label: 'CSV' },
                        { value: 'pdf', label: 'PDF' },
                        { value: 'excel', label: 'Excel' },
                    ],
                    onDownload: (value, data) => alert(`${value}: ${data.length} rows`),
                }}
            />
            <Code language="tsx" content={Snippets.Download.multipleFormats} />
        </section>
        <section>
            <h3>Download without Title</h3>
            <p>
                The download button still renders when the table has no title. It sits on the right
                side of the header row with an empty spacer on the left.
            </p>
            <Table<Row>
                ariaLabel="Table with download but no title"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                ]}
                download={{
                    label: 'Export',
                    onDownload: (data: Row[]) => alert(`Exporting ${data.length} rows`),
                }}
            />
            <Code language="tsx" content={Snippets.Download.withoutTitle} />
        </section>
    </>
)
