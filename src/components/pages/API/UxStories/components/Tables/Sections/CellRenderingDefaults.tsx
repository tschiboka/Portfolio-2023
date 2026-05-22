import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { toUpper } from 'ramda'
import { type Row, rows } from '../Tables.mocks'
import { renderStatus, renderBadge } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const CellRenderingDefaults = () => (
    <>
        <Heading as="h2" id="cell-rendering-defaults">
            Cell Rendering &amp; Defaults
        </Heading>
        <Paragraph>Custom cell renderers and fallback default values for missing data.</Paragraph>
        <Section>
            <Heading as="h3">Custom Cell Renderers</Heading>
            <Paragraph>
                Each column can provide a <CodeText>cell</CodeText> function that receives the cell
                value and returns a <CodeText>ReactNode</CodeText>. This enables rich formatting
                such as coloured <CodeText>Pill</CodeText> badges for statuses, styled value badges,
                or simple transforms like
                <CodeText>toUpper</CodeText>. Because the signature is{' '}
                <CodeText>(value) =&gt; ReactNode</CodeText>, point-free utility functions work out
                of the box.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Default Values</Heading>
            <Paragraph>
                When a cell value is <CodeText>null</CodeText> or <CodeText>undefined</CodeText>,
                the table applies a fallback. If the column specifies a{' '}
                <CodeText>defaultValue</CodeText>, that value is rendered; otherwise a generic "-"
                placeholder appears. Note that empty strings (<CodeText>""</CodeText>) are{' '}
                <strong>not</strong> treated as missing — they render as blank cells. When a column
                has a custom <CodeText>cell</CodeText> renderer, the renderer always runs and the{' '}
                <CodeText>defaultValue</CodeText> is never consulted.
            </Paragraph>
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
        </Section>
    </>
)
