import { Table } from '@common/ux/Table'
import { Code, Pill } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Fundamentals = () => (
    <>
        <h2 id="fundamentals">Fundamentals</h2>
        <p>Core table features: titles, empty states, descriptions, info buttons, and legends.</p>
        <section>
            <h3>No Title</h3>
            <p>
                The <code>title</code> prop is optional. When omitted the table renders without a
                heading and relies solely on <code>ariaLabel</code> for accessibility.
            </p>
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
        </section>
        <section>
            <h3>Empty State</h3>
            <p>
                When the <code>data</code> array is empty, the table gracefully renders a "No data"
                placeholder instead of an empty grid. This ensures the user always sees meaningful
                feedback, even when no records match a filter or the dataset has not loaded yet.
            </p>
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
        </section>
        <section>
            <h3>Custom Empty State</h3>
            <p>
                Pass an <code>emptyState</code> prop to replace the default "No data" text with any{' '}
                <code>ReactNode</code> — a styled message, an icon, or a call to action.
            </p>
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
        </section>
        <section>
            <h3>Basic Usage</h3>
            <p>
                The simplest form of the <code>Table</code> component. Pass an array of typed row
                objects and define <code>columns</code> by <code>header</code> label and{' '}
                <code>accessor</code> key. Each cell displays the raw string value with no
                transformation or formatting applied.
            </p>
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
        </section>
        <section>
            <h3>Description</h3>
            <p>
                The optional <code>description</code> prop accepts any <code>ReactNode</code> and
                renders it below the title as supplementary context. Use it for a short summary of
                the data, filter hints, or inline help. It sits on the left side of the header
                alongside the title, with the download button (if present) on the right.
            </p>
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
        </section>
        <section>
            <h3>Description with Download</h3>
            <p>
                When combined with <code>download</code>, the description stays on the left beneath
                the title while the download button floats to the right. The header row uses{' '}
                <code>flex-start</code> alignment so the button stays at the top.
            </p>
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
        </section>
        <section>
            <h3>Info Button</h3>
            <p>
                Pass an <code>onInfo</code> callback to display a small info icon (<code>ℹ</code>)
                next to the title. Clicking it fires the callback — useful for opening a modal,
                tooltip, or help panel.
            </p>
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
        </section>
        <section>
            <h3>Legend</h3>
            <p>
                The <code>legend</code> prop accepts any <code>ReactNode</code> and renders it below
                the header (title, description, info, download) and above the table headers. Use it
                for status summaries, colour keys, or any contextual metadata.
            </p>
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
        </section>
    </>
)
