import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Pill, Section } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Fundamentals = () => (
    <>
        <Heading as="h2" id="fundamentals">
            Fundamentals
        </Heading>
        <Paragraph>
            Core table features: titles, empty states, descriptions, info buttons, and legends.
        </Paragraph>
        <Section>
            <Heading as="h3">No Title</Heading>
            <Paragraph>
                The <CodeText>title</CodeText> prop is optional. When omitted the table renders
                without a heading and relies solely on <CodeText>ariaLabel</CodeText> for
                accessibility.
            </Paragraph>
            <Table<Row>
                ariaLabel="Table without a visible title"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
            />
            <Code language="tsx" content={Snippets.Fundamentals.noTitle} />
        </Section>
        <Section>
            <Heading as="h3">Empty State</Heading>
            <Paragraph>
                When the <CodeText>data</CodeText> array is empty, the table gracefully renders a
                "No data" placeholder instead of an empty grid. This ensures the user always sees
                meaningful feedback, even when no records match a filter or the dataset has not
                loaded yet.
            </Paragraph>
            <Table<Row>
                title="Empty State"
                ariaLabel="Empty table"
                data={[]}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                ]}
            />
            <Code language="tsx" content={Snippets.Fundamentals.emptyState} />
        </Section>
        <Section>
            <Heading as="h3">Custom Empty State</Heading>
            <Paragraph>
                Pass an <CodeText>emptyState</CodeText> prop to replace the default "No data" text
                with any <CodeText>ReactNode</CodeText> — a styled message, an icon, or a call to
                action.
            </Paragraph>
            <Table<Row>
                title="Custom Empty State"
                ariaLabel="Empty table with custom message"
                data={[]}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                ]}
                emptyState={<em>Nothing to display — try adjusting your filters.</em>}
            />
            <Code language="tsx" content={Snippets.Fundamentals.customEmptyState} />
        </Section>
        <Section>
            <Heading as="h3">Basic Usage</Heading>
            <Paragraph>
                The simplest form of the <CodeText>Table</CodeText> component. Pass an array of
                typed row objects and define <CodeText>columns</CodeText> by{' '}
                <CodeText>header</CodeText> label and <CodeText>accessor</CodeText> key. Each cell
                displays the raw string value with no transformation or formatting applied.
            </Paragraph>
            <Table<Row>
                title="Basic Usage"
                ariaLabel="Basic table"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
            />
            <Code language="tsx" content={Snippets.Fundamentals.basicUsage} />
        </Section>
        <Section>
            <Heading as="h3">Description</Heading>
            <Paragraph>
                The optional <CodeText>description</CodeText> prop accepts any{' '}
                <CodeText>ReactNode</CodeText> and renders it below the title as supplementary
                context. Use it for a short summary of the data, filter hints, or inline help. It
                sits on the left side of the header alongside the title, with the download button
                (if present) on the right.
            </Paragraph>
            <Table<Row>
                title="Description"
                description="Overview of the first four entries sorted by name."
                ariaLabel="Table with a description"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
            />
            <Code language="tsx" content={Snippets.Fundamentals.description} />
        </Section>
        <Section>
            <Heading as="h3">Description with Download</Heading>
            <Paragraph>
                When combined with <CodeText>download</CodeText>, the description stays on the left
                beneath the title while the download button floats to the right. The header row uses{' '}
                <CodeText>flex-start</CodeText> alignment so the button stays at the top.
            </Paragraph>
            <Table<Row>
                title="Description with Download"
                description={
                    <>
                        Showing <strong>{rows.length}</strong> rows — click the download icon to
                        export.
                    </>
                }
                ariaLabel="Table with description and download"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                download={{
                    label: 'Export CSV',
                    onDownload: (data: Row[]) => alert(`Exporting ${data.length} rows`),
                }}
            />
            <Code language="tsx" content={Snippets.Fundamentals.descriptionWithDownload} />
        </Section>
        <Section>
            <Heading as="h3">Info Button</Heading>
            <Paragraph>
                Pass an <CodeText>onInfo</CodeText> callback to display a small info icon (
                <CodeText>ℹ</CodeText>) next to the title. Clicking it fires the callback — useful
                for opening a modal, tooltip, or help panel.
            </Paragraph>
            <Table<Row>
                title="Info Button"
                onInfo={() => alert('Info clicked — open a modal, tooltip, or help panel here.')}
                ariaLabel="Table with info button"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
            />
            <Code language="tsx" content={Snippets.Fundamentals.infoButton} />
        </Section>
        <Section>
            <Heading as="h3">Legend</Heading>
            <Paragraph>
                The <CodeText>legend</CodeText> prop accepts any <CodeText>ReactNode</CodeText> and
                renders it below the header (title, description, info, download) and above the table
                headers. Use it for status summaries, colour keys, or any contextual metadata.
            </Paragraph>
            <Table<Row>
                title="Legend"
                description="Order statuses for the current quarter."
                ariaLabel="Table with legend"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status', cell: renderStatus },
                ]}
                legend={
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Pill label="ACTIVE" color="success" /> = 21
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Pill label="PENDING" color="orange" /> = 8
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Pill label="INACTIVE" color="error" /> = 3
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Pill label="ERROR" color="error" /> = 1
                        </span>
                    </div>
                }
            />{' '}
            <Code language="tsx" content={Snippets.Fundamentals.legend} />{' '}
        </Section>
    </>
)
