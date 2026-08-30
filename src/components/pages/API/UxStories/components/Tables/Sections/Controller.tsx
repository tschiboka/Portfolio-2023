import { Table, Code, CodeText, Heading, Paragraph, Section } from '@ux'
import { Functions } from '@utils'
import { Code as Snippets } from '../Tables.code'
import { type Row, rows } from '../Tables.mocks'
import { ControllerSingleDemo, ControllerNamedDemo, ControllerOffDemo } from '../Tables.demos'

export const Controller = () => (
    <>
        <Heading as="h2" id="controller">
            Controller API
        </Heading>
        <Paragraph>
            The <CodeText>useTableController</CodeText> hook (typically wrapped in a domain-specific
            hook like <CodeText>useBreakdownController</CodeText>) manages sorting, filtering, and
            pagination state together. It returns a <CodeText>controller</CodeText> object with
            built-in <CodeText>.sorting</CodeText>, <CodeText>.filtering</CodeText>,{' '}
            <CodeText>.pagination</CodeText>, and <CodeText>.params</CodeText> derived from the
            current state — ready to pass directly to an API query.
        </Paragraph>
        <Paragraph>
            The controller replaces the need for separate <CodeText>sorting</CodeText>,{' '}
            <CodeText>filtering</CodeText>, and <CodeText>pagination</CodeText> props. Pass it to
            the Table via the <CodeText>controller</CodeText> prop and use{' '}
            <CodeText>.params</CodeText> for your data-fetching query.
        </Paragraph>
        <Section>
            <Heading as="h3">Basic Controller Usage</Heading>
            <Paragraph>
                Create a controller with <CodeText>useTableController</CodeText>, wire it to your
                data query via <CodeText>controller.params</CodeText>, and pass it to the Table. The
                controller handles sort direction, filter values, and page state automatically.
            </Paragraph>
            <Table<Row>
                ariaLabel="Controller demo"
                data={rows.slice(0, 3)}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                sorting={{
                    column: 'name',
                    direction: 'asc',
                    onSortChange: Functions.noop,
                }}
                pagination={{
                    pageNumber: 1,
                    totalPages: 1,
                    pageSize: 5,
                    onPageChange: Functions.noop,
                    onPageSizeChange: Functions.noop,
                }}
                title="Controller API"
            />
            <Code language="tsx" content={Snippets.Controller.basic} />
        </Section>
        <Section>
            <Heading as="h3">URL State Persistence</Heading>
            <Paragraph>
                Pass an <CodeText>urlPersistence</CodeText> config to make the table's filter, sort,
                and pagination state live in the URL as the single source of truth. It is{' '}
                <strong>opt-in</strong> — a table only touches the URL when{' '}
                <CodeText>urlPersistence</CodeText> is explicitly provided; omit it and the URL
                stays untouched.
            </Paragraph>
            <Paragraph>
                Give each table its own <CodeText>namespace</CodeText> when a page hosts more than
                one persistent table, so their query params don't collide (e.g.{' '}
                <CodeText>activityFeed.type</CodeText> vs <CodeText>breakdown.type</CodeText>). The
                URL only records values that differ from the defaults — a near-default table yields
                a clean URL with just its actual filter overrides.
            </Paragraph>
            <Code
                language="tsx"
                content={`useTableController({
    filters,
    sorting: { default: { column: 'datetime', direction: 'desc' } },
    urlPersistence: { namespace: 'breakdown' }, // opt-in; namespace for multi-table pages
    toParams,
})`}
            />
            <Paragraph>
                Writing to the URL happens on <strong>Apply</strong> (filter submit/reset) and on
                sort or page changes — not on input keystrokes. Applying a filter pushes a history
                entry so the Back button returns to the previous filtered state; sort and page
                changes replace in place.
            </Paragraph>
            <Heading as="h4">Off (default)</Heading>
            <Paragraph>
                No <CodeText>urlPersistence</CodeText> config: the table works exactly as before —
                local state only, URL untouched.
            </Paragraph>
            <ControllerOffDemo />
            <Heading as="h4">Single table (root params)</Heading>
            <Paragraph>
                <CodeText>urlPersistence: {'{}'}</CodeText> — a lone persistent table uses clean
                root params (e.g.{' '}
                <CodeText>?name=&amp;status=&amp;sortBy=&amp;pageNumber=</CodeText>).
            </Paragraph>
            <ControllerSingleDemo />
            <Heading as="h4">Shared page (named namespace)</Heading>
            <Paragraph>
                <CodeText>{"urlPersistence: { namespace: 'demo' }"}</CodeText> — when more than one
                persistent table shares a page, give each a distinct namespace so params like{' '}
                <CodeText>demo.name</CodeText> don't collide.
            </Paragraph>
            <ControllerNamedDemo />
        </Section>
        <Section>
            <Heading as="h3">Recommended File Structure</Heading>
            <Paragraph>
                The pattern used in this project organises each table's concerns into separate files
                under a single folder:
            </Paragraph>
            <Code
                language="text"
                content={`
{Feature}Table/
├── {Feature}Table.tsx              # Component — assembles Table with slots
├── {Feature}Table.controller.ts    # Hook — useTableController config
├── {Feature}Table.filters.ts       # Filter input definitions
├── {Feature}Table.transformers.ts  # toParams mapping (API params)
├── {Feature}Table.columns.tsx      # Column definitions
├── {Feature}Table.actions.ts       # Row action definitions
├── {Feature}Table.types.ts         # Row type (extends base entity)
└── index.ts                        # Barrel exports
`.trim()}
            />
            <Paragraph>
                This keeps each responsibility isolated: the controller config, filter definitions,
                API-param mapping, columns, actions, and types each live in their own file. The
                parent component only fetches data and passes it down — the table owns its own
                controller and slot content.
            </Paragraph>
        </Section>
    </>
)
