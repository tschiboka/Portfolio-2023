import { useState } from 'react'
import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'
import { renderStatus } from '../Tables.config'
import type { TableColumns } from '@common/ux/Table/Table.types'

export const ColumnCustomization = () => {
    const [cols, setCols] = useState<TableColumns<Row>>([
        { header: 'Name', accessor: 'name' },
        { header: 'Value', accessor: 'value' },
        { header: 'Status', accessor: 'status', cell: renderStatus },
    ])
    const [colWidths, setColWidths] = useState<Record<number, number>>({})

    return (
        <>
            <Heading as="h2" id="column-customization">
                Column Customization
            </Heading>
            <Paragraph>
                The <CodeText>onColumnResize</CodeText> callback adds a draggable resize handle to
                the right edge of each column header. Drag to adjust column widths — the table uses{' '}
                <CodeText>table-layout: fixed</CodeText> so explicit widths are respected.
            </Paragraph>
            <Paragraph>
                The <CodeText>onColumnReorder</CodeText> callback adds <CodeText>&lt;</CodeText> and{' '}
                <CodeText>&gt;</CodeText> buttons around each header label. Hover a column to reveal
                them — click to shift the column left or right. The first and last column buttons
                are disabled appropriately.
            </Paragraph>
            <Section>
                <Heading as="h3">Resize &amp; Reorder</Heading>
                <Paragraph>
                    Hover a column to reveal the resize line on the right edge. Drag it to adjust
                    column widths. Use the <CodeText>&lt;</CodeText> and <CodeText>&gt;</CodeText>{' '}
                    buttons that appear on hover to reorder.
                </Paragraph>
                <Table<Row>
                    title="Column Customization"
                    key={cols.map((c) => c.header).join(',')}
                    ariaLabel="Table with column resize and reorder"
                    data={rows}
                    columns={cols}
                    enableColumnResize
                    enableColumnReorder
                    onColumnResize={(index, width) => {
                        setColWidths((prev) => ({ ...prev, [index]: width }))
                    }}
                    onColumnReorder={(from, to) => {
                        setCols((prev) => {
                            const next = [...prev]
                            const [moved] = next.splice(from, 1)
                            next.splice(to, 0, moved)
                            return next
                        })
                    }}
                />
                {Object.keys(colWidths).length > 0 && (
                    <Paragraph>
                        Current widths:{' '}
                        {Object.entries(colWidths)
                            .map(([i, w]) => `col ${i}: ${w}px`)
                            .join(', ')}
                    </Paragraph>
                )}
                <Code language="tsx" content={Snippets.ColumnCustomization.resizeReorder} />
            </Section>
            <Section>
                <Heading as="h3">Usage</Heading>
                <Paragraph>
                    Both callbacks are optional. When omitted, no resize handles or reorder buttons
                    are rendered — zero visual change to existing tables.
                </Paragraph>
                <Code language="tsx" content={Snippets.ColumnCustomization.usage} />
            </Section>
        </>
    )
}
