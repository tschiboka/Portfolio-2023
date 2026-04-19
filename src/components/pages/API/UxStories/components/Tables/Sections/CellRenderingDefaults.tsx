import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { toUpper } from 'ramda'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus, renderBadge } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const CellRenderingDefaults = () => (
    <>
        <h2 id="cell-rendering-defaults">Cell Rendering &amp; Defaults</h2>
        <p>Custom cell renderers and fallback default values for missing data.</p>
        <section>
            <h3>Custom Cell Renderers</h3>
            <p>
                Each column can provide a <code>cell</code> function that receives the cell value
                and returns a <code>ReactNode</code>. This enables rich formatting such as coloured{' '}
                <code>Pill</code> badges for statuses, styled value badges, or simple transforms
                like
                <code>toUpper</code>. Because the signature is <code>(value) =&gt; ReactNode</code>,
                point-free utility functions work out of the box.
            </p>
            <Table<Row>
                title="Custom Cell Renderers"
                ariaLabel="Table with custom cell renderers"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name', cell: toUpper },
                    { header: 'Value', accessor: 'value', cell: renderBadge },
                    { header: 'Status', accessor: 'status', cell: renderStatus },
                ]}
            />
            <Code language="tsx" content={Snippets.CellRenderingDefaults.customRenderers} />
        </section>
        <section>
            <h3>Default Values</h3>
            <p>
                When a cell value is <code>null</code> or <code>undefined</code>, the table applies
                a fallback. If the column specifies a <code>defaultValue</code>, that value is
                rendered; otherwise a generic "-" placeholder appears. Note that empty strings (
                <code>""</code>) are <strong>not</strong> treated as missing — they render as blank
                cells. When a column has a custom <code>cell</code> renderer, the renderer always
                runs and the <code>defaultValue</code> is never consulted.
            </p>
            <Table<{
                label: string
                withDefault: string | null
                noDefault: string | null
                withRenderer: string | null
            }>
                title="Default Values"
                ariaLabel="Table demonstrating default value behaviour"
                data={[
                    {
                        label: 'Has value',
                        withDefault: 'Present',
                        noDefault: 'Present',
                        withRenderer: 'Present',
                    },
                    {
                        label: 'null',
                        withDefault: null,
                        noDefault: null,
                        withRenderer: null,
                    },
                    {
                        label: 'Empty string',
                        withDefault: '',
                        noDefault: '',
                        withRenderer: '',
                    },
                ]}
                columns={[
                    { header: 'Scenario', accessor: 'label' },
                    {
                        header: 'defaultValue: "N/A"',
                        accessor: 'withDefault',
                        defaultValue: 'N/A',
                    },
                    { header: 'No defaultValue', accessor: 'noDefault' },
                    {
                        header: 'cell renderer',
                        accessor: 'withRenderer',
                        cell: (v) => (
                            <em>{v === null ? '(null received)' : String(v) || '(empty)'}</em>
                        ),
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.CellRenderingDefaults.defaultValues} />
        </section>
    </>
)
