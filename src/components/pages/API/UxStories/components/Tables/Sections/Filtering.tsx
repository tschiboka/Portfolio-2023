import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Filtering = () => (
    <>
        <Heading as="h2" id="filtering">
            Filtering
        </Heading>
        <Paragraph>
            The <CodeText>filtering</CodeText> prop adds a slider icon to the header. Clicking it
            toggles a filter panel with accessible inputs. Each input has a{' '}
            <CodeText>type</CodeText> that determines the control rendered. The{' '}
            <CodeText>onFilter</CodeText> callback fires when the user clicks the{' '}
            <strong>Filter</strong> button. A <strong>Reset</strong> button restores all inputs to
            their defaults and re-fires <CodeText>onFilter</CodeText>.
        </Paragraph>
        <Section>
            <Heading as="h3">Filtering — Text</Heading>
            <Paragraph>
                A plain text input with an optional <CodeText>placeholder</CodeText>.
            </Paragraph>
            <Table<Row>
                title="Text Filter"
                ariaLabel="Table with text filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                filtering={{
                    inputs: [
                        {
                            key: 'name',
                            label: 'Name',
                            type: 'text',
                            placeholder: 'Enter name…',
                        },
                    ],
                    onFilter: (values) => console.log('text filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.text} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — Number</Heading>
            <Paragraph>
                A numeric input supporting optional <CodeText>min</CodeText> and{' '}
                <CodeText>max</CodeText> constraints.
            </Paragraph>
            <Table<Row>
                title="Number Filter"
                ariaLabel="Table with number filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                filtering={{
                    inputs: [
                        {
                            key: 'minValue',
                            label: 'Min Value',
                            type: 'number',
                            min: 0,
                            max: 100,
                            placeholder: '0–100',
                        },
                    ],
                    onFilter: (values) => console.log('number filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.number} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — Search</Heading>
            <Paragraph>
                A search input with a browser-native clear button. Like all filter types, the value
                is submitted when the user clicks <strong>Filter</strong>.
            </Paragraph>
            <Table<Row>
                title="Search Filter"
                ariaLabel="Table with search filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                filtering={{
                    inputs: [
                        {
                            key: 'query',
                            label: 'Search',
                            type: 'search',
                            placeholder: 'Search rows…',
                        },
                    ],
                    onFilter: (values) => console.log('search filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.search} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — Option</Heading>
            <Paragraph>
                A native <CodeText>&lt;select&gt;</CodeText> dropdown with predefined choices. The
                first option is always "All".
            </Paragraph>
            <Table<Row>
                title="Option Filter"
                ariaLabel="Table with option filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status', cell: renderStatus },
                ]}
                filtering={{
                    inputs: [
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'option',
                            options: [
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'pending', label: 'Pending' },
                            ],
                        },
                    ],
                    onFilter: (values) => console.log('option filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.option} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — Date</Heading>
            <Paragraph>
                A native date picker with optional <CodeText>min</CodeText> and{' '}
                <CodeText>max</CodeText> date bounds (ISO strings).
            </Paragraph>
            <Table<Row>
                title="Date Filter"
                ariaLabel="Table with date filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status' },
                ]}
                filtering={{
                    inputs: [
                        { key: 'from', label: 'From', type: 'date', min: '2020-01-01' },
                        { key: 'to', label: 'To', type: 'date', max: '2026-12-31' },
                    ],
                    onFilter: (values) => console.log('date filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.date} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — Checkbox</Heading>
            <Paragraph>
                A boolean toggle. Useful for flags like "show archived" or "active only".
            </Paragraph>
            <Table<Row>
                title="Checkbox Filter"
                ariaLabel="Table with checkbox filter"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status', cell: renderStatus },
                ]}
                filtering={{
                    inputs: [{ key: 'activeOnly', label: 'Active only', type: 'checkbox' }],
                    onFilter: (values) => console.log('checkbox filter:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.checkbox} />
        </Section>
        <Section>
            <Heading as="h3">Filtering — All Types Combined</Heading>
            <Paragraph>
                Every filter input type in a single panel — <CodeText>text</CodeText>,{' '}
                <CodeText>number</CodeText>, <CodeText>search</CodeText>,{' '}
                <CodeText>option</CodeText>, <CodeText>date</CodeText>, and{' '}
                <CodeText>checkbox</CodeText>.
            </Paragraph>
            <Table<Row>
                title="All Filter Types"
                ariaLabel="Table with all filter types"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status', cell: renderStatus },
                ]}
                filtering={{
                    inputs: [
                        { key: 'name', label: 'Name', type: 'text', placeholder: 'Name…' },
                        {
                            key: 'minValue',
                            label: 'Min Value',
                            type: 'number',
                            min: 0,
                            placeholder: '0',
                        },
                        {
                            key: 'query',
                            label: 'Search',
                            type: 'search',
                            placeholder: 'Search…',
                        },
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'option',
                            options: [
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'pending', label: 'Pending' },
                            ],
                        },
                        { key: 'from', label: 'From Date', type: 'date' },
                        { key: 'activeOnly', label: 'Active only', type: 'checkbox' },
                    ],
                    onFilter: (values) => console.log('all filters:', values),
                }}
            />
            <Code language="tsx" content={Snippets.Filtering.allTypes} />
        </Section>
    </>
)
