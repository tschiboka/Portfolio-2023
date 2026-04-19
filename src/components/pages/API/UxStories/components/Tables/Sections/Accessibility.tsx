import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { type Row, rows, type AriaRow, ariaReferenceRows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Accessibility = () => (
    <>
        <h2 id="accessibility">Accessibility</h2>
        <p>
            Every <code>Table</code> sub-component exposes semantic HTML attributes, ARIA labels,
            roles, and DOM hooks so screen readers can navigate the table and tests can target
            individual elements. The sections below demonstrate each accessibility surface and how
            to use it.
        </p>
        <section>
            <h3>ARIA Reference</h3>
            <p>
                Complete list of every accessible name, role, and ARIA attribute exposed by the{' '}
                <code>Table</code> component tree. Use these labels with <code>getByLabelText</code>
                , <code>getByRole</code>, or assistive technology to reach any sub-component.
            </p>
            <Table<AriaRow>
                title="ARIA Reference"
                ariaLabel="Complete ARIA attribute reference for the Table component"
                data={ariaReferenceRows}
                columns={[
                    { header: 'Component', accessor: 'component', variant: 'primary' },
                    { header: 'Element', accessor: 'element' },
                    { header: 'Attribute', accessor: 'attribute', variant: 'secondary' },
                    { header: 'Value', accessor: 'value' },
                ]}
            />
        </section>
        <section>
            <h3>ariaLabel</h3>
            <p>
                The <code>ariaLabel</code> prop sets <code>aria-label</code> on the table&apos;s
                wrapper <code>&lt;div role=&quot;region&quot;&gt;</code>, giving screen readers a
                concise summary of the table&apos;s purpose. Every table should have a unique,
                descriptive aria label.
            </p>
            <Table<Row>
                title="ariaLabel"
                ariaLabel="User activity summary table"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', variant: 'danger' },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
        </section>
        <section>
            <h3>rowAriaLabel</h3>
            <p>
                The <code>rowAriaLabel</code> prop sets an <code>aria-label</code> on every{' '}
                <code>&lt;tr&gt;</code> in the body. This helps screen readers announce each
                row&apos;s purpose when the user navigates between them. Ideally each row label
                should be descriptive; for now the same label is broadcast to every row.
            </p>
            <Table<Row>
                title="rowAriaLabel"
                ariaLabel="Table with row labels"
                rowAriaLabel="User activity row"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Status', accessor: 'status', variant: 'secondary' },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.rowAriaLabel} />
        </section>
        <section>
            <h3>className</h3>
            <p>
                The <code>className</code> prop is appended to the wrapper&apos;s class list. This
                lets you attach custom CSS or target the table in tests via a class selector. Below
                the wrapper gets <code>className=&quot;danger-outline&quot;</code> with a red border
                applied via inline style to visually confirm targeting.
            </p>
            <Table<Row>
                title="className"
                ariaLabel="Table with custom className"
                className="danger-outline"
                style={{ border: '2px solid var(--error)', borderRadius: '8px' }}
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'danger' },
                    { header: 'Value', accessor: 'value', variant: 'danger' },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.className} />
        </section>
        <section>
            <h3>style</h3>
            <p>
                The <code>style</code> prop merges inline CSS onto the wrapper element. Use it for
                one-off visual overrides such as warning highlights. Below the table has an orange
                warning border applied via <code>style</code>.
            </p>
            <Table<Row>
                title="style"
                ariaLabel="Table with inline style override"
                style={{
                    border: '2px solid var(--orange)',
                    borderRadius: '8px',
                    boxShadow: '0 0 8px var(--orange-dark-3)',
                }}
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status', variant: 'danger' },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.style} />
        </section>
        <section>
            <h3>id</h3>
            <p>
                The <code>id</code> prop sets a DOM identifier on the wrapper and is also used to
                link the <code>&lt;h2&gt;</code> title to the <code>&lt;table&gt;</code> via{' '}
                <code>aria-labelledby</code>, giving the table a programmatic name. Use it for
                anchor links, scroll targets,
                <code>document.getElementById</code>, or test selectors.
            </p>
            <Table<Row>
                id="accessibility-id-demo"
                title="id"
                ariaLabel="Table with id for anchor and aria-labelledby"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Value', accessor: 'value', variant: 'secondary' },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.id} />
        </section>
        <section>
            <h3>scope=&quot;col&quot; on Headers</h3>
            <p>
                Every <code>&lt;th&gt;</code> rendered by <code>TableHead</code> has{' '}
                <code>scope=&quot;col&quot;</code>, telling assistive technology that the header
                applies to its entire column. Utility columns (expand caret and actions) also carry
                descriptive <code>aria-label</code> attributes so screen readers don&apos;t announce
                empty headers.
            </p>
            <Table<Row>
                title="scope on Headers"
                ariaLabel="Table demonstrating scope=col on every th"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value', variant: 'primary' },
                    { header: 'Status', accessor: 'status', breakpoint: 'xxs' },
                ]}
                actions={[
                    {
                        id: 'demo',
                        label: 'View',
                        variant: 'primary',
                        onClick: ({ row }) => alert(`Viewing ${row.name}`),
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.scopeCol} />
        </section>
        <section>
            <h3>Action Menu ARIA</h3>
            <p>
                The action kebab button announces <code>aria-haspopup=&quot;true&quot;</code> and
                toggles <code>aria-expanded</code> so screen readers know a menu exists and whether
                it is open. The dropdown <code>&lt;ul&gt;</code> has{' '}
                <code>role=&quot;menu&quot;</code> and each action button has{' '}
                <code>role=&quot;menuitem&quot;</code> with an <code>aria-label</code>. Danger and
                primary variants colour the items accordingly.
            </p>
            <Table<Row>
                title="Action Menu ARIA"
                ariaLabel="Table demonstrating accessible action menu"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                actions={[
                    {
                        id: 'edit',
                        label: 'Edit',
                        variant: 'primary',
                        onClick: ({ row }) => alert(`Editing ${row.name}`),
                    },
                    {
                        id: 'delete',
                        label: 'Delete',
                        variant: 'danger',
                        onClick: ({ row }) => alert(`Deleting ${row.name}`),
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.actionMenuAria} />
        </section>
        <section>
            <h3>Expanded Row ARIA</h3>
            <p>
                When a row is expandable, the caret button announces{' '}
                <code>aria-label=&quot;Expand row&quot;</code> or{' '}
                <code>&quot;Collapse row&quot;</code> depending on the current state. The expanded
                detail <code>&lt;tr&gt;</code> carries its own <code>aria-label</code> describing
                which row it belongs to, and the empty spacer cell is marked{' '}
                <code>aria-hidden=&quot;true&quot;</code> so screen readers skip it.
            </p>
            <Table<Row>
                title="Expanded Row ARIA"
                ariaLabel="Table demonstrating expanded row accessibility"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Value', accessor: 'value', breakpoint: 'xxs' },
                    {
                        header: 'Status',
                        accessor: 'status',
                        breakpoint: 'xxs',
                        variant: 'danger',
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.expandedRowAria} />
        </section>
        <section>
            <h3>Empty State role=&quot;status&quot;</h3>
            <p>
                When the <code>data</code> array is empty, the placeholder cell is marked with{' '}
                <code>role=&quot;status&quot;</code> so assistive technology can announce that no
                data is available rather than silently showing nothing. Combined with a{' '}
                <code>variant</code> the empty state can also be visually styled as a warning.
            </p>
            <Table<Row>
                title="Empty State role=status"
                ariaLabel="Empty table with accessible status message"
                data={[]}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'danger' },
                    { header: 'Value', accessor: 'value', variant: 'danger' },
                ]}
                emptyState={
                    <em style={{ color: 'var(--error)' }}>
                        ⚠ No records found — try broadening your search.
                    </em>
                }
            />{' '}
            <Code language="tsx" content={Snippets.Accessibility.emptyStateRole} />{' '}
        </section>
    </>
)
