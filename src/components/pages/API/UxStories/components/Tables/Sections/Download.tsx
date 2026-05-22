import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Download = () => (
    <>
        <Heading as="h2" id="download">
            Download
        </Heading>
        <Paragraph>
            The optional <CodeText>download</CodeText> prop renders a download button in the table
            header, opposite the title. It supports two shapes: a <strong>single-action</strong>{' '}
            download that fires a callback directly, and a <strong>multi-option</strong> download
            that opens a dropdown menu listing the available formats. The consumer owns the download
            logic — the component simply calls the provided <CodeText>onDownload</CodeText> function
            with the current <CodeText>data</CodeText> array.
        </Paragraph>
        <Section>
            <Heading as="h3">Single Download</Heading>
            <Paragraph>
                When only one format is needed, pass an object with an{' '}
                <CodeText>onDownload</CodeText> callback. The button shows a download icon. An
                optional <CodeText>label</CodeText> adds visible text next to the icon.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Single Download with Label</Heading>
            <Paragraph>
                Adding a <CodeText>label</CodeText> renders visible text beside the icon, making the
                action self-explanatory without relying on a tooltip. The label also doubles as the{' '}
                <CodeText>aria-label</CodeText>.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Multiple Formats</Heading>
            <Paragraph>
                When the table can be exported in more than one format, pass an{' '}
                <CodeText>options</CodeText> array of <CodeText>DropdownOption</CodeText> values and
                a single <CodeText>onDownload</CodeText> callback. The button renders a download
                icon with a caret. Clicking it opens a dropdown menu listing each option. When the
                user picks a format, <CodeText>onDownload</CodeText> fires with the selected value
                and the current data.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Download without Title</Heading>
            <Paragraph>
                The download button still renders when the table has no title. It sits on the right
                side of the header row with an empty spacer on the left.
            </Paragraph>
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
        </Section>
    </>
)
