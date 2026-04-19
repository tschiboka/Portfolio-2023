import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Filtering = () => (
    <>
        <h2 id="filtering">Filtering</h2>
        <p>
            The <code>filtering</code> prop adds a slider icon to the header. Clicking it toggles a
            filter panel with accessible inputs. Each input has a <code>type</code> that determines
            the control rendered. The <code>onFilter</code> callback fires on every change with all
            current values.
        </p>
        <section>
            <h3>Filtering — Text</h3>
            <p>
                A plain text input with an optional <code>placeholder</code>.
            </p>
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
        </section>
        <section>
            <h3>Filtering — Number</h3>
            <p>
                A numeric input supporting optional <code>min</code> and <code>max</code>{' '}
                constraints.
            </p>
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
        </section>
        <section>
            <h3>Filtering — Search</h3>
            <p>
                A search input (shows a browser-native clear button). Fires on every keystroke for
                live filtering.
            </p>
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
        </section>
        <section>
            <h3>Filtering — Option</h3>
            <p>
                A native <code>&lt;select&gt;</code> dropdown with predefined choices. The first
                option is always "All".
            </p>
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
        </section>
        <section>
            <h3>Filtering — Date</h3>
            <p>
                A native date picker with optional <code>min</code> and <code>max</code> date bounds
                (ISO strings).
            </p>
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
        </section>
        <section>
            <h3>Filtering — Checkbox</h3>
            <p>A boolean toggle. Useful for flags like "show archived" or "active only".</p>
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
        </section>
        <section>
            <h3>Filtering — All Types Combined</h3>
            <p>
                Every filter input type in a single panel — <code>text</code>, <code>number</code>,{' '}
                <code>search</code>, <code>option</code>, <code>date</code>, and{' '}
                <code>checkbox</code>.
            </p>
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
        </section>
    </>
)
