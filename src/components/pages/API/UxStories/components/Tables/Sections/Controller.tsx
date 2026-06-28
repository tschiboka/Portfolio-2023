import { Table, Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import { type Row, rows } from '../Tables.mocks'

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
                    onSortChange: () => {},
                }}
                pagination={{
                    page: 1,
                    totalPages: 1,
                    pageSize: 5,
                    onPageChange: () => {},
                    onPageSizeChange: () => {},
                }}
                title="Controller API"
            />
            <Code language="tsx" content={Snippets.Controller.basic} />
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
