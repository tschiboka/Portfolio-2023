import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows, type AriaRow, ariaReferenceRows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Accessibility = () => (
    <>
        <Heading as="h2" id="accessibility">
            Accessibility
        </Heading>
        <Paragraph>
            Every <CodeText>Table</CodeText> sub-component exposes semantic HTML attributes, ARIA
            labels, roles, and DOM hooks so screen readers can navigate the table and tests can
            target individual elements. The sections below demonstrate each accessibility surface
            and how to use it.
        </Paragraph>
        <Section>
            <Heading as="h3">ARIA Reference</Heading>
            <Paragraph>
                Complete list of every accessible name, role, and ARIA attribute exposed by the{' '}
                <CodeText>Table</CodeText> component tree. Use these labels with{' '}
                <CodeText>getByLabelText</CodeText>, <CodeText>getByRole</CodeText>, or assistive
                technology to reach any sub-component.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">ariaLabel</Heading>
            <Paragraph>
                The <CodeText>ariaLabel</CodeText> prop sets <CodeText>aria-label</CodeText> on the
                table&apos;s wrapper <CodeText>&lt;div role=&quot;region&quot;&gt;</CodeText>,
                giving screen readers a concise summary of the table&apos;s purpose. Every table
                should have a unique, descriptive aria label.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">rowAriaLabel</Heading>
            <Paragraph>
                The <CodeText>rowAriaLabel</CodeText> prop sets an <CodeText>aria-label</CodeText>{' '}
                on every <CodeText>&lt;tr&gt;</CodeText> in the body. This helps screen readers
                announce each row&apos;s purpose when the user navigates between them. Ideally each
                row label should be descriptive; for now the same label is broadcast to every row.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">className</Heading>
            <Paragraph>
                The <CodeText>className</CodeText> prop is appended to the wrapper&apos;s class
                list. This lets you attach custom CSS or target the table in tests via a class
                selector. Below the wrapper gets{' '}
                <CodeText>className=&quot;danger-outline&quot;</CodeText> with a red border applied
                via inline style to visually confirm targeting.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">style</Heading>
            <Paragraph>
                The <CodeText>style</CodeText> prop merges inline CSS onto the wrapper element. Use
                it for one-off visual overrides such as warning highlights. Below the table has an
                orange warning border applied via <CodeText>style</CodeText>.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">id</Heading>
            <Paragraph>
                The <CodeText>id</CodeText> prop sets a DOM identifier on the wrapper and is also
                used to link the <CodeText>&lt;h2&gt;</CodeText> title to the{' '}
                <CodeText>&lt;table&gt;</CodeText> via <CodeText>aria-labelledby</CodeText>, giving
                the table a programmatic name. Use it for anchor links, scroll targets,
                <CodeText>document.getElementById</CodeText>, or test selectors.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">scope=&quot;col&quot; on Headers</Heading>
            <Paragraph>
                Every <CodeText>&lt;th&gt;</CodeText> rendered by <CodeText>TableHead</CodeText> has{' '}
                <CodeText>scope=&quot;col&quot;</CodeText>, telling assistive technology that the
                header applies to its entire column. Utility columns (expand caret and actions) also
                carry descriptive <CodeText>aria-label</CodeText> attributes so screen readers
                don&apos;t announce empty headers.
            </Paragraph>
            <Table<Row>
                title="scope on Headers"
                ariaLabel="Table demonstrating scope=col on every th"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value', variant: 'primary' },
                    { header: 'Status', accessor: 'status', breakpoint: '2xs' },
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
        </Section>
        <Section>
            <Heading as="h3">Action Menu ARIA</Heading>
            <Paragraph>
                The action kebab button announces{' '}
                <CodeText>aria-haspopup=&quot;true&quot;</CodeText> and toggles{' '}
                <CodeText>aria-expanded</CodeText> so screen readers know a menu exists and whether
                it is open. The dropdown <CodeText>&lt;ul&gt;</CodeText> has{' '}
                <CodeText>role=&quot;menu&quot;</CodeText> and each action button has{' '}
                <CodeText>role=&quot;menuitem&quot;</CodeText> with an{' '}
                <CodeText>aria-label</CodeText>. Danger and primary variants colour the items
                accordingly.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Expanded Row ARIA</Heading>
            <Paragraph>
                When a row is expandable, the caret button announces{' '}
                <CodeText>aria-label=&quot;Expand row&quot;</CodeText> or{' '}
                <CodeText>&quot;Collapse row&quot;</CodeText> depending on the current state. The
                expanded detail <CodeText>&lt;tr&gt;</CodeText> carries its own{' '}
                <CodeText>aria-label</CodeText> describing which row it belongs to, and the empty
                spacer cell is marked <CodeText>aria-hidden=&quot;true&quot;</CodeText> so screen
                readers skip it.
            </Paragraph>
            <Table<Row>
                title="Expanded Row ARIA"
                ariaLabel="Table demonstrating expanded row accessibility"
                data={rows.slice(0, 2)}
                columns={[
                    { header: 'Name', accessor: 'name', variant: 'primary' },
                    { header: 'Value', accessor: 'value', breakpoint: '2xs' },
                    {
                        header: 'Status',
                        accessor: 'status',
                        breakpoint: '2xs',
                        variant: 'danger',
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Accessibility.expandedRowAria} />
        </Section>
        <Section>
            <Heading as="h3">Empty State role=&quot;status&quot;</Heading>
            <Paragraph>
                When the <CodeText>data</CodeText> array is empty, the placeholder cell is marked
                with <CodeText>role=&quot;status&quot;</CodeText> so assistive technology can
                announce that no data is available rather than silently showing nothing. Combined
                with a <CodeText>variant</CodeText> the empty state can also be visually styled as a
                warning.
            </Paragraph>
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
        </Section>
    </>
)
